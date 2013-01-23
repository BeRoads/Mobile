Beroads.models.parking = Ext.regModel('Parking', {
	fields : ['id', 'name', 'highway', 'bk'],
	proxy: {
		type: 'localstorage',
		id: 'sencha-parkings'
	}
});
