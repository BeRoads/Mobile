Ext.define('BeRoads.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Phone',
        controllers: ['Cameras', 'Radars', 'Traffic', 'Map', 'Settings', 'About'],
        views: ['Main', 'Settings', 'Map', 'AboutList',
            'traffic.List', 'traffic.Detail', 'radars.List', 'radars.Detail', 'cameras.List', 'cameras.Detail']
    },

    isActive: function() {
        return Ext.os.is.Phone;
    },

    launch: function() {
        console.log("Launching phone version...");

    }
});