Ext.define('BeRoads.controller.landscapephone.TrafficEvents', {
    extend:'BeRoads.controller.TrafficEvents',

    views:['trafficevents.List', 'trafficevents.Detail'],
    store : ['offline.TrafficEvent','online.TrafficEvent'],
    loaded : false,
    config: {
        refs: {
            trafficeventsList: '#trafficeventsList',
            trafficeventsView : '#trafficeventsView'
        },
        control: {
            trafficeventsList: {
                itemtap : 'onItemTap',
                show :'loadTrafficEventsPanel'
            }
        }
    },

    init:function () {

    },

    loadTrafficEventsPanel:function (cmp, eOpts) {

        cmp.setStore(Ext.getStore('offline.TrafficEvent'));
        cmp.refresh();

    },

    onItemTap : function(cmp, index, target, record, e, eOpts ){

        if (record !== undefined) {
            this.getTrafficeventsView().push({
                xtype: 'trafficeventDetail',
                title: record.getData().location,
                data: record.getData(),
                prevCard: this
            });
        }
    }
});
