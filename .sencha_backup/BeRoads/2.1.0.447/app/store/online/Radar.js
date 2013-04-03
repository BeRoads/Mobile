Ext.define('BeRoads.store.online.Radar', {
    extend : 'Ext.data.Store',
    requires: ['Ext.data.proxy.JsonP','BeRoads.model.Radar'],

    config : {
        model: 'BeRoads.model.Radar',
        autoLoad: false,
        storeId: 'online.Radar',
        proxy: {
            type: 'jsonp',
            url:'http://data.beroads.com/IWay/Radar.jsonp',
            extraParams:{
            },
            noCache : true,
            timeout : 25000,
            actionMethods:  {create: "PUT", read: "GET", update: "POST", destroy: "DELETE"},
            reader: {
                type: 'json',
                rootProperty: 'Radar.item'
            }
        }
    },

    init : function(){
        this.setProxy({
            type: 'jsonp',
             url:'http://data.beroads.com/IWay/Radar.jsonp',
             extraParams:{
             from:BeRoads.app.user_coords.coords.latitude + "," + BeRoads.app.user_coords.coords.longitude,
             area:localStorage.getItem('area')
             },
             noCache : true,
             timeout : 25000,
             actionMethods:  {create: "PUT", read: "GET", update: "POST", destroy: "DELETE"},
             reader: {
             type: 'json',
             rootProperty: 'Radar.item'
             }
        });
    }
});