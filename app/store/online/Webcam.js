Ext.define('BeRoads.store.online.Webcam', {
    extend : 'Ext.data.Store',
    requires: 'BeRoads.model.Webcam',

    config : {
        model: 'BeRoads.model.Webcam',
        autoLoad: false,
        storeId: 'online.Webcam',
        proxy: {
            type: 'jsonp',
            url:'http://data.beroads.com/IWay/Camera.jsonp',
            extraParams:{
                from:Ext.USER_COORDS.coords.latitude + "," + Ext.USER_COORDS.coords.longitude,
                area:localStorage.getItem('area')
            },
            noCache : true,
            timeout : 25000,
            actionMethods:  {create: "PUT", read: "GET", update: "POST", destroy: "DELETE"},
            reader: {
                type: 'json',
                rootProperty : 'Camera.item'
            }
        }
    }
});