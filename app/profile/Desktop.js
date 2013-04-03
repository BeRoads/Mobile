Ext.define('BeRoads.profile.Desktop', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Desktop',
        controllers: ['Main', 'Webcams', 'Radars', 'TrafficEvents', 'Map', 'Settings'],
        views: ['Main', 'Settings', 'Map',
            'trafficevents.List', 'trafficevents.Detail', 'radars.List', 'radars.Detail', 'webcams.List', 'webcams.Detail']
    },

    isActive: function() {
        return Ext.os.is.Desktop;
    },

    launch: function() {
        

    }
});

