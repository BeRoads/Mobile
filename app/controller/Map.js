Ext.define('BeRoads.controller.Map', {
    extend: 'Ext.app.Controller',
    //store google maps marker for further access
    map : null,
    markers : {
        user : null,
        trafficevents : [],
        radars : [],
        webcams : []
    },
    config: {
        stores : ['offline.Radar', 'online.Radar','offline.Webcam', 'online.Webcam', 'offline.TrafficEvent', 'online.TrafficEvent'],
        views: ['Main', 'Map', 'trafficevents.List'],
        refs: {
            infoPanel : '#infoPanel',
            trafficMap: '#trafficMap',
            mapView : '#mapView',
            preferenceButton : '#preferenceButton',
            saveButton : '#saveButton'
        },
        control: {
            trafficMap: {
                maprender: 'renderTrafficMap'
            }
        }
    },


    init:function () {
        
        this.callParent(arguments);
    },	

	
    updateLanguage : function() {
        

        if(localStorage.getItem('displayTraffic')){
            var trafficStore = Ext.getStore('online.TrafficEvent');
            trafficStore.getProxy().setUrl('http://data.beroads.com/IWay/TrafficEvent/'+localStorage.getItem('lang')+'/all.jsonp');
            trafficStore.getProxy().setExtraParam('from',
            BeRoads.app.user_coords.coords.latitude + "," + BeRoads.app.user_coords.coords.longitude);
            trafficStore.getProxy().setExtraParam('area', localStorage.getItem('area'));
            trafficStore.load();
        }
    },

    updateMapArea : function(type) {

        var onlineTrafficStore = Ext.getStore('online.TrafficEvent');
        var onlineWebcamStore = Ext.getStore('online.Webcam');
        var onlineRadarStore = Ext.getStore('online.Radar');
        var me = this;
            switch(type){

                //we have to reload the content because the area had change
                case "area":
                    if(localStorage.getItem('displayTraffic')==1){

                        for(var i = 0; i < this.markers.trafficevents.length; i++){
                            this.markers.trafficevents[i].setMap(null);
                        }
                        this.markers.trafficevents = [];

                        onlineTrafficStore.removeAll();
                        onlineTrafficStore.getProxy().setUrl('http://data.beroads.com/IWay/TrafficEvent/'+localStorage.getItem('lang')+'/all.jsonp');
                        onlineTrafficStore.getProxy().setExtraParam('from',
                        BeRoads.app.user_coords.coords.latitude + "," + BeRoads.app.user_coords.coords.longitude);
                        onlineTrafficStore.getProxy().setExtraParam('area', localStorage.getItem('area'));
                        onlineTrafficStore.load();
                    }
                    if(localStorage.getItem('displayRadars')==1){

                        for(var i = 0; i < this.markers.radars.length; i++){
                            this.markers.radars[i].setMap(null);
                        } 
                        this.markers.radars = [];
                        onlineRadarStore.removeAll();
                        onlineRadarStore.getProxy().setExtraParam('from',
                        BeRoads.app.user_coords.coords.latitude + "," + BeRoads.app.user_coords.coords.longitude);
                        onlineRadarStore.getProxy().setExtraParam('area',
                        localStorage.getItem('area'));
                        onlineRadarStore.load();
                    }
                    if(localStorage.getItem('displayWebcams')==1){

                        for(var i = 0; i < this.markers.webcams.length; i++){
                            this.markers.webcams[i].setMap(null);
                        } 
                        this.markers.webcams = [];
                        onlineWebcamStore.removeAll();
                        onlineWebcamStore.getProxy().setExtraParam('from',
                        BeRoads.app.user_coords.coords.latitude + "," + BeRoads.app.user_coords.coords.longitude);
                        onlineWebcamStore.getProxy().setExtraParam('area',
                        localStorage.getItem('area'));
                        onlineWebcamStore.load();
                    }
                    setTimeout(function() {
                        me.renderTrafficMap(me,me.getTrafficMap().getMap(),null);
                    },2000);

                    break;
                case "traffic":
                    var trafficStore = Ext.getStore('online.TrafficEvent');
                    
                    
                    
                    for(var i = 0; i < this.markers.trafficevents.length; i++){
                        this.markers.trafficevents[i].setVisible((localStorage.getItem('displayTraffic')==1?true:false));
                    }
                    
                    if(this.markers.trafficevents.length == 0 && localStorage.getItem('displayTraffic')==1){

                        trafficStore.removeAll();
                        for(var i = 0; i < this.markers.trafficevents.length; i++){
                            this.markers.trafficevents[i].setMap(null);
                        }
                        this.markers.trafficevents = [];
                        trafficStore.getProxy().setUrl('http://data.beroads.com/IWay/TrafficEvent/'+localStorage.getItem('lang')+'/all.jsonp');
                        trafficStore.getProxy().setExtraParam('from',
                        BeRoads.app.user_coords.coords.latitude + "," + BeRoads.app.user_coords.coords.longitude);
                        trafficStore.getProxy().setExtraParam('area', localStorage.getItem('area'));
                        trafficStore.load();
                        this.renderTrafficMap(this,this.getTrafficMap().getMap(),null);
                    }
                    
                    break;
                case "radars":

                    var radarStore = Ext.getStore('online.Radar');
                    
                    
                    
                    for(var i = 0; i < this.markers.radars.length; i++){
                        this.markers.radars[i].setVisible((localStorage.getItem('displayRadars')==1?true:false));
                    }
                    
                    //we load it if the user switch it on
                    if(this.markers.radars.length==0 && localStorage.getItem('displayRadars')==1){

                        radarStore.removeAll();
                        for(var i = 0; i < this.markers.radars.length; i++){
                            this.markers.radars[i].setMap(null);
                        }
                        this.markers.radars = [];
                        radarStore.getProxy().setExtraParam('from',
                        BeRoads.app.user_coords.coords.latitude + "," + BeRoads.app.user_coords.coords.longitude);
                        radarStore.getProxy().setExtraParam('area',
                        localStorage.getItem('area'));
                        radarStore.load();
                        this.renderTrafficMap(this,this.getTrafficMap().getMap(),null);
                    }
                    break;
                case "webcams":
                    var webcamStore = Ext.getStore('online.Webcam');
                    
                    
                    
                    for(var i = 0; i < this.markers.webcams.length; i++){
                        this.markers.webcams[i].setVisible((localStorage.getItem('displayWebcams')==1?true:false));
                    }
                    //we load it if the user switch it on
                    if(this.markers.webcams.length==0 && localStorage.getItem('displayWebcams')==1){
                        webcamStore.removeAll();
                        for(var i = 0; i < this.markers.webcams.length; i++){
                            this.markers.webcams[i].setMap(null);
                        }
                        this.markers.webcams = [];
                        webcamStore.getProxy().setExtraParam('from',
                        BeRoads.app.user_coords.coords.latitude + "," + BeRoads.app.user_coords.coords.longitude);
                        webcamStore.getProxy().setExtraParam('area',
                        localStorage.getItem('area'));
                        webcamStore.load();
                        this.renderTrafficMap(this,this.getTrafficMap().getMap(),null);
                    }
                    break;
            } 
        
    },

    showCenteredOverlay : function (marker) {
        this.getInfoPanel().setHtml(marker.html);
        this.getInfoPanel().show();
    },

    /**
     * Add a radar marker to the map
     * @input radar : a radar object
     * @input position : a position object (latitude, longitude)
     * @return
     */
    addRadar : function (radar, position) {
        var me = this;
        var size = this.markers.radars.push(new google.maps.Marker({
            id : radar.id,
            map:me.map,
            position:position,
            title:radar.name,
            html : "<span class=\"popupTitle\">Radar</span><span class=\"popupDescription\">Speed Limit : "+radar.speedLimit+"</span>",
            icon:'resources/img/radar.png'
        }));
        google.maps.event.addListener(me.markers.radars[size-1], 'click', function () {
            me.showCenteredOverlay(me.markers.radars[size-1]);
        })
    },

    /**
     * Add a webcam marker to the map
     * @input webcam : a webcam object
     * @input position : a position object (latitude, longitude)
     * @return
     */
    addWebcam : function (webcam, position) {
        var me = this;
        var size =this.markers.webcams.push(new google.maps.Marker({
            id : webcam.id,
            map:me.map,
            position:position,
            title:webcam.name,
            html : '<span class=\"popupTitle\">'+webcam.city+"</span><img src='http://src.sencha.io/detect/"+webcam.img+"' />",
            icon:'resources/img/webcam.png'
        }));
        google.maps.event.addListener(me.markers.webcams[size-1], 'click', function () {
            me.showCenteredOverlay(me.markers.webcams[size-1]);
        });
    },

    /**
     * Add a traffic event marker to the map
     * @input trafficevent : a trafficevent object
     * @input position : a position object (latitude, longitude)
     * @return
     */
    addTrafficEvent : function (trafficevent, position) {
        var me = this;
        if (trafficevent.category != undefined && trafficevent.category != null) {
            trafficevent.category = trafficevent.category.toLowerCase().replace(" ", "");
            var size = this.markers.trafficevents.push(new google.maps.Marker({
                id : trafficevent.id,
                map:me.map,
                position:position,
                title:trafficevent.location,
                html : '<span class=\"popupTitle\">'+trafficevent.location+'</span><span class=\"popupDescription\">'+
                    trafficevent.message+'</span>',
                icon:'resources/img/' + trafficevent.category + '.png'
            }));
            google.maps.event.addListener(me.markers.trafficevents[size-1], 'click', function () {
                me.showCenteredOverlay(me.markers.trafficevents[size-1]);
            });
        }
    },

    renderTrafficMap : function(comp, map, eOpts) {

        var me = this;
        me.map = map;
		/**
		 * Display the info panel with the clicked item information on it
		 * @input marker : the clicked marker
		 * @return
		 */


		//create a GMap position with the geo updated values
        var userPosition = new google.maps.LatLng(BeRoads.app.user_coords.coords.latitude,
            BeRoads.app.user_coords.coords.longitude);

		//create the user marker
        me.markers.user = new google.maps.Marker({
            map:me.map,
            position:userPosition,
            icon:'resources/img/user.png'
        });

        if (localStorage.getItem('displayTraffic')==1) {

			// loop in traffic events store and add markers to the map
            var trafficStore = Ext.getStore('offline.TrafficEvent');
            trafficStore.each(function(item){
                if (item.data.lng != 0 && item.data.lat != 0 ) {
                    var position = new google.maps.LatLng(item.data.lat, item.data.lng);
                    me.addTrafficEvent(item.data, position);
                }
            });
        }

        if (localStorage.getItem('displayRadars')==1) {
			// loop in radars store and add markers to the map
            var radarStore = Ext.getStore('offline.Radar');
            radarStore.each(function(item){
                if (item.data.lng != 0 && item.data.lat != 0 ) {
                    var position = new google.maps.LatLng(item.data.lat, item.data.lng);
                    me.addRadar(item.data, position);
                }
            });
        }

        if (localStorage.getItem('displayWebcams')==1) {
			// loop in webcams store and add markers to the map
            var webcamStore = Ext.getStore('offline.Webcam');
            webcamStore.each(function(item){
                if (item.data.lng != 0 && item.data.lat != 0 ) {
                    var position = new google.maps.LatLng(item.data.lat, item.data.lng);
                    me.addWebcam(item.data, position);
                }
            });
        }
		//center the map on user's position
        me.map.setCenter(userPosition);

        //Update user position in real time 
        var user = me.markers.user;
        navigator.geolocation.watchPosition(function(position){
            
            //if the user has moved from more than 100 meters, we recenter the map to follow him
            if(getDistance(position.coords.latitude, position.coords.longitude, user.getPosition().lat(), user.getPosition().lng()) > 0.100){
                var userPosition = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);
                user.setPosition(userPosition);
                me.map.setCenter(userPosition);
            }
            
        });
    }
});