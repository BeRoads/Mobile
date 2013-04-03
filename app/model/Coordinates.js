Ext.define('BeRoads.model.UserSettings', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'altitude', type: 'float' },
            { name: 'longitude', type: 'double' },
            { name: 'latitude', type: 'double' },
            { name : 'accuracy', type : 'float'},
            { name: 'altitudeAccuracy', type: 'float' },
            { name: 'heading', type: 'string' },
            { name: 'speed', type: 'float' },
            { name : 'timestamp', type : 'integer'}
        ]
    }
});