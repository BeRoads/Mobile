Ext.define('BeRoads.store.offline.Radar', {
    extend : 'Ext.data.Store',
    requires: ['Ext.data.proxy.LocalStorage', 'BeRoads.model.Radar'],

    config : {
        model: 'BeRoads.model.Radar',
        autoLoad: false,
        storeId: 'offline.Radar',
        proxy: {
            type: 'localstorage',
            id: 'Radar'
        }
    }
});