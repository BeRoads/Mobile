Beroads.views.RadarsList = Ext.extend(Ext.Panel, {
    layout: 'card',

    title : 'List',

	
    initComponent: function() {
       
		this.geo = new Ext.util.GeoLocation({
            autoUpdate: false
        });
        this.geo.on('beforelocationupdate', this.onBeforeGeoUpdate, this);
        this.geo.on('locationupdate', this.onGeoUpdate, this);
        
        this.geo.updateLocation();
        
		this.dockedItems = [{
            xtype: 'toolbar',
            title: _tr('radars', localStorage.getItem('lang'))
        }]

        this.list = new Ext.List({
            grouped: false,
            itemTpl: '<span class="listItemSpan"><span class="speedLimit">{speedLimit}</span> <span class="name">{name}</span></span>',
            loadingText: "Loading...",
            store: null
        });
        
        this.list.on('selectionchange', this.onSelect, this);
    
        
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
        
        
        Beroads.views.RadarsList.superclass.initComponent.call(this);

    },
    
    onGeoUpdate: function(coords) {
    
    	var cmp = Ext.getCmp('main');

   		this.list.store = new Ext.data.Store({
                model: 'Radar',
                proxy: {
                    type: 'scripttag',
                    url : 'http://91.121.10.214/The-DataTank/IWay/Radar/',
                    extraParams : { 
                    		format : 'json',
                    		from : coords.latitude+","+coords.longitude,
                    		area : localStorage.getItem('area')
                    },
                    reader: {
                        type: 'json',
                        root: 'item'
                    },
                    listeners: {
		               	exception: function(proxy, exception, operation) {


							//proxy.destroy(operation);						                            
                            var sessionCard = new Beroads.views.FailCar({
								prevCard: this
							});
							cmp.setActiveItem(sessionCard);
							
							
		        		}
		        	}
                },
                listeners: {
                    load: { fn: this.initializeData, scope: this },
                    exception: function(proxy, exception, operation) {


							//proxy.destroy(operation);						                            
                            var sessionCard = new Beroads.views.FailCar({
								prevCard: this
							});
							cmp.setActiveItem(sessionCard);
							
							
		        		}
                }
            });
            this.list.store.load();
            //this.list.el.mask('<span class="top"></span><span class="right"></span><span class="bottom"></span><span class="left"></span>', 'x-spinner', false);
    },
    
    onBeforeGeoUpdate: function(){
        

    },
    
    initializeData: function(data) {
	
		var radars = []; 

	    for (var i = 0; i < data.length; i++) {
		       	
		        radars.push(data.items[i].data);
		        
		}
		Beroads.stores.Radars.add.apply(Beroads.stores.Radars, radars);
		Beroads.stores.Radars.sort('name');
        
    },
    
   
    
    onSelect: function(selectionmodel, records){
        if (records[0] !== undefined) {
            var sessionCard = new Beroads.views.RadarsDetail({
                prevCard: this,
                record: records[0]
            });

            // Tell the parent panel to animate to the new card
            Ext.getCmp('main').setActiveItem(sessionCard, {type: 'slide', reverse: false});
        }
    }
});

Ext.reg('Beroads.views.RadarsList', Beroads.views.RadarsList);
