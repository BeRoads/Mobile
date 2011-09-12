Beroads.stores.parkings = new Ext.data.Store({
    model: 'Parking',
    autoload : true,    
    getGroupString: function(r){
        return r.get('name')[0]
    }
});
