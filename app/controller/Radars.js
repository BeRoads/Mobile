Ext.define('BeRoads.controller.Radars', {
    extend: 'Ext.app.Controller',

    views: ['radars.List', 'radars.Detail'],
    store : ['offline.Radar','online.Radar'],

    config: {
        refs: {
            radarsList: '#radarsList',
            main: '#mainpanel'
        },
        control: {
            radarsList: {
                show :'loadRadarPanel',
                disclose: 'onItemTap'
            }
        }
    },

    init:function () {

        this.callParent(arguments);

    },

    loadRadarPanel : function() {


        /*this.getRadarsList().setStore(Ext.getStore('offline.Radar'));
        this.getRadarsList().refresh();*/

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