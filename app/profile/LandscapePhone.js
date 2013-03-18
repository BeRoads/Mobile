Ext.define('BeRoads.profile.LandscapePhone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'LandscapePhone',
        controllers: ['Webcams', 'Radars', 'TrafficEvents', 'Map', 'Settings'],
        views: ['Main', 'Settings', 'Map',
            'trafficevents.List', 'trafficevents.Detail', 'radars.List', 'radars.Detail', 'webcams.List', 'webcams.Detail']
    },

    isActive: function() {
        return Ext.os.is.Phone && Ext.Viewport.getOrientation() == 'landscape';
    },

    launch: function() {
        console.log("Launching landscape phone version...");

    }
});
