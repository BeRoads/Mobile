Beroads.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    id : 'viewport',
    tabBar: {
        ui: 'gray',
        dock: 'bottom',
        layout: { pack: 'center' },
	
    },
    
    cardSwitchAnimation: false,

    initComponent: function() {

        if (navigator.onLine) {
            this.items = [{
                xtype: 'Beroads.views.Map',
                iconCls: 'info',
                title: 'Carte'
            }, {
                title: 'Traffic',
                iconCls: 'info',
                xtype: 'Beroads.views.TrafficList'
            }, {
                title: 'Radars',
                iconCls: 'info',
                xtype: 'Beroads.views.RadarsList'
            }, {
                title: 'Cameras',
                iconCls: 'info',
                xtype: 'Beroads.views.CamerasList',
            },
	    {
                title: 'Plus',
                xtype: 'aboutlist',
                iconCls: 'info',
                pages: this.aboutPages
            }];
        } else {
            this.on('render', function(){
                this.el.mask('No internet connection.');
            }, this);
        }
        
        Beroads.views.Viewport.superclass.initComponent.call(this);

    },


    reveal : function(target) {

       this.setActiveItem(
            Beroads.views[target],
            { type: 'slide' }
        );
    }
    
 

    
    
});
Ext.reg('Beroads.views.Viewport', Beroads.views.Viewport);
