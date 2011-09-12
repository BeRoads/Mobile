beroads.views.Map = Ext.extend(Ext.Panel, {
    
    mapText: '',
    permLink: '',
    id : 'map',
   

    initComponent: function(){
        
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
	
	var position = new google.maps.LatLng(50.85, 4.35),  //nearby Brussels

        infowindow = new google.maps.InfoWindow({
                content: ''
        })

        //Tracking Marker Image
        image = new google.maps.MarkerImage(
                    'point.png',
                    new google.maps.Size(32, 31),
                    new google.maps.Point(0,0),
                    new google.maps.Point(16, 31)
        )

        shadow = new google.maps.MarkerImage(
                    'shadow.png',
                    new google.maps.Size(64, 52),
                    new google.maps.Point(0,0),
                    new google.maps.Point(-5, 42)
        )

	var map = new Ext.Map({

            mapOptions : {
                center : new google.maps.LatLng(50.85, 4.35),  //nearby Brussels
                zoom : 12,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                        style: google.maps.NavigationControlStyle.DEFAULT
                    }
            },

            plugins : [
                new Ext.plugin.GMap.Tracker({
                        trackSuspended : false,   //suspend tracking initially
                        highAccuracy   : false,
                        marker : new google.maps.Marker({
                            position: position,
                            title : 'You are here'
                        })
					
                }),
                new Ext.plugin.GMap.Traffic({ hidden : false })
            ],

            listeners : {
                maprender : function(comp, map){
                   setTimeout( function(){ map.panTo (position); } , 1000);
                }

            }
        });
        
	
	var refresh = function() {

	    /*google.maps.event.addListener(Ext.plugin.GMap.Tracker.marker, 'click', function() {
                                     map.map.setCenter(this.position);
					infowindow.setContent(this.html);
					infowindow.open(map.map,this);
					
	    });*/
	    if(localStorage.getItem('displayTraffic')){

		    Ext.util.JSONP.request({
		        url: 'http://localhost/sandbox/IWay/api/traficevents.php',
		        callbackKey: 'callback',
		        params: {
			    lang : localStorage.getItem('lang'),
		            region : localStorage.getItem('region'),
			    format : 'json'
		        },
		        callback: function(data) {
			    
		            data = data.traficevent;

		             // Add points to the map
		            for (var i = 0; i < data.length; i++) {
		                var traficevent = data[i];
			
		                
		                if (traficevent.lng != 0 && traficevent.lat != 0 ) {
		                    var position = new google.maps.LatLng(traficevent.lat, traficevent.lng);
		                    addMarker(traficevent, position);
		                }
		            }
		        }
		    });
	    }

	    if(localStorage.getItem('displayRadars') == true){
		    Ext.util.JSONP.request({
		        url: 'http://localhost/sandbox/IWay/api/radars.php',
		        callbackKey: 'callback',
		        params: {
		            lang : localStorage.getItem('lang'),
		            region : localStorage.getItem('region'),
			    format : 'json'
		        },
		        callback: function(data) {
			    
		            data = data.radar;

		             // Add points to the map
		            for (var i = 0; i < data.length; i++) {
		                var radar = data[i];
			
		                alert(radar.lat);
		                if (radar.lng != 0 && radar.lat != 0 ) {
		                    var position = new google.maps.LatLng(radar.lat, radar.lng);
		                    addRadar(radar, position);
		                }
		            }
		        }
		    });
	    }

	    /*if(localStorage.getItem('displayParkings') == true){
		    Ext.util.JSONP.request({
		        url: 'http://localhost/sandbox/IWay/api/parkings.php',
		        callbackKey: 'callback',
		        params: {
		            lang : localStorage.getItem('lang'),
		            region : localStorage.getItem('region'),
			    format : 'json'
		        },
		        callback: function(data) {
			    
		            data = data.parking;

		             // Add points to the map
		            for (var i = 0; i < data.length; i++) {
		                var parking = data[i];
			
		                
		                if (parking.lng != 0 && parking.lat != 0 ) {
		                    var position = new google.maps.LatLng(parking.lat, parking.lng);
		                    addParking(parking, position);
		                }
		            }
		        }
		    });
	    }*/

	    if(localStorage.getItem('displayCameras') == true){

		    Ext.util.JSONP.request({
		        url: 'http://localhost/sandbox/IWay/api/cameras.php',
		        callbackKey: 'callback',
		        params: {
		            lang : localStorage.getItem('lang'),
		            region : localStorage.getItem('region'),
			    format : 'json'
		        },
		        callback: function(data) {
			    
		            data = data.camera;

		             // Add points to the map
		            for (var i = 0; i < data.length; i++) {
		                var camera = data[i];
			
		                
		                if (camera.lng != 0 && camera.lat != 0 ) {
		                    var position = new google.maps.LatLng(camera.lat, camera.lng);
		                    addCamera(camera, position);
		                }
		            }
		        }
		    });
	    }
        };

	
        var addMarker = function(trafficevent, position) {
            var marker = new google.maps.Marker({
                map: map.map,
                position: position,
		title: trafficevent.name,
		html : "<p>"+trafficevent.name+" - "+trafficevent.description+"</p>"
            });
            google.maps.event.addListener(marker, 'click', function() {
					map.map.setCenter(this.position);
					infowindow.setContent(this.html);
					infowindow.open(map.map,this);
					
	    });
	    
        };

	var addCamera = function(camera, position) {
            var marker = new google.maps.Marker({
                map: map.map,
                position: position,
		title: camera.id,
		html : "<p>"+camera.id+"</p>"
            });
            google.maps.event.addListener(marker, 'click', function() {
					map.map.setCenter(this.position);
					infowindow.setContent(this.html);
					infowindow.open(map.map,this);
					
	    });
	    
        };

	var addParking = function(parking, position) {
            var marker = new google.maps.Marker({
                map: map.map,
                position: position,
		title: parking.id,
		html : "<p>"+parking.id+"</p>"
            });
            google.maps.event.addListener(marker, 'click', function() {
					map.map.setCenter(this.position);
					infowindow.setContent(this.html);
					infowindow.open(map.map,this);
					
	    });
	    
        };

	var addRadar = function(radar, position) {
	    
            var marker = new google.maps.Marker({
                map: map.map,
                position: position,
		title: radar.id,
		html : "<p>"+radar.id+"</p>"
            });
            google.maps.event.addListener(marker, 'click', function() {
					map.map.setCenter(this.position);
					infowindow.setContent(this.html);
					infowindow.open(map.map,this);
					
	    });
	    
        };

	map.geo.on('update', refresh);

        this.items = map;
	beroads.views.Map.superclass.initComponent.call(this);

    }      
        

    
});

Ext.reg('map', beroads.views.Map);
