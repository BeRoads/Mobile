Ext.define('BeRoads.store.offline.Traffic', {
    extend : 'Ext.data.Store',
    requires: 'BeRoads.model.Traffic',

    config : {
        model: 'BeRoads.model.Traffic',
        autoLoad: false,
        storeId: 'offline.Traffic',
        proxy: {
            type: 'localstorage',
            id: 'Traffic'
        }
    }

});