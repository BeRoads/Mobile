Ext.define('BeRoads.controller.TrafficEvents', {
    extend:'Ext.app.Controller',

    views:['trafficevents.List', 'trafficevents.Detail'],
    store : ['offline.TrafficEvent','online.TrafficEvent'],

    config: {
        refs: {
            trafficeventsList: '#trafficeventsList',
            main: '#mainpanel',
            trafficMap: '#trafficMap'
        },
        control: {
            trafficeventsList: {
                itemtap: 'onItemTap',
                show  :'loadTrafficEventsPanel'
            }
        }
    },

    init:function () {

    },

    loadTrafficEventsPanel:function (cmp, eOpts) {

        /*console.log("[+] Loading traffic events list...");
        cmp.setStore(null);
        cmp.setStore(Ext.getStore('offline.TrafficEvent'));
        cmp.refresh();*/

    },

    onItemTap:function (cmp, record, target, index, e, eOpts ) {
        console.log(record);
        if (record !== undefined) {

            this.getMain().push({
                xtype: 'trafficeventDetail',
                title: record.getData().location,
                data: record.getData()
            });
        }
    }
});
