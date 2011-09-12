Beroads.stores.cameras = new Ext.data.Store({
    model : 'Camera',
    autoload : true,
    getGroupString: function(r){
	return r.get('name');
    }
});
