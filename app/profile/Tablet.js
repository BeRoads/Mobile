Ext.define('BeRoads.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Tablet',
        controllers: ['Cameras', 'Radars', 'Traffic', 'Map', 'Settings', 'About'],
        views: ['Main', 'Settings', 'Map', 'AboutList',
            'traffic.List', 'traffic.Detail', 'radars.List', 'radars.Detail', 'cameras.List', 'cameras.Detail']
    },

    isActive: function() {
        return Ext.os.is.Tablet;
    },

    launch: function() {
        console.log("Launching tablet version...");
        this.callParent(arguments);
    }
});