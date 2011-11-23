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
                iconCls: 'map',
                title: _tr('map', localStorage.getItem('lang'))
            }, {
                xtype: 'Beroads.views.TrafficList',
                iconCls: 'traffic',
                title: _tr('traffic', localStorage.getItem('lang'))
            }, {
                xtype: 'Beroads.views.RadarsList',
                iconCls: 'radars',
                title: _tr('radars', localStorage.getItem('lang'))
            }, {
                xtype: 'Beroads.views.CamerasList',
                iconCls: 'cameras',
                title: _tr('cameras', localStorage.getItem('lang'))
            }, {
                xtype: 'Beroads.views.AboutList',
                iconCls: 'more01',
                title: 'Plus',
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

