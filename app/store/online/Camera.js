Ext.define('BeRoads.store.online.Camera', {
    extend : 'Ext.data.Store',
    requires: 'BeRoads.model.Camera',

    config : {
        model: 'BeRoads.model.Camera',
        autoLoad: false,
        storeId: 'online.Camera',
        proxy: {
            type: 'jsonp',
            url:'http://data.beroads.com/IWay/Camera.jsonp',
            extraParams:{
                from:Ext.USER_COORDS.position.coords.latitude + "," + Ext.USER_COORDS.position.coords.longitude,
                area:localStorage.getItem('area')
            },
            rootProperty:'Camera.item',
            noCache : true,
            timeout : 25000,
            actionMethods:  {create: "PUT", read: "GET", update: "POST", destroy: "DELETE"},
            reader: {
                type: 'json',
                root : 'Camera.item'
            }
        }
    }

});