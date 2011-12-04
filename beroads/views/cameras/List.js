Beroads.views.CamerasList = Ext.extend(Ext.Panel, {
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
            title: _tr('webcams', localStorage.getItem('lang'))
        }]

        this.list = new Ext.List({
            grouped: false,
            itemTpl: '<div class="thumbnail"><img src="{img}" width="30" height="30" /></div><span class="name">{city}</span>',
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
        Beroads.views.CamerasList.superclass.initComponent.call(this);

    },
    
    onGeoUpdate: function(coords) {
    
    	var cmp = Ext.getCmp('main');

   		this.list.store = new Ext.data.Store({
                model: 'Camera',
                proxy: {
                    type: 'scripttag',
                    url : 'http://91.121.10.214/The-DataTank/IWay/Camera/',
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
                    load: { fn: this.initializeData, scope: this }
                }
            });
            this.list.store.load();
           
    },
    
    onBeforeGeoUpdate: function(){
        

    },
    
    initializeData: function(data) {
	
		var cameras = []; 

	    for (var i = 0; i < data.length; i++) {
		       	
		        cameras.push(data.items[i].data);
		        
		}
		Beroads.stores.Cameras.add.apply(Beroads.stores.Cameras, cameras);
		Beroads.stores.Cameras.sort('city');
		

		// Gather dates, create a splitbutton around them
        	var zones = data.collect('zone'),
                buttons = [];

            for (var i = 0; i < zones.length; i++) {
                buttons.push({
                    text: zones[i],
                    zoneData: zones[i],
                    index: i,
                    scope: this,
                    handler: this.changeZone
                });
            }
            
            this.zoneButtons = new Ext.SegmentedButton({
                items: buttons,
                defaults: { flex: 1 },
                style: 'width: 100%'
            });
            
            this.listpanel.addDocked({
                xtype: 'toolbar',
                ui: 'gray',
                items: this.zoneButtons,
                layout: { pack: 'center' }
            });
            
            // Take off the spinner

            
            //this.zoneButtons.setPressed(0);
            //this.changeZone(this.zoneButtons.items.getAt(0));
            this.doComponentLayout();
            
        
    },
    
   
    changeZone: function(btn) {
        this.list.store.clearFilter();
        this.list.store.filter('zone', btn.zoneData);
        this.list.scroller.scrollTo({y: 0}, false);
    },
    
    onSelect: function(selectionmodel, records){
        if (records[0] !== undefined) {
            var sessionCard = new Beroads.views.CamerasDetail({
                prevCard: this,
                record: records[0]
            });

            // Tell the parent panel to animate to the new card
            Ext.getCmp('main').setActiveItem(sessionCard, {type: 'slide', reverse: false});
        }
    }
});

Ext.reg('Beroads.views.CamerasList', Beroads.views.CamerasList);
