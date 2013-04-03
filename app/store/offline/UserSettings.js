Ext.define('BeRoads.store.offline.UserSettings', {
    extend: 'Ext.data.Store',
    config: {
        model: 'BeRoads.model.UserSettings',
        autoLoad: true
    }
});