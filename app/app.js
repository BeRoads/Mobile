if(!Ext.device.Connection.isOnline()){
    console.log('No connection available, fallback mode...');
}else{

    Ext.device.Orientation = 'portrait';
    Ext.USER_COORDS = {
        position : {
            coords : {
                latitude : 0,
                longitude : 0
            }
        }
    };
    if(localStorage.getItem('lang') == undefined || localStorage.getItem('lang') == null){
        localStorage.setItem('lang', 'nl');
    }
    if(localStorage.getItem('area') == undefined || localStorage.getItem('area') == null){
        localStorage.setItem('area', 50);
    }

    if(localStorage.getItem('displayTraffic') == undefined || localStorage.getItem('displayTraffic') == null){
        localStorage.setItem('displayTraffic', true);
    }

    if(localStorage.getItem('displayCameras') == undefined || localStorage.getItem('displayCameras') == null){
        localStorage.setItem('displayCameras', true);
    }

    if(localStorage.getItem('displayRadars') == undefined || localStorage.getItem('displayRadars') == null){
        localStorage.setItem('displayRadars', true);
    }

    if(localStorage.getItem('lastUpdate') == undefined || localStorage.getItem('lastUpdate') == null){
        localStorage.setItem('lastUpdate', new Date().getTime());
    }
    Ext.application({
        name: 'BeRoads',
        launched : false,
        last_update : 0,
        loaded : 0,
        loadingMask : null,
        autoCreateViewport: true,
        models: ['Webcam', 'Radar', 'TrafficEvent'],

        stores : ['offline.Radar', 'online.Radar','offline.Webcam', 'online.Webcam', 'offline.TrafficEvent',
            'online.TrafficEvent'],

        profiles: ['PortraitPhone', 'LandscapePhone', 'PortraitTablet', 'LandscapeTablet'],

        //sets up the icon and startup screens for when the app is added to a phone/tablet home screen
        startupImage: {
            '320x460': 'resources/startup/Default.jpg', // Non-retina iPhone, iPod touch, and all Android devices
            '640x920': 'resources/startup/640x920.png', // Retina iPhone and iPod touch
            '640x1096': 'resources/startup/640x1096.png', // iPhone 5 and iPod touch (fifth generation)
            '768x1004': 'resources/startup/768x1004.png', //  Non-retina iPad (first and second generation) in portrait orientation
            '748x1024': 'resources/startup/748x1024.png', //  Non-retina iPad (first and second generation) in landscape orientation
            '1536x2008': 'resources/startup/1536x2008.png', // : Retina iPad (third generation) in portrait orientation
            '1496x2048': 'resources/startup/1496x2048.png' // : Retina iPad (third generation) in landscape orientation
        },

        isIconPrecomposed: false,
        icon: {
            57: 'resources/icons/icon.png',
            72: 'resources/icons/icon@72.png',
            114: 'resources/icons/icon@2x.png',
            144: 'resources/icons/icon@144.png'
        },

        launch: function() {

            console.log('[+] Launch default version...');

            //TODO : fix the loading animation (what about a car that fill up ?)
            var loadingMask = Ext.Viewport.add({
                masked: {
                    xtype: 'loadmask',
                    message: "<center><img height='50' width='100' src='resources/img/loader.gif'/><br />Loading ...</center>",
                    indicator: false
                }
            });

            this.geo = new Ext.util.GeoLocation({
                autoUpdate:true
            });
            this.geo.on('locationupdate', this.onGeoUpdate, this);
            this.geo.updateLocation();

            var showView = function(){
                if(!this.launched){
                    if(this.loaded < 3){
                        setTimeout(function() { showView(); }, 1000);
                    }else{
                        Ext.Viewport.remove(loadingMask);


                        if(Ext.os.is.Phone && Ext.Viewport.getOrientation() == 'landscape'){
                            Ext.Viewport.add({
                                xclass: 'BeRoads.view.landscapephone.Main'
                            });
                        }
                        else if(Ext.os.is.Phone && Ext.Viewport.getOrientation() == 'portrait'){
                            Ext.Viewport.add({
                                xclass: 'BeRoads.view.portraitphone.Main'
                            });
                        }
                        else if(Ext.os.is.Tablet && Ext.Viewport.getOrientation() == 'landscape'){
                            Ext.Viewport.add({
                                xclass: 'BeRoads.view.landscapetablet.Main'
                            });
                        }
                        else if(Ext.os.is.Tablet && Ext.Viewport.getOrientation() == 'portrait'){
                            Ext.Viewport.add({
                                xclass: 'BeRoads.view.portraittablet.Main'
                            });
                        }else{
                            Ext.Viewport.add({
                                xclass: 'BeRoads.view.portraitphone.Main'
                            });
                        }
                        this.launched = true;

                    }
                }

            };

            setTimeout(function() { showView()},2000);

        },


        /**
         * Callback for geo coords update
         */
        onGeoUpdate:function (coords) {


            var me = this;
            if (coords != undefined) {
                var now = new Date().getTime();


                if(this.loaded==0){
                    console.log('[+] Loading online stores...');
                    Ext.USER_COORDS = coords;
                    var trafficStore = Ext.getStore('online.TrafficEvent');

                    trafficStore.getProxy().setExtraParam('from',
                        Ext.USER_COORDS.position.coords.latitude + "," + Ext.USER_COORDS.position.coords.longitude);
                    trafficStore.getProxy().setExtraParam('area',
                        localStorage.getItem('area'));

                    trafficStore.addListener('load', function () {
                        Ext.getStore('offline.TrafficEvent').getProxy().clear();
                        this.each(function (record) {
                            var trafficEvents = record.raw.TrafficEvent.item;
                            for(var i = 0; i < trafficEvents.length; i++){
                                trafficEvents[i].id = i;
                                Ext.getStore('offline.TrafficEvent').add(trafficEvents[i]);
                            }
                        });
                        Ext.getStore('offline.TrafficEvent').sync();
                        me.loaded++;
                    });
                    trafficStore.load();

                    var radarStore = Ext.getStore('online.Radar');
                    radarStore.getProxy().setExtraParam('from',
                        Ext.USER_COORDS.position.coords.latitude + "," + Ext.USER_COORDS.position.coords.longitude);
                    radarStore.getProxy().setExtraParam('area',
                        localStorage.getItem('area'));

                    radarStore.addListener('load', function () {
                        Ext.getStore('offline.Radar').getProxy().clear();
                        this.each(function (record) {
                            var radars = record.raw.Radar.item;
                            for(var i = 0; i < radars.length; i++){
                                radars[i].id = i;
                                Ext.getStore('offline.Radar').add(radars[i]);
                            }
                        });
                        Ext.getStore('offline.Radar').sync();
                        me.loaded++;
                    });
                    radarStore.load();


                    var webcamStore = Ext.getStore('online.Webcam');
                    webcamStore.getProxy().setExtraParam('from',
                        Ext.USER_COORDS.position.coords.latitude + "," + Ext.USER_COORDS.position.coords.longitude);
                    webcamStore.getProxy().setExtraParam('area',
                        localStorage.getItem('area'));

                    webcamStore.addListener('load', function () {
                        Ext.getStore('offline.Webcam').getProxy().clear();
                        this.each(function (record) {
                            var cameras = record.raw.Camera.item;
                            for(var i = 0; i < cameras.length; i++){
                                cameras[i].id = i;
                                Ext.getStore('offline.Webcam').add(cameras[i]);
                            }
                        });
                        Ext.getStore('offline.Webcam').sync();
                        me.loaded++;

                    });
                    webcamStore.load();

                    //set last update
                    localStorage.setItem('lastUpdate', new Date().getTime());
                }
            }


        }

    });

}
