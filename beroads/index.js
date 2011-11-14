Ext.ns('Beroads', 'Beroads.views');
Ext.ns('Beroads', 'Beroads.models');
Ext.ns('Beroads', 'Beroads.controllers');
Ext.ns('Beroads', 'Beroads.stores');

Ext.setup({
    statusBarStyle: 'black',
    onReady: function() {
    
        Beroads.app = new Beroads.app({
            title: 'BeRoads',
            name : 'BeRoads', 
                        
            geo : new Ext.util.GeoLocation({
				autoUpdate: true,
				listeners: {
					locationupdate: function (geo) {
						currentLat = geo.latitude;
						currentLng = geo.longitude;
						currentLocation = new google.maps.LatLng(geo.latitude, geo.longitude);
					},
					locationerror: function (   geo,
						                        bTimeout, 
						                        bPermissionDenied, 
						                        bLocationUnavailable, 
						                        message) {
						if(bTimeout){
						    alert('Timeout occurred.');
						}
						else{
						    alert('Error occurred.');
						}
					}
				}
			}),
   	
            aboutPages: [{
                title: 'Overview',
                card: {
                    xtype: 'htmlpage',
                    url: 'overview.html'
                }
            },
            {
                title: 'Credits',
                card: {
                    xtype: 'htmlpage',
                    url: 'credits.html'
                }
            }]
        });
        
        
        //Function automatically triggered on success
		var showCoords = function(position) {
		  var coords = position.coords;
		}
		
		//Function automatically triggered on error
		var showError = function(error) {
		  var coords = "0,0";
		}
		
		navigator.geolocation.getCurrentPosition(showCoords,showError);
		
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
        
        
        
        
    }
	
});
