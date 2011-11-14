Beroads.views.TrafficList = Ext.extend(Ext.Panel, {
    layout : 'fit',
    title : 'List',
    
    initComponent: function() {
       
        console.log(localStorage.getItem('userCoords'));
		
    	this.list = new Ext.List({
            grouped: false,
            itemTpl: '<span class="name">{location}</span> <span class="secondary">{message}</span>',
            loadingText: "Loading...",
            store: new Ext.data.Store({
                model: 'Traffic',
                proxy: {
                    type: 'scripttag',
                    url : 'http://91.121.10.214/The-DataTank/IWay/TrafficEvent/'+localStorage.getItem('lang')+'/all/',
                    extraParams : { 
                    				format : 'json' , 
                    				from : localStorage.getItem('userCoords'), 
                    				area : localStorage.getItem('area')
                    			},
                    reader: {
                        type: 'json',
                        root: 'item'
                    }
                },
                listeners: {
                    load: { fn: this.initializeData, scope: this }
                }
            })
        });
        
        this.list.on('selectionchange', this.onSelect, this);
        
        this.list.on('render', function(){
            this.list.store.load();
            this.list.el.mask('<span class="top"></span><span class="right"></span><span class="bottom"></span><span class="left"></span>', 'x-spinner', false);
        }, this);
        
        this.listpanel = new Ext.Panel({
            items: this.list,
            layout: 'fit',
            
            listeners: {
                activate: { fn: function(){
                    this.list.getSelectionModel().deselectAll();
                    Ext.repaint();
                }, scope: this }
            }
        })
        
        this.items = this.listpanel;
    
	this.dockedItems = [{
            xtype: 'toolbar',
            title: 'Traffic'
        }]

		
		
	    
        
        
        
        Beroads.views.TrafficList.superclass.initComponent.call(this);

    },
    
    
    
    initializeData: function(data) {
	
		
		var traficevents = []; 

		    for (var i = 0; i < data.length; i++) {
		       	
		        traficevents.push(data.items[i].data);
		        
		    }

		Beroads.stores.Traffic.add.apply(Beroads.stores.Traffic, traficevents);
		Beroads.stores.Traffic.sort('distance');
	
        
    },   
    
    onSelect: function(selectionmodel, records){
        if (records[0] !== undefined) {
            var sessionCard = new Beroads.views.TrafficDetail({
                prevCard: this,
                record: records[0]
            });

            // Tell the parent panel to animate to the new card
            Ext.getCmp('main').setActiveItem(sessionCard);
	    
        }
    }
});

Ext.reg('Beroads.views.TrafficList', Beroads.views.TrafficList);
