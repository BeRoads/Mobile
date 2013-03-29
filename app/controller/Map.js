Ext.define('BeRoads.controller.Map', {
    extend: 'Ext.app.Controller',

    views: ['Main', 'Map', 'trafficevents.List'],
    stores : ['offline.Radar', 'online.Radar','offline.Webcam', 'online.Webcam', 'offline.TrafficEvent', 'online.TrafficEvent'],
    
    /*
        Store map reference on creation for further access
    */
    map : null,
    /*
        Store every marker from the map for further access
    */
    markers : {
        user : null,
        trafficevents : [],
        radars : [],
        webcams : []
    },
    config: {
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
	
    /**
     *   Change the text values of the view to the current language value.
     *   @return 
    */
    updateLanguage : function() {

        /*
            Only traffic events are impacted by a language change so we reload them 
            if the user wants to see them
        */
        if(localStorage.getItem('displayTraffic')){
            var trafficStore = Ext.getStore('online.TrafficEvent');
            trafficStore.getProxy().setUrl('http://data.beroads.com/IWay/TrafficEvent/'+localStorage.getItem('lang')+'/all.jsonp');
            trafficStore.getProxy().setExtraParam('from',
            Ext.USER_COORDS.coords.latitude + "," + Ext.USER_COORDS.coords.longitude);
            trafficStore.getProxy().setExtraParam('area', localStorage.getItem('area'));
            trafficStore.load();
        }
    },

    /**
     * Called when there is a modification in the 'displayX' values or in the area value. 
     * Update visible markers on the map and delete/reload some values depending on the 
     * new area value.
     */
    updateMapArea : function(type) {

        var onlineTrafficStore = Ext.getStore('online.TrafficEvent');
        var onlineWebcamStore = Ext.getStore('online.Webcam');
        var onlineRadarStore = Ext.getStore('online.Radar');
        var me = this;

        switch(type){

            //we have to reload the content because the area had change
            case "area":
                if(localStorage.getItem('displayTraffic')==1){

                    /*
                        Remove all traffic events markers from the map 
                    */
                    for(var i = 0; i < this.markers.trafficevents.length; i++){
                        this.markers.trafficevents[i].setMap(null);
                    }
                    this.markers.trafficevents = [];

                    /*
                        Reload traffic events with the new parameters
                    */
                    onlineTrafficStore.removeAll();
                    onlineTrafficStore.getProxy().setUrl('http://data.beroads.com/IWay/TrafficEvent/'+localStorage.getItem('lang')+'/all.jsonp');
                    onlineTrafficStore.getProxy().setExtraParam('from',
                    Ext.USER_COORDS.coords.latitude + "," + Ext.USER_COORDS.coords.longitude);
                    onlineTrafficStore.getProxy().setExtraParam('area', localStorage.getItem('area'));
                    onlineTrafficStore.load();
                }

                if(localStorage.getItem('displayRadars')==1){

                    /*
                        Remove all radars markers from the map 
                    */
                    for(var i = 0; i < this.markers.radars.length; i++){
                        this.markers.radars[i].setMap(null);
                    } 
                    this.markers.radars = [];
                    
                    /*
                        Reload radars with the new parameters
                    */
                    onlineRadarStore.removeAll();
                    onlineRadarStore.getProxy().setExtraParam('from',
                    Ext.USER_COORDS.coords.latitude + "," + Ext.USER_COORDS.coords.longitude);
                    onlineRadarStore.getProxy().setExtraParam('area',
                    localStorage.getItem('area'));
                    onlineRadarStore.load();
                }

                if(localStorage.getItem('displayWebcams')==1){

                    /*
                        Remove all webcams markers from the map 
                    */
                    for(var i = 0; i < this.markers.webcams.length; i++){
                        this.markers.webcams[i].setMap(null);
                    } 
                    this.markers.webcams = [];
                    
                    /*
                        Reload webcams with the new parameters
                    */
                    onlineWebcamStore.removeAll();
                    onlineWebcamStore.getProxy().setExtraParam('from',
                    Ext.USER_COORDS.coords.latitude + "," + Ext.USER_COORDS.coords.longitude);
                    onlineWebcamStore.getProxy().setExtraParam('area',
                    localStorage.getItem('area'));
                    onlineWebcamStore.load();
                }

                /*
                    We wait for the store to be populated by waiting 2 seconds because there is no 
                    'loaded' events on these stores.
                    TODO : find another way to do this
                */
                setTimeout(function() {
                    me.renderTrafficMap(me,me.getTrafficMap().getMap(),null);
                },2000);
                break;

            case "traffic":
                
                /*
                    We set the traffic events markers visibility to the new value of 'displayTraffic'
                */
                for(var i = 0; i < this.markers.trafficevents.length; i++){
                    this.markers.trafficevents[i].setVisible((localStorage.getItem('displayTraffic')==1?true:false));
                }
                
                /*
                    If there is no markers on the map and the user wants to see some, we load them
                */
                if(this.markers.trafficevents.length == 0 && localStorage.getItem('displayTraffic')==1){

                    //TODO : is this really useful ?
                    onlineTrafficStore.removeAll();
                    for(var i = 0; i < this.markers.trafficevents.length; i++){
                        this.markers.trafficevents[i].setMap(null);
                    }
                    this.markers.trafficevents = [];
                    onlineTrafficStore.getProxy().setUrl('http://data.beroads.com/IWay/TrafficEvent/'+localStorage.getItem('lang')+'/all.jsonp');
                    onlineTrafficStore.getProxy().setExtraParam('from',
                    Ext.USER_COORDS.coords.latitude + "," + Ext.USER_COORDS.coords.longitude);
                    onlineTrafficStore.getProxy().setExtraParam('area', localStorage.getItem('area'));
                    onlineTrafficStore.load();
                    this.renderTrafficMap(this,this.getTrafficMap().getMap(),null);
                }
                break;
            case "radars":

                /*
                    We set the radars markers visibility to the new value of 'displayRadars'
                */
                for(var i = 0; i < this.markers.radars.length; i++){
                    this.markers.radars[i].setVisible((localStorage.getItem('displayRadars')==1?true:false));
                }
                
                /*
                    If there is no markers on the map and the user wants to see some, we load them
                */
                if(this.markers.radars.length==0 && localStorage.getItem('displayRadars')==1){

                    onlineRadarStore.removeAll();
                    for(var i = 0; i < this.markers.radars.length; i++){
                        this.markers.radars[i].setMap(null);
                    }
                    this.markers.radars = [];
                    onlineRadarStore.getProxy().setExtraParam('from',
                    Ext.USER_COORDS.coords.latitude + "," + Ext.USER_COORDS.coords.longitude);
                    onlineRadarStore.getProxy().setExtraParam('area',
                    localStorage.getItem('area'));
                    onlineRadarStore.load();
                    this.renderTrafficMap(this,this.getTrafficMap().getMap(),null);
                }
                break;
            case "webcams":
               
                /*
                    We set the webcams markers visibility to the new value of 'displayWebcams'
                */
                for(var i = 0; i < this.markers.webcams.length; i++){
                    this.markers.webcams[i].setVisible((localStorage.getItem('displayWebcams')==1?true:false));
                }
                /*
                    If there is no markers on the map and the user wants to see some, we load them
                */
                if(this.markers.webcams.length==0 && localStorage.getItem('displayWebcams')==1){
                    onlineWebcamStore.removeAll();
                    for(var i = 0; i < this.markers.webcams.length; i++){
                        this.markers.webcams[i].setMap(null);
                    }
                    this.markers.webcams = [];
                    onlineWebcamStore.getProxy().setExtraParam('from',
                    Ext.USER_COORDS.coords.latitude + "," + Ext.USER_COORDS.coords.longitude);
                    onlineWebcamStore.getProxy().setExtraParam('area',
                    localStorage.getItem('area'));
                    onlineWebcamStore.load();
                    this.renderTrafficMap(this,this.getTrafficMap().getMap(),null);
                }
                break;
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
        var showCenteredOverlay = function (marker) {
            me.getInfoPanel().setHtml(marker.html);
            me.getInfoPanel().show();
        };

		/**
		 * Add a webcam marker to the map
		 * @input webcam : a webcam object
		 * @input position : a position object (latitude, longitude)
		 * @return 
		 */
        var addWebcam = function (webcam, position) {
            var size =me.markers.webcams.push(new google.maps.Marker({
                id : webcam.id,
                map:me.map,
                position:position,
                title:webcam.name,
                html : '<span class=\"popupTitle\">'+webcam.city+"</span><img src='http://src.sencha.io/detect/"+webcam.img+"' />",
                icon:'resources/img/webcam.png'
            }));
            google.maps.event.addListener(me.markers.webcams[size-1], 'click', function () {
                me.map.setCenter(this.position);
                showCenteredOverlay(me.markers.webcams[size-1]);
            });
        };

		
		/**
		 * Add a radar marker to the map
		 * @input radar : a radar object
		 * @input position : a position object (latitude, longitude)
		 * @return 
		 */
        var addRadar = function (radar, position) {
            var size = me.markers.radars.push(new google.maps.Marker({
                id : radar.id,
                map:me.map,
                position:position,
                title:radar.name,
                html : "<span class=\"popupTitle\">Radar</span><span class=\"popupDescription\">Speed Limit : "+radar.speedLimit+"</span>",
                icon:'resources/img/radar.png'
            }));
            google.maps.event.addListener(me.markers.radars[size-1], 'click', function () {
                me.map.setCenter(this.position);
            })
        };

		/**
		 * Add a traffic event marker to the map
		 * @input trafficevent : a trafficevent object
		 * @input position : a position object (latitude, longitude)
		 * @return 
		 */
        var addTrafficEvent = function (trafficevent, position) {
			
            if (trafficevent.category != undefined && trafficevent.category != null) {
				trafficevent.category = trafficevent.category.toLowerCase().replace(" ", "");
                var size = me.markers.trafficevents.push(new google.maps.Marker({
                    id : trafficevent.id,
                    map:me.map,
                    position:position,
                    title:trafficevent.location,
                    html : '<span class=\"popupTitle\">'+trafficevent.location+'</span><span class=\"popupDescription\">'+
                        trafficevent.message+'</span>',
                    icon:'resources/img/' + trafficevent.category + '.png'
                }));
                google.maps.event.addListener(me.markers.trafficevents[size-1], 'click', function () {
                    me.map.setCenter(this.position);
                    showCenteredOverlay(me.markers.trafficevents[size-1]);
                });
            }
        };

		/*
            create a GMap position with the geo updated values.
        */
        var userPosition = new google.maps.LatLng(Ext.USER_COORDS.coords.latitude,
            Ext.USER_COORDS.coords.longitude);

		/*
            Create the user's position marker.
        */
        me.markers.user = new google.maps.Marker({
            map:me.map,
            position:userPosition,
            icon:'resources/img/user.png'
        });

        /*
            If the user wants to display traffic events, we loop through the store and 
            add markers to the map 
        */
        if (localStorage.getItem('displayTraffic')==1) {
            var trafficStore = Ext.getStore('offline.TrafficEvent');
            trafficStore.each(function(item){
                if (item.data.lng != 0 && item.data.lat != 0 ) {
                    var position = new google.maps.LatLng(item.data.lat, item.data.lng);
                    addTrafficEvent(item.data, position);
                }
            });
        }

        /*
            If the user wants to display radars, we loop through the store and 
            add markers to the map 
        */
        if (localStorage.getItem('displayRadars')==1) {
            var radarStore = Ext.getStore('offline.Radar');
            radarStore.each(function(item){
                if (item.data.lng != 0 && item.data.lat != 0 ) {
                    var position = new google.maps.LatLng(item.data.lat, item.data.lng);
                    addRadar(item.data, position);
                }
            });
        }

        /*
            If the user wants to display webcams, we loop through the store and 
            add markers to the map 
        */
        if (localStorage.getItem('displayWebcams')==1) {
            var webcamStore = Ext.getStore('offline.Webcam');
            webcamStore.each(function(item){
                if (item.data.lng != 0 && item.data.lat != 0 ) {
                    var position = new google.maps.LatLng(item.data.lat, item.data.lng);
                    addWebcam(item.data, position);
                }
            });
        }

        /*
            Center the map on user's position and re-center the map if the user's position change for more
            than 100 meters.
        */
        me.map.setCenter(userPosition);
        var user = me.markers.user;
        navigator.geolocation.watchPosition(function(position){
            if(getDistance(position.coords.latitude, position.coords.longitude, user.getPosition().lat(), user.getPosition().lng()) > 0.100){
                var userPosition = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);
                user.setPosition(userPosition);
                me.map.setCenter(userPosition);
            }
        });
    }
});