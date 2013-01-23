Ext.define('BeRoads.store.online.Radar', {
    extend : 'Ext.data.Store',
    requires: 'BeRoads.model.Radar',

    config : {
        model: 'BeRoads.model.Radar',
        autoLoad: false,
        storeId: 'online.Radar',
        proxy: {
            type: 'jsonp',
            url:'http://data.beroads.com/IWay/Radar.jsonp',
            extraParams:{
                from:Ext.USER_COORDS.position.coords.latitude + "," + Ext.USER_COORDS.position.coords.longitude,
                area:localStorage.getItem('area')
            },
            noCache : true,
            timeout : 25000,
            actionMethods:  {create: "PUT", read: "GET", update: "POST", destroy: "DELETE"},
            reader: {
                type: 'json',
                root: 'Radar.item'
            }
        }
    }

});