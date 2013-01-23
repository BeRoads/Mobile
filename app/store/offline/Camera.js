Ext.define('BeRoads.store.offline.Camera', {
    extend : 'Ext.data.Store',
    requires: 'BeRoads.model.Camera',

    config : {
        model: 'BeRoads.model.Camera',
        autoLoad: false,
        storeId: 'offline.Camera',
        proxy: {
            type: 'localstorage',
            id: 'Camera'
        }
    }

});