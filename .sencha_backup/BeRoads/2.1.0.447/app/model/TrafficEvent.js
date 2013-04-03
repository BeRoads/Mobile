Ext.define('BeRoads.model.TrafficEvent', {
	extend: 'Ext.data.Model',

	config: {
		fields: [
		{name: 'source'},
		{name: 'location'},
		{name: 'message'},
		{name: 'category'},
		{name: 'lat'},
		{name: 'lng'},
		{name: 'distance'},
		{name : 'time'},
		{name : 'formatted_time', type : 'string'}
		]
	}
}
);

