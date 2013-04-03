

/* 
	Fallback user coordinates
*/
Ext.USER_COORDS = {
	coords : {
			latitude : 0,
			longitude : 0
		}
	
};

/*
	Set default value for localStorage values that we are using if not set
*/ 
if(localStorage.getItem('lang') == undefined || localStorage.getItem('lang') == null){
	localStorage.setItem('lang', 'nl');
}
if(localStorage.getItem('area') == undefined || localStorage.getItem('area') == null){
	localStorage.setItem('area', 50);
}
if(localStorage.getItem('displayTraffic') == undefined || localStorage.getItem('displayTraffic') == null){
	localStorage.setItem('displayTraffic', 1);
}
if(localStorage.getItem('displayWebcams') == undefined || localStorage.getItem('displayWebcams') == null){
	localStorage.setItem('displayWebcams', 1);
}
if(localStorage.getItem('displayRadars') == undefined || localStorage.getItem('displayRadars') == null){
	localStorage.setItem('displayRadars', 1);
}
if(localStorage.getItem('lastUpdate') == undefined || localStorage.getItem('lastUpdate') == null){
	localStorage.setItem('lastUpdate', new Date().getTime());
}

//push the 'FailCar' view if the app is offline because GMap can't render, even if the stores are offline
if(!Ext.device.Connection.isOnline()){
	
	Ext.application({
		name: 'BeRoads',
		autoCreateViewport: true,
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
			Ext.Viewport.add({
				xclass: 'BeRoads.view.FailCar'
			});
		}
	});
	
}else{

	var app = Ext.application({
		name: 'BeRoads',
		launched : false,
		last_update : 0,
		loadingMask : null,
		loaded : 0,
		loadingMask : null,
		autoCreateViewport: true,
		models: ['Webcam', 'Radar', 'TrafficEvent'],
		views : ['FailCar'],
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

		showPosition : function(position) {
					
			var me = this;
			if (position != undefined && getDistance(position.coords.latitude, position.coords.longitude, 
				Ext.USER_COORDS.coords.latitude, Ext.USER_COORDS.coords.longitude)>0.1) {
							
				now = new Date().getTime();
				Ext.USER_COORDS = position;

                var trafficStore = Ext.getStore('online.TrafficEvent');
				trafficStore.getProxy().setExtraParam('from',
				Ext.USER_COORDS.coords.latitude + "," + Ext.USER_COORDS.coords.longitude);
				trafficStore.getProxy().setExtraParam('area', localStorage.getItem('area'));

				trafficStore.addListener('refresh', function () {
					var localTrafficStore = Ext.getStore('offline.TrafficEvent');
                    localTrafficStore.removeAll();
                    localTrafficStore.getProxy().clear();
					this.each(function (record) {
						var trafficEvent = localTrafficStore.add(record.data)[0];
					});
                    localTrafficStore.sync();
					BeRoads.app.loaded++;
				});
				trafficStore.load();
								
				var radarStore = Ext.getStore('online.Radar');
				radarStore.getProxy().setExtraParam('from',
				Ext.USER_COORDS.coords.latitude + "," + Ext.USER_COORDS.coords.longitude);
				radarStore.getProxy().setExtraParam('area',
				localStorage.getItem('area'));

				radarStore.addListener('refresh', function () {
					var localRadarStore = Ext.getStore('offline.Radar');
                    localRadarStore.removeAll();
                    localRadarStore.getProxy().clear();
					this.each(function (record) {
						var radar = localRadarStore.add(record.data)[0];
					});
                    localRadarStore.sync();
					BeRoads.app.loaded++;
				});
				radarStore.load();

				var webcamStore = Ext.getStore('online.Webcam');
				webcamStore.getProxy().setExtraParam('from',
				Ext.USER_COORDS.coords.latitude + "," + Ext.USER_COORDS.coords.longitude);
				webcamStore.getProxy().setExtraParam('area',
				localStorage.getItem('area'));

				webcamStore.addListener('refresh', function () {
					var localWebcamStore = Ext.getStore('offline.Webcam');
                    localWebcamStore.removeAll();
                    localWebcamStore.getProxy().clear();
					this.each(function (record) {
						var webcam = localWebcamStore.add(record.data)[0];
					});
                    localWebcamStore.sync();
					BeRoads.app.loaded++;
				});
				webcamStore.load();
				localStorage.setItem('lastUpdate', new Date().getTime());
			}
		},

		showError : function(error)
		{
			
			switch(error.code) 
		    {
			    case error.PERMISSION_DENIED:
			    	Ext.Msg.alert('Geolocation', "BeRoads can't run if you don't share your geolocation. Sorry.", Ext.emptyFn);
			    	Ext.Viewport.remove(BeRoads.app.loadingMask);
					Ext.Viewport.add({
						xclass: 'BeRoads.view.FailCar'
					});
			      	break;
			    case error.POSITION_UNAVAILABLE:
			      	Ext.Msg.alert('Geolocation', "Are you in a tunnel ? Seems BeRoads can't access your geolocation", Ext.emptyFn);
			      	Ext.Viewport.remove(BeRoads.app.loadingMask);
					Ext.Viewport.add({
						xclass: 'BeRoads.view.FailCar'
					});
			      	break;
			    case error.TIMEOUT:
			      	Ext.Msg.alert('Geolocation', "BeRoads wasn't fast enough to get your geolocation, please refresh the page", Ext.emptyFn);
			      	Ext.Viewport.remove(BeRoads.app.loadingMask);
					Ext.Viewport.add({
						xclass: 'BeRoads.view.FailCar'
					});
			      	break;
			    case error.UNKNOWN_ERROR:
			      	Ext.Msg.alert('Geolocation', 'An unknown error occured while accessing your geolocation, please refresh the page.', Ext.emptyFn);
			      	Ext.Viewport.remove(BeRoads.app.loadingMask);
					Ext.Viewport.add({
						xclass: 'BeRoads.view.FailCar'
					});
			      	break;
		    }
		},

		launch: function() {

			var me = this;
			//Display a loading mask while we are fetching data from the API
			me.loadingMask = Ext.Viewport.add({
				masked: {
					xtype: 'loadmask',
					message: "<center><img height='50' width='100' src='resources/img/loader.gif'/><br />"+_tr('loading', localStorage.getItem('lang'))+"</center>",
					indicator: false
				}
			});

			if (navigator.geolocation)
		    {
		    	navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
		    	navigator.geolocation.watchPosition(this.showPosition);
		    }
			

			var showView = function(){
				//if the app isn't already launched
				if(!me.launched){
					//if our stores aren't fully loaded, we keep calling it
					if(me.loaded < 3){
						setTimeout(function() { showView(); }, 1000);
					}
					else{
						//remove the loading mask and display a specific view depending on the device profile
						Ext.Viewport.remove(me.loadingMask);
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
						//Now the application is launched
						me.launched = true;
					}
				}
			};
			setTimeout(function() { showView()},1000);
		}
	});
}
