Beroads.models.traffic = Ext.regModel('Traffic', {
	
	fields : ['source', 'location', 'message', 'category', 'time', 'lat', 'lng'],
	proxy: {
		type: 'localstorage',
		id: 'sencha-traffics'
	}
});
