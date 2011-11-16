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
                title: _tr('overview', localStorage.getItem('lang')),
                card: {
                    xtype: 'htmlpage',
                    url: 'overview.html'
                }
            },
            {
                title: _tr('credits', localStorage.getItem('lang')),
                card: {
                    xtype: 'htmlpage',
                    url: 'credits.html'
                }
            }]
        });
        
        
        
        
        
        
    }
	
});
