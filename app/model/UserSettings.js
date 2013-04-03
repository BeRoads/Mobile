Ext.define('BeRoads.model.UserSettings', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            { name: 'language', type: 'string' },
            { name: 'area', type: 'float' },
            { name: 'displayRadars', type: 'boolean' },
            { name: 'displayTraffic', type: 'boolean' },
            { name: 'displayWebcams', type: 'boolean' },
            { name: 'lastUpdate', type: 'integer' },
            { name: 'coordinates', type: 'BeRoads.model.Coordinates' }
        ],
        proxy: {
            type: 'localstorage',
            id: 'BeRoads.UserSettings'
        }
    }
});