Ext.define('BeRoads.controller.Webcams', {
    extend: 'Ext.app.Controller',

    views: ['webcams.List', 'webcams.Detail'],
    stores: ['online.Webcam', 'offline.Webcam'],

    config: {
        refs: {
            webcamsList: '#webcamsList',
            main: '#mainpanel'
        },
        control: {
            webcamsList: {
                itemtap: 'onItemTap',
                show :'loadWebcamsList'
            }
        }
    },

    init:function () {

        this.callParent(arguments);

    },


    loadWebcamsList : function(cmp, eOpts) {

        cmp.setStore(Ext.getStore('offline.Webcam'));
        cmp.refresh();

    },

    onItemTap:function (cmp, record, target, index, e, eOpts ) {
        console.log(record);
        /*if (record !== undefined) {
            this.getMain().push({
                xtype: 'webcamDetail',
                title: record.getData().city,
                data: record.getData()
            });
        }*/
    }
});