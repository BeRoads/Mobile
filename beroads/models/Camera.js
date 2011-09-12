Beroads.models.camera = Ext.regModel('Camera', {
	
	fields : ['id', 'name', 'highway', 'img', 'lat', 'lng'],
	proxy: {
		type: 'localstorage',
		id: 'sencha-cameras'
	}
});
