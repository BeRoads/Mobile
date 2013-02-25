Ext.define('BeRoads.profile.LandscapeTablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'LandscapeTablet',
        controllers: ['Webcams', 'Radars', 'TrafficEvents', 'Map', 'Settings', 'About'],
        views: ['Main', 'Settings', 'Map', 'AboutList',
            'trafficevents.List', 'trafficevents.Detail', 'radars.List', 'radars.Detail', 'webcams.List', 'webcams.Detail']
    },

    isActive: function() {
        return Ext.os.is.Tablet && Ext.Viewport.getOrientation() == 'landscape';
    },

    launch: function() {
        console.log("Launching tablet landscape version...");

    }
});

