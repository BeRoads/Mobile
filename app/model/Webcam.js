Ext.define('BeRoads.model.Webcam', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        	{name: 'zone', type: 'string'},
			{name: 'city', type: 'string'},
			{name : 'img', type: 'string'},
			{name: 'lat', type: 'string'},
			{name: 'lng', type: 'string'},
			{name: 'distance', type: 'string'}
		]
    }
});