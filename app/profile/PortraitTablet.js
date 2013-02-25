Ext.define('BeRoads.profile.PortraitTablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'PortraitTablet',
        controllers: ['Webcams', 'Radars', 'TrafficEvents', 'Map', 'Settings', 'About'],
        views: ['Main', 'Settings', 'Map', 'AboutList',
            'trafficevents.List', 'trafficevents.Detail', 'radars.List', 'radars.Detail', 'webcams.List', 'webcams.Detail']
    },

    isActive: function() {
        return Ext.os.is.Tablet && Ext.Viewport.getOrientation() == 'portrait';
    },

    launch: function() {
        console.log("Launching portrait tablet version...");

    }
});
