beroads.views.Map = Ext.extend(Ext.Panel, {
    coords: [50.85, 4.35],
    mapText: '',
    permLink: '',
    id : 'map',
    trafficStore : null;
    initComponent: function(){
        
	
	 this.trafficStore = new Ext.data.Store({
                model: 'TraficEvent',
                proxy: {
                    type: 'scripttag',
                    url : 'http://iway.alwaysdata.net/api/trafic/?region=walloonia&format=json',
                    reader: {
                        type: 'json',
                        root: 'traficevent'
                    }
                },
                listeners: {
                    load: { fn: this.initializeData, scope: this }
                }
            });

	  
	this.dockedItems = [{
            xtype: 'toolbar',
            title: 'Carte',
            items: [{xtype: 'spacer', flex: 1}, {
                ui: 'plain',
                iconCls: 'preferences',
                iconMask: true,
                scope: this,
                handler: function(){
                    var settingsPage = new beroads.views.Settings({
                		prevCard: Ext.getCmp('map')                		
            	    });
                    beroads.App.setActiveItem(settingsPage);
                }
            }]
        }]

	var position = new google.maps.LatLng(this.coords[0], this.coords[1]);

        this.map = new Ext.Map({
            mapOptions : {
                center : position,  //nearby Brussels
                zoom: 12,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },
            listeners: {
                maprender : function(comp, map){
				 
				 
		
		    
		     var marker = new google.maps.Marker({
                         position: position,
                         title : 'Your position',
                         map: map
                    });
	
                }
            }
        });
        
        this.items = this.map;
	
        
        beroads.views.Map.superclass.initComponent.call(this);
    },

    initializeData: function(data) {
	
	alert("initializeData");
	var traficevents = []; 
        for (var i = 0; i < data.data.items.length; i++) {
           
            traficevents.push(data.data.items[i]);
            
        }
	beroads.TraficEventStore.add.apply(beroads.TraficEventStore, traficevents);
        
    },

    initializeMarkers : function() {
	var traficevents = []; 
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		content: "holding..."
	 });

        for(var i = 0; i < beroads.TraficEventStore.data.items.length; i++){
					var event = beroads.TraficEventStore.data.items[i].data;
				 	alert(event.lat);
					var latlng = new google.maps.LatLng(event.lat, event.lng);
				
					markers[i] = new google.maps.Marker({
							position: latlng,
							map: map,
							title: event.name,
							html : "<p>"+event.name+"<br>"+event.description+"</p>"
					});
				
					var marker = markers[i];
					google.maps.event.addListener(marker, 'click', function() {
						infowindow.setContent(this.html);
						infowindow.open(map,this);
					});
					
	}


    }
});

Ext.reg('map', beroads.views.Map);
