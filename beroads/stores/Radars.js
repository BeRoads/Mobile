Beroads.stores.radars = new Ext.data.Store({
    model : 'Radar',
    autoload : true,
    getGroupString: function(r){
	return r.get('name');
    }
});

