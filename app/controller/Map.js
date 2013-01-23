Ext.define('BeRoads.controller.Map', {
    extend: 'Ext.app.Controller',

    views: ['Map'],
    stores : ['offline.Radar', 'online.Radar','offline.Camera', 'online.Camera', 'offline.Traffic', 'online.Traffic'],

    config: {
        refs: {
            trafficMap: '#trafficMap',
            main: '#mainpanel',
            preferenceButton : '#preferenceButton',
            saveButton : '#saveButton'
        },
        control: {
            trafficMap: {
                maprender: 'renderTrafficMap',
                painted : 'loadTrafficMap'
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

    openPreferences : function() {

    },

    loadTrafficMap : function(){

    },

    renderTrafficMap : function(comp, map, eOpts) {

        //this.getPreferenceButton().show();

        console.log('[+] Rendering traffic map ...');
        var showCenteredOverlay = function (data) {
            Ext.Msg.alert(data.title, data.html, Ext.emptyFn);
        };

        var addCamera = function (camera, position) {
            var marker = new google.maps.Marker({
                map:map,
                position:position,
                title:camera.name,
                html : "<span class=\"popupTitle\" >"+camera.city+"</span><img margin-bottom='0px' height='50%' width='100%' src='"+camera.img+"' />",
                icon:'resources/img/camera.png'
            });
            google.maps.event.addListener(marker, 'click', function () {
                map.setCenter(this.position);
                showCenteredOverlay(marker);
            });
        };
        var addRadar = function (radar, position) {

            var marker = new google.maps.Marker({
                map:map,
                position:position,
                title:radar.name,
                html : "<span class=\"popupTitle\">Radar</span><span class=\"popupDescription\">Speed Limit : "+radar.speedLimit+"</span>",
                icon:'resources/img/radar.png'
            });
            google.maps.event.addListener(marker, 'click', function () {
                map.setCenter(this.position);
                showCenteredOverlay(marker);
            })
        };

        var addMarker = function (trafficevent, position) {

            if (trafficevent.category != undefined && trafficevent.category != null) {
                var marker = new google.maps.Marker({
                    map:map,
                    position:position,
                    title:trafficevent.location,
                    html : '<span class=\"popupTitle\">'+trafficevent.location+'</span><span class=\"popupDescription\">'+truncateContent(trafficevent.message)+'</span>',
                    icon:'resources/img/' + (trafficevent.category.toLowerCase()).replace(" ", "") + '.png'
                });
                google.maps.event.addListener(marker, 'click', function () {

                    map.setCenter(this.position);

                    showCenteredOverlay(marker);

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

            var trafficStore = Ext.getStore('offline.Traffic');
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
            var cameraStore = Ext.getStore('offline.Camera');
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