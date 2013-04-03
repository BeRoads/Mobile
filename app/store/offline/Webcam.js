Ext.define('BeRoads.store.offline.Webcam', {
    extend : 'Ext.data.Store',
    requires: ['Ext.data.proxy.LocalStorage','BeRoads.model.Webcam'],

    config : {
        model: 'BeRoads.model.Webcam',
        autoLoad: false,
        storeId: 'offline.Webcam',
		grouper : {
			property: 'zone',
			sortProperty: 'zone'
		},
        proxy: {
            type: 'localstorage',
            id: 'Webcam'
        }
    }
});