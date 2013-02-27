Ext.define('BeRoads.controller.Map', {
    extend: 'Ext.app.Controller',

    views: ['Main', 'Map', 'trafficevents.List'],
    stores : ['offline.Radar', 'online.Radar','offline.Webcam', 'online.Webcam', 'offline.TrafficEvent', 'online.TrafficEvent'],
    markers : {
        trafficevents : [],
        radars : [],
        cameras : []
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
            },
            preferenceButton : {
                tap : 'openPreferences'
            }
        }
    },

    init:function () {
        console.log("[+] Initialize default map controller");
        this.callParent(arguments);
    },
    renderTrafficMap : function(comp, map, eOpts) {

        //this.getPreferenceButton().show();
        var me = this;

        var showCenteredOverlay = function (data) {
            me.getInfoPanel().setHtml(data.html);
            me.getInfoPanel().show();

        };

        var addCamera = function (camera, position) {
            me.markers.cameras[camera.id] = new google.maps.Marker({
                id : camera.id,
                map:map,
                position:position,
                title:camera.name,
                html : '<span class=\"popupTitle\">'+camera.city+"</span><img src='http://src.sencha.io/detect/"+camera.img+"' />",
                icon:'resources/img/camera.png'
            });
            google.maps.event.addListener(me.markers.cameras[camera.id], 'click', function () {
                map.setCenter(this.position);
                showCenteredOverlay(me.markers.cameras[camera.id]);
            });
        };
        var addRadar = function (radar, position) {

            me.markers.radars[radar.id] = new google.maps.Marker({
                id : radar.id,
                map:map,
                position:position,
                title:radar.name,
                html : "<span class=\"popupTitle\">Radar</span><span class=\"popupDescription\">Speed Limit : "+radar.speedLimit+"</span>",
                icon:'resources/img/radar.png'
            });
            google.maps.event.addListener(me.markers.radars[radar.id], 'click', function () {
                map.setCenter(this.position);
                //showCenteredOverlay(me.markers.radars[radar.id]);
            })
        };

        var addMarker = function (trafficevent, position) {

            if (trafficevent.category != undefined && trafficevent.category != null) {
                me.markers.trafficevents[trafficevent.id] = new google.maps.Marker({
                    id : trafficevent.id,
                    map:map,
                    position:position,
                    title:trafficevent.location,
                    html : '<span class=\"popupTitle\">'+trafficevent.location+'</span><span class=\"popupDescription\">'+
                        trafficevent.message+'</span>',
                    icon:'resources/img/' + (trafficevent.category.toLowerCase()).replace(" ", "") + '.png'
                });
                google.maps.event.addListener(me.markers.trafficevents[trafficevent.id], 'click', function () {

                    map.setCenter(this.position);
                    showCenteredOverlay(me.markers.trafficevents[trafficevent.id]);

                });
            }


        };
        var userPosition = new google.maps.LatLng(Ext.USER_COORDS.position.coords.latitude,
            Ext.USER_COORDS.position.coords.longitude);

        var marker = new google.maps.Marker({
            map:map,
            position:userPosition,
            icon:'resources/img/user.png'
        });
        if (localStorage.getItem('displayTraffic') == 'true') {

            var trafficStore = Ext.getStore('offline.TrafficEvent');
            trafficStore.each(function(item){
                if (item.data.lng != 0 && item.data.lat != 0 ) {
                    var position = new google.maps.LatLng(item.data.lat, item.data.lng);
                    addMarker(item.data, position);
                }
            });
        }

        if (localStorage.getItem('displayRadars') == 'true') {
            var radarStore = Ext.getStore('offline.Radar');
            radarStore.each(function(item){
                if (item.data.lng != 0 && item.data.lat != 0 ) {
                    var position = new google.maps.LatLng(item.data.lat, item.data.lng);
                    addRadar(item.data, position);
                }
            });
        }

        if (localStorage.getItem('displayCameras') == 'true') {
            var cameraStore = Ext.getStore('offline.Webcam');
            cameraStore.each(function(item){
                if (item.data.lng != 0 && item.data.lat != 0 ) {
                    var position = new google.maps.LatLng(item.data.lat, item.data.lng);
                    addCamera(item.data, position);
                }
            });
        }
        map.setCenter(userPosition);

    }

});