Beroads.stores.Traffic = new Ext.data.Store({
    model : 'Traffic',
    autoload : false,	   
    getGroupString: function(r){
		return r.get('time');
    }
});

                
