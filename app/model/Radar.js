Ext.define('BeRoads.model.Radar', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'speedLimit', type: 'integer'},
            {name: 'distance', type:'integer'},
            {name: 'lat', type:'string'},
            {name: 'lng', type:'string'}
        ]
    }
});