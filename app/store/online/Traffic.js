
Ext.define('BeRoads.store.online.Traffic', {
    extend : 'Ext.data.Store',
    requires: 'BeRoads.model.Traffic',
    config : {
        model: 'BeRoads.model.Traffic',
        autoLoad: false,
        storeId: 'online.Traffic',
        proxy: {
            type: 'jsonp',
            url:'http://data.beroads.com/IWay/TrafficEvent/'+localStorage.getItem('lang')+'/all.jsonp',
            extraParams:{
                from:Ext.USER_COORDS.position.coords.latitude + "," + Ext.USER_COORDS.position.coords.longitude,
                area:localStorage.getItem('area')
            },

            noCache : true,
            timeout : 25000,
            actionMethods:  {create: "PUT", read: "GET", update: "POST", destroy: "DELETE"},
            reader: {
                type: 'json',
                root: 'item'
            }
        }
    }

});