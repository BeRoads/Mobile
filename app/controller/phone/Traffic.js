Ext.define('BeRoads.controller.phone.Traffic', {
    extend:'BeRoads.controller.Traffic',

    views:['traffic.List', 'traffic.Detail'],
    store : ['offline.Traffic','online.Traffic'],

    config: {
        refs: {
            trafficList: '#trafficList',
            main: '#mainpanel'
        },
        control: {
            trafficList: {
                disclose: 'onItemTap',
                show :'loadTrafficPanel'
            }
        }
    },

    init:function () {


        this.callParent(arguments);

    },

    loadTrafficPanel:function () {


        this.getMain().getNavigationBar().setTitle(_tr('traffic', localStorage.getItem('lang')));
        Ext.getCmp('trafficList').setStore(Ext.getStore('offline.Traffic'));
        Ext.getCmp('trafficList').refresh();

    },

    onItemTap:function (cmp, record, target, index, e, eOpts ) {
        console.log(record);
        if (record !== undefined) {
            this.getMain().push({
                xtype: 'trafficDetail',
                title: record.getData().location,
                data: record.getData()
            });
        }
    }
});
