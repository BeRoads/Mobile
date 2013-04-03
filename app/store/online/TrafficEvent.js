Ext.define('BeRoads.store.online.TrafficEvent', {
    extend : 'Ext.data.Store',
    requires: ['Ext.data.proxy.JsonP', 'BeRoads.model.TrafficEvent'],
    config : {
        model: 'BeRoads.model.TrafficEvent',
        autoLoad: false,
        storeId: 'online.TrafficEvent',
        proxy: {
            type: 'jsonp',
            url:'http://data.beroads.com/IWay/TrafficEvent/'+localStorage.getItem('lang')+'/all.jsonp',
            extraParams:{
            },
            noCache : true,
            timeout : 25000,
            actionMethods:  {create: "PUT", read: "GET", update: "POST", destroy: "DELETE"},
            reader: {
                type: 'json',
                rootProperty: 'TrafficEvent.item'
            }
        }
    },

    init : function() {
        this.setProxy({
            type: 'jsonp',
             url:'http://data.beroads.com/IWay/TrafficEvent/'+localStorage.getItem('lang')+'/all.jsonp',
             extraParams:{
             from:BeRoads.app.user_coords.coords.latitude + "," + BeRoads.app.user_coords.coords.longitude,
             area:localStorage.getItem('area')
             },
             noCache : true,
             timeout : 25000,
             actionMethods:  {create: "PUT", read: "GET", update: "POST", destroy: "DELETE"},
             reader: {
             type: 'json',
             rootProperty: 'TrafficEvent.item'
             }
        });
    }

});