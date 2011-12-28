Beroads.views.TrafficList = Ext.extend(Ext.Panel, {
    layout : 'fit',
    title : 'TrafficList',
    
    initComponent: function() {
        
        
        this.geo = new Ext.util.GeoLocation({
            autoUpdate: true
        });
        this.geo.on('beforelocationupdate', this.onBeforeGeoUpdate, this);
        this.geo.on('locationupdate', this.onGeoUpdate, this);
        
        this.geo.updateLocation();
        
    	this.list = new Ext.List({
            grouped: false,
            itemTpl: '<span class="name">{location}</span> <span class="secondary">{message} <br/>Distance : {distance} km</span>',
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
    
		this.dockedItems = [{
		        xtype: 'toolbar',
		        title: _tr('traffic', localStorage.getItem('lang'))
		}]      
        
        Beroads.views.TrafficList.superclass.initComponent.call(this);
    },
    
    /**
     * Callback for geo coords update
     */
    onGeoUpdate: function(coords) {
    
    	var cmp = Ext.getCmp('main');

        this.list.store = new Ext.data.Store({
                
                model: 'Traffic',
                proxy: {
                    type: 'scripttag',
                    url : 'http://data.beroads.com/IWay/TrafficEvent/'+localStorage.getItem('lang')+'/all.jsonp',
                    extraParams : { 
                    				
                    				from : coords.latitude+","+coords.longitude, 
                    				area : localStorage.getItem('area')
                    			},
                    reader: {
                        type: 'json',
                        root: 'TrafficEvent.item'
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
                	
                    load: { fn: this.initializeData, scope: this }
                }
            });
        this.list.store.load(); 
        //this.list.el.mask('<span class="top"></span><span class="right"></span><span class="bottom"></span><span class="left"></span>', 'x-spinner', false);

    },

    onBeforeGeoUpdate: function(){
    	// TODO
		/* Display 'acquiring location' or something like this */
    },

    
    initializeData: function(data) {
			var traficevents = []; 
            data = data.data;
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
