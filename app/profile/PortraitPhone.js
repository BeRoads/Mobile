Ext.define('BeRoads.profile.PortraitPhone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'PortraitPhone',
        controllers: ['Main', 'Webcams', 'Radars', 'TrafficEvents', 'Map', 'Settings'],
        views: ['Main', 'Settings', 'Map',
            'trafficevents.List', 'trafficevents.Detail', 'radars.List', 'radars.Detail', 'webcams.List', 'webcams.Detail']
    },

    isActive: function() {
        return Ext.os.is.Phone && Ext.Viewport.getOrientation() == 'portrait';
    },

    launch: function() {
        return;
    }
});
