Beroads.cfg = {};
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
                title: 'Carte',

            }, {
                title: 'Traffic',
                iconCls: 'traffic',
                xtype: 'Beroads.views.TrafficList',
				

            }, {
                title: 'Radars',
                iconCls: 'radars',
                xtype: 'Beroads.views.RadarsList',
                geo : this.geo
            }, {
                title: 'Cameras',
                iconCls: 'cameras',
                xtype: 'Beroads.views.CamerasList',

            }, {
                title: 'Plus',
                xtype: 'aboutlist',
                iconCls: 'more01',
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

