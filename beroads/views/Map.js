Beroads.views.Map = Ext.extend(Ext.Panel, {
    
    mapText: '',
    permLink: '',
    id : 'map',	

	      //Markers type
   
        
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
                    var settingsPage = new Beroads.views.Settings({
                		prevCard: this                		
            	    });
                    Ext.getCmp('main').setActiveItem(settingsPage);
                }
            }]
        }]
	
	
		 user = new google.maps.MarkerImage(
                    'resources/img/user.png',
                    new google.maps.Size(32, 31),
                    new google.maps.Point(0,0),
                    new google.maps.Point(16, 31)
    )

	

	

	

        infowindow = new google.maps.InfoWindow({
                content: ''
        })

  
	

	var position = new google.maps.LatLng(50.85, 4.023);  //nearby Brussels
	var map = new Ext.Map({

			geo : new Ext.util.GeoLocation({
				autoUpdate:false,
				timeout:1000,
				listeners:{
				locationupdate: function(geo) {
					
					localStorage.setItem('userCoords', geo.latitude+','+geo.longitude);
					var center = new google.maps.LatLng(geo.latitude, geo.longitude);

					if (map.rendered)
						map.update(center)
					else
						map.on('activate', map.onUpdate, map, {single: true, data: center});
				},
				locationerror: function(geo){
					alert('got geo error'); 
				}
				}
			}),
			useCurrentLocation: true,
			highAccuracy : true,
            mapOptions : {

                zoom : 12,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                        style: google.maps.NavigationControlStyle.DEFAULT
                }
            },

            plugins : [
                new Ext.plugin.GMap.Tracker({
                        trackSuspended : false,   
                        highAccuracy   : true,
                        marker : new google.maps.Marker({
                            position: position,
                            title : 'You are here',
                            icon  : user
                        })
					
                }),
                new Ext.plugin.GMap.Traffic({ hidden : false })
            ],

			
				
            listeners : {
                maprender : function(comp, _map){
               		 	
                   setTimeout( function(){ map.geo.updateLocation(); } , 1000);
                }
            }
        });
        
	
	var refresh = function() {
		

		var coords = map.geo.coords;
		map.map.panTo(coords);
	    /*google.maps.event.addListener(Ext.plugin.GMap.Tracker.marker, 'click', function() {
                                     map.map.setCenter(this.position);
					infowindow.setContent(this.html);
					infowindow.open(map.map,this);
					
	    });*/
		

		

	    if(localStorage.getItem('displayTraffic')){

		    Ext.util.JSONP.request({
		        url: 'http://91.121.10.214/The-DataTank/IWay/TrafficEvent/'+localStorage.getItem('lang')+'/all/',
				callbackKey : 'callback',
		        params : { 
		        				format : 'jsonp' ,
		        				from : coords.lat()+','+coords.lng(),
		        				area : localStorage.getItem('area')
		        },
		        
		        callback: function(data) {

		            data = data.item;
					var trafficevents = [];
			
		             // Add points to the map
		            for (var i = 0; i < data.length; i++) {
		                var traficevent = data[i];		                
		                if (traficevent.lng != 0 && traficevent.lat != 0 ) {
		                    var position = new google.maps.LatLng(traficevent.lat, traficevent.lng);
		                    addMarker(traficevent, position);
		                	trafficevents.push(traficevent);
		                }
		            }
		            Beroads.stores.Traffic.add.apply(Beroads.stores.Traffic, trafficevents);
					
		            Beroads.stores.Traffic.load();
		        }
		    });
	    }

	  if(localStorage.getItem('displayRadars')){

		    Ext.util.JSONP.request({
		        url: 'http://91.121.10.214/The-DataTank/IWay/Radar/',
		        callbackKey: 'callback',
				 params : { 
		        				format : 'jsonp' ,
		        				from : coords.lat()+','+coords.lng(),
		        				area : localStorage.getItem('area')
		        },
		        callback: function(data) {
			    
		            data = data.item;

		             // Add points to the map
		            for (var i = 0; i < data.length; i++) {
		                var radar = data[i];
			
		                if (radar.lng != 0 && radar.lat != 0 ) {
		                    var position = new google.maps.LatLng(radar.lat, radar.lng);
		                    addRadar(radar, position);
		                }
		            }
		            Beroads.stores.radars.add.apply(Beroads.stores.radars, data);
					Beroads.stores.radars.sort('name');
		        }
		    });
	    }	    

	    if(localStorage.getItem('displayCameras')){

		    Ext.util.JSONP.request({
		        url: 'http://91.121.10.214/The-DataTank/IWay/Camera/',
		        
		        callbackKey: 'callback',
		        params : { format : 'jsonp' },
		        
		        callback: function(data) {

		            data = data.item;

		             // Add points to the map
		            for (var i = 0; i < data.length; i++) {
		                var camera = data[i];		                
		                if (camera.lng != 0 && camera.lat != 0 ) {
		                    var position = new google.maps.LatLng(camera.lat, camera.lng);
		                    addCamera(camera, position);
		                }
		            }
		            Beroads.stores.cameras.add.apply(Beroads.stores.cameras, data);
					Beroads.stores.cameras.sort('name');
		        }
		    });
	    }
        };

	
        var addMarker = function(trafficevent, position) {
        
        	if(trafficevent.category != undefined){
		        var marker = new google.maps.Marker({
		            map: map.map,
		            position: position,
					title: trafficevent.location,
					icon : 'resources/img/'+trafficevent.category.toLowerCase()+'.png'
				
					,
					html : "<h1 class='markerTitle' id='incident'>"+trafficevent.location+"</h1> <p class='markerContent'>"+trafficevent.message+"</p>"
		        });
		        google.maps.event.addListener(marker, 'click', function() {
					var infoBox = new InfoBox({latlng: marker.getPosition(), map: map.map, html : this.html});
					
	    		});
	    	}
	    
        };

	var addCamera = function(camera, position) {
            var marker = new google.maps.Marker({
                map: map.map,
                position: position,
		title: camera.id,
		html : "<p>"+camera.highway+"</p><img src='"+camera.img+"' />",
		icon : 'resources/img/camera.png'
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
		html : "<p>"+radar.name+"</p><br /><p>Speed Limit : "+radar.speedLimit,
		icon : 'resources/img/radar.png'
            });
            google.maps.event.addListener(marker, 'click', function() {
					map.map.setCenter(this.position);
					infowindow.setContent(this.html);
					infowindow.open(map.map,this);
					
	    });
	    
        };

	map.geo.on('update', refresh);

        this.items = map;
       
	Beroads.views.Map.superclass.initComponent.call(this);

    }      
        

    
});

Ext.reg('Beroads.views.Map', Beroads.views.Map);
