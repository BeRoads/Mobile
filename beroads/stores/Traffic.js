Beroads.stores.Traffic = new Ext.data.Store({
    model : 'Traffic',
    autoload : true,
    getGroupString: function(r){
	return r.get('lastUpdate');
    }
});
