Ext.ns('Beroads', 'Beroads.views');
Ext.ns('Beroads', 'Beroads.models');
Ext.ns('Beroads', 'Beroads.controllers');
Ext.ns('Beroads', 'Beroads.stores');

Ext.setup({

    statusBarStyle: 'black',
    phoneStartupScreen: 'startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
	
		/* Checking preferences */
		
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
  
        
        Beroads.app = new Beroads.app({
            
            title: 'BeRoads',
            name : 'BeRoads', 
            
            /* Credits and overview pages to show on 'About' section */
            aboutPages: [{
                title: _tr('overview', localStorage.getItem('lang')),
                card: {
                    xtype: 'htmlpage',
                    url: 'beroads/views/overview.html'
                }
            },
            {
                title: _tr('credits', localStorage.getItem('lang')),
                card: {
                    xtype: 'htmlpage',
                    url: 'beroads/views/credits.html'
                }
            }]
        });
    }	
});
