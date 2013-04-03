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
<<<<<<< HEAD
        console.log("Launching portrait phone version...");
=======
        return;
>>>>>>> 8fb781646e3d42e194ce10c08bb2e7a6392f422a
    }
});
