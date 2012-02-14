Beroads.models.radar = Ext.regModel('Radar', {	
	fields : ['id', 'name', 'speedLimit', 'lat', 'lng', 'distance'],
	proxy: {
		type: 'localstorage',
		id: 'sencha-radars'
	}
});
