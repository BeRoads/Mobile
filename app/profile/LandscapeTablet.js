Ext.define('BeRoads.profile.LandscapeTablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'LandscapeTablet',
        controllers: ['Main', 'Webcams', 'Radars', 'TrafficEvents', 'Map', 'Settings'],
        views: ['Main', 'Settings', 'Map', 
            'trafficevents.List', 'trafficevents.Detail', 'radars.List', 'radars.Detail', 'webcams.List', 'webcams.Detail']
    },

    isActive: function() {
        return Ext.os.is.Tablet && Ext.Viewport.getOrientation() == 'landscape';
    },

    launch: function() {
        

    }
});

