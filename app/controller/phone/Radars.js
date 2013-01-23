Ext.define('BeRoads.controller.phone.Radars', {
    extend: 'BeRoads.controller.Radars',

    views: ['radars.List', 'radars.Detail'],
    store : ['offline.Radar','online.Radar'],

    config: {
        refs: {
            radarList: '#radarList',
            main: '#mainpanel'
        },
        control: {
            radarList: {
                show :'loadRadarPanel',
                disclose: 'onItemTap'
            }
        }
    },

    init:function () {

        this.callParent(arguments);

    },

    loadRadarPanel : function() {

        this.getMain().getNavigationBar().setTitle(_tr('radars', localStorage.getItem('lang')));

        Ext.getCmp('radarList').setStore(Ext.getStore('offline.Radar'));
        Ext.getCmp('radarList').refresh();

    },

    onItemTap:function (cmp, record, target, index, e, eOpts ) {
        console.log(record);
        if (record !== undefined) {
            this.getMain().push({
                xtype: 'radarDetail',
                title: record.getData().id,
                data: record.getData()
            });
        }
    }
});