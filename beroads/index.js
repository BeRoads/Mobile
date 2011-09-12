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
                    url: 'about.html'
                }
            }, {
                title: 'Sponsors',
                card: {
                    xtype: 'htmlpage',
                    url: 'sponsors.html'
                }
            }, {
                title: 'Credits',
                card: {
                    xtype: 'htmlpage',
                    url: 'credits.html'
                }
            }]
        });

    }

	
});
