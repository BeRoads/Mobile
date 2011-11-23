Beroads.models.camera = Ext.regModel('Camera', {
	fields : ['id', 'zone', 'city', 'img', 'lat', 'lng'],
	proxy: {
		type: 'localstorage',
		id: 'sencha-cameras'
	}
});
