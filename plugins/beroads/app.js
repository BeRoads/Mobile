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
	        
        var showCoords = function(position) {
                
                this.localStorage.setItem('userCoords', position.coords.latitude+","+position.coords.longitude);
            }

            //Function automatically triggered on error
            var showError = function(error) {
                this.localStorage.setItem('userCoords', "0,0");
            }

            navigator.geolocation.getCurrentPosition(showCoords,showError);
            
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
                xtype: 'aboutlist',
                iconCls: 'more01',
                title: _tr('more', localStorage.getItem('lang')),
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

