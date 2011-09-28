Ext.ns('Beroads', 'Beroads.views');
Ext.ns('Beroads', 'Beroads.models');
Ext.ns('Beroads', 'Beroads.controllers');
Ext.ns('Beroads', 'Beroads.stores');

Ext.setup({
    statusBarStyle: 'black',
    onReady: function() {
        Beroads.app = new Beroads.app({
            title: 'BeRoads',
           
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
        if(localStorage.getItem('lang') == undefined || localStorage.getItem('lang') == null){
        	localStorage.setItem('lang', 'nl');
        } 

		if(localStorage.getItem('region') == undefined || localStorage.getItem('region') == null){
        	localStorage.setItem('region','flanders');
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
