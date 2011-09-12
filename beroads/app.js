Beroads.app = Ext.extend(Ext.TabPanel, {
    
    fullscreen: true,
    id : 'main',
    tabBar: {
        ui: 'gray',
        dock: 'bottom',
        layout: { pack: 'center' }
    },
    
    cardSwitchAnimation: false,
    
    initComponent: function() {

        if (navigator.onLine) {
            this.items = [{
                xtype: 'Beroads.views.Map',
                iconCls: 'info',
                title: 'Map'
            }, {
                title: 'Traffic',
                iconCls: 'info',
                xtype: 'Beroads.views.TrafficList'
            }, {
                title: 'Radars',
                iconCls: 'chat',
                xtype: 'Beroads.views.RadarsList'
            }, {
                title: 'Cameras',
                iconCls: 'info',
                xtype: 'Beroads.views.CamerasList'
            }, {
                title: 'More',
                xtype: 'aboutlist',
                iconCls: 'info',
                pages: this.aboutPages
            }];
        } else {
            this.on('render', function(){
                this.el.mask('No internet connection.');
            }, this);
        }
        
           
        Beroads.app.superclass.initComponent.call(this);
    },

    reveal : function(target) {

       this.setActiveItem(
            Beroads.views[target],
            { type: 'slide' }
        );
    }
    
});
