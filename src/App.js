oreilly.cfg = {};

oreilly.OfflineStore = new Ext.data.Store({
    model: 'OfflineData',
    autoLoad: true
});

oreilly.ParkingStore = new Ext.data.Store({
    model: 'Parking',
    
    getGroupString: function(r){
        return r.get('name')[0]
    }
});

oreilly.TraficEventStore = new Ext.data.Store({
    model : 'TraficEvent',

    getGroupString: function(r){
	return r.get('lastUpdate');
    }
});

oreilly.CameraStore = new Ext.data.Store({
    model : 'Camera',

    getGroupString: function(r){
	return r.get('name');
    }
});

oreilly.App = Ext.extend(Ext.TabPanel, {
    
    fullscreen: true,
    
    tabBar: {
        ui: 'gray',
        dock: 'bottom',
        layout: { pack: 'center' }
    },
    
    cardSwitchAnimation: false,
    
    initComponent: function() {

        if (navigator.onLine) {
            this.items = [{
                xtype: 'trafic',
                iconCls: 'info',
                title: 'Trafic'
            }, {
                title: 'Cameras',
                iconCls: 'info',
                xtype: 'camera'
            }, {
                title: 'Meteo',
                iconCls: 'info',
                xtype: 'meteo',
                hashtag: this.twitterSearch
            }, {
                title: 'Parkings',
                iconCls: 'info',
                xtype: 'parking',
                coords: this.gmapCoords,
                mapText: this.gmapText,
                permLink: this.gmapLink,
            },
	    {
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
        
        oreilly.cfg = {};
        oreilly.cfg.shortUrl = this.shortUrl;
        oreilly.cfg.title = this.title;
        
        oreilly.App.superclass.initComponent.call(this);
    }
    
});
