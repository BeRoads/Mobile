
Beroads.views.Map = Ext.extend(Ext.Panel, {
    
    mapText: '',
    permLink: '',
    id : 'map',    
    
    
    initComponent: function(){
        
        var overlay = new Ext.Panel({
            floating: true,
            modal: true,
            centered: false,
            width: 166,
            height: 'auto',
            styleHtmlContent: true,
            scroll: 'vertical',
            cls: 'popupMarker htmlcontent'
        });

        
        

        this.dockedItems = [{
            xtype: 'toolbar',
            title: _tr('map', localStorage.getItem('lang')),
            items: [{
                xtype: 'spacer', 
                flex: 1
            }, {
                ui: 'plain',
                iconCls: 'preferences',
                iconMask: false,
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

        

        var position = new google.maps.LatLng(50.85, 4.023);  //nearby Brussels
        var map = new Ext.Map({

            geo : new Ext.util.GeoLocation({
                autoUpdate:true,
                timeout:1000,
                listeners:{
                    locationupdate: function(geo) {
					
                        var center = new google.maps.LatLng(geo.latitude, geo.longitude);

                        if (map.rendered)
                            map.update(center)
                        else
                            map.on('activate', map.onUpdate, map, {
                                single: true, 
                                data: center
                            });
                    },
                    locationerror: function(geo){
                        localStorage.setItem('userCoords', '50.53846,4.20361'
                            );
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
            new Ext.plugin.GMap.Traffic({
                hidden : false
            })
            ],

			
				
            listeners : {
                maprender : function(comp, _map){
               		 	
                    setTimeout( function(){
                        map.geo.updateLocation();
                    } , 1000);
                }
            }
        });
        
	
        var refresh = function() {
		
			var coords = map.geo.coords;
        
            if(localStorage.getItem('displayTraffic')=='true'){

                Ext.util.JSONP.request({
                    url: 'http://data.beroads.com/IWay/TrafficEvent/'+localStorage.getItem('lang')+'/all.json',
                    callbackKey : 'callback',
                    params : { 
                        
                        from : coords.lat()+","+coords.lng(),
                        area : localStorage.getItem('area')
                    },
		        
                    callback: function(data) {
                        
                        data = data.TrafficEvent.item;
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

            if(localStorage.getItem('displayRadars')=='true'){

                Ext.util.JSONP.request({
                    url: 'http://data.beroads.com/IWay/Radar.json',
                    callbackKey: 'callback',
                    params : { 
                        from : coords.lat()+","+coords.lng(),
                        area : localStorage.getItem('area')
                    },
                    callback: function(data) {
			    
                        data = data.Radar.item;

                        // Add points to the map
                        for (var i = 0; i < data.length; i++) {
                            var radar = data[i];
			
                            if (radar.lng != 0 && radar.lat != 0 ) {
                                var position = new google.maps.LatLng(radar.lat, radar.lng);
                                addRadar(radar, position);
                            }
                        }
                        Beroads.stores.Radars.add.apply(Beroads.stores.Radars, data);
                        Beroads.stores.Radars.sort('name');
                    }
                });
            }	    

            if(localStorage.getItem('displayCameras')=='true'){

                Ext.util.JSONP.request({
                    url: 'http://data.beroads.com/IWay/Camera.json',
		        
                    callbackKey: 'callback',
                    params : { 
                        from : coords.lat()+","+coords.lng(),
                        area : localStorage.getItem('area')
                    },
		        
                    callback: function(data) {

                        data = data.Camera.item;

                        // Add points to the map
                        for (var i = 0; i < data.length; i++) {
                            var camera = data[i];		                
                            if (camera.lng != 0 && camera.lat != 0 ) {
                                var position = new google.maps.LatLng(camera.lat, camera.lng);
                                addCamera(camera, position);
                            }
                        }
                        Beroads.stores.Cameras.add.apply(Beroads.stores.Cameras, data);
                        Beroads.stores.Cameras.sort('zone');
                        
                    }
                });
            }

	    
        };

		
        var showCenteredOverlay = function(content) {
            overlay.setCentered(true);
            overlay.update(content);
            overlay.doLayout();
            overlay.show();
        };

        var addMarker = function(trafficevent, position) {
        
            if(trafficevent.category != undefined && trafficevent.category != null
                ){
                var marker = new google.maps.Marker({
                    map: map.map,
                    position: position,
                    title: trafficevent.location,
                    icon : 'resources/img/'+(trafficevent.category.toLowerCase()).replace(" ", "")+'.png'
				
                    ,
                    html : trafficevent.location+" "+trafficevent.message
                });
                google.maps.event.addListener(marker, 'click', function() {
                    
                    map.map.setCenter(this.position);

                    showCenteredOverlay(marker.html);
                    
                });
            }
	    
        };

        var addCamera = function(camera, position) {
            var marker = new google.maps.Marker({
                map: map.map,
                position: position,
                title: camera.id,
                html : "<p>"+camera.city+"</p><img src='"+camera.img+"' />",
                icon : 'resources/img/camera.png'
            });
            google.maps.event.addListener(marker, 'click', function() {
                map.map.setCenter(this.position);
                showCenteredOverlay(marker.html);
            });
	    
        };

        var addRadar = function(radar, position) {
	    
            var marker = new google.maps.Marker({
                map: map.map,
                position: position,
                title: radar.id,
//                html : "<span class=\"popupTitle\">"+radar.name+"</span><span class=\"popupDescription\">Speed Limit : "+radar.speedLimit+"</span>",
                html : "<span class=\"popupTitle\">Radar</span><span class=\"popupDescription\">Speed Limit : "+radar.speedLimit+"</span>",
                icon : 'resources/img/radar.png'
            });
            google.maps.event.addListener(marker, 'click', function() {
                map.map.setCenter(this.position);
                showCenteredOverlay(marker.html);				
            });
	    
        };

        map.geo.on('update', refresh);

	
        this.items = map;
       
        Beroads.views.Map.superclass.initComponent.call(this);
        
        this.geo = new Ext.util.GeoLocation({
            autoUpdate: false
        });
        this.geo.on('beforelocationupdate', this.onBeforeGeoUpdate, this);
        this.geo.on('locationupdate', this.onGeoUpdate, this);
        
        this.geo.updateLocation();
        
    },
    
    onGeoUpdate: function(coords) {
        
    },

    onBeforeGeoUpdate: function(){
       
    }
        

    
});

Ext.reg('Beroads.views.Map', Beroads.views.Map);
