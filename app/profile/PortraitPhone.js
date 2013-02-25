Ext.define('BeRoads.profile.PortraitPhone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'PortraitPhone',
        controllers: ['Webcams', 'Radars', 'TrafficEvents', 'Map', 'Settings', 'About'],
        views: ['Main', 'Settings', 'Map', 'AboutList',
            'trafficevents.List', 'trafficevents.Detail', 'radars.List', 'radars.Detail', 'webcams.List', 'webcams.Detail']
    },

    isActive: function() {
        return Ext.os.is.Phone && Ext.Viewport.getOrientation() == 'portrait';
    },

    launch: function() {
        console.log("Launching portrait phone version...");

    }
});
