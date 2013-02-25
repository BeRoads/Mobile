Ext.define('BeRoads.controller.landscapephone.Webcams', {
    extend: 'BeRoads.controller.Webcams',

    views: ['webcams.List', 'webcams.Detail'],
    stores: ['online.Webcam', 'offline.Webcam'],

    config: {
        refs: {
            webcamsList: '#webcamsList',
            webcamsView : '#webcamsView'
        },
        control: {
            webcamsList: {
                itemtap : 'onItemTap',
                show :'loadWebcamsList'
            }
        }
    },


    init:function () {
    },


    loadWebcamsList : function(cmp, eOpts) {

        cmp.setStore(Ext.getStore('offline.Webcam'));
        cmp.refresh();

    },

    onItemTap : function(cmp, index, target, record, e, eOpts ){

        if (record !== undefined) {
            this.getWebcamsView().push({
                xtype: 'webcamDetail',
                title: record.getData().city,
                data: record.getData(),
                prevCard: this
            });
        }
    }
});