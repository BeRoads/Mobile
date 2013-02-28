Ext.define('BeRoads.store.offline.TrafficEvent', {
    extend : 'Ext.data.Store',
    requires: 'BeRoads.model.TrafficEvent',

    config : {
        model: 'BeRoads.model.TrafficEvent',
        autoLoad: false,
        storeId: 'offline.TrafficEvent',
        proxy: {
            type: 'localstorage',
            id: 'TrafficEvent'
        }
    }
});