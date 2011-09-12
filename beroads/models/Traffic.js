Beroads.models.traffic = Ext.regModel('Traffic', {
	
	fields : ['id', 'source', 'description', 'type', 'name', 'lastUpdate', 'lat', 'lng'],
	proxy: {
		type: 'localstorage',
		id: 'sencha-traffics'
	}
});
