Ext.define('BeRoads.model.TrafficEvent', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'source',   type: 'string'},
            {name: 'location', type: 'string'},
            {name: 'message', type:'string'},
            {name: 'category', type:'string'},
            {name: 'lat', type:'string'},
            {name: 'lng', type:'string'},
            {name: 'distance', type:'integer'}

        ]
    }
    }
);

