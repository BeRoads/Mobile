Ext.define('BeRoads.controller.portraittablet.Webcams', {
    extend: 'BeRoads.controller.Webcams',

    views: ['webcams.List', 'webcams.Detail'],
    stores: ['online.Webcam', 'offline.Webcams'],

    config: {
        refs: {
            infoPanel : '#infoPanel',
            webcamsList: '#webcamsList',
            webcamsNavigationView: '#webcamsNavigationView'
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

    onItemTap:function(cmp, index, target, record, e, eOpts) {

        this.getWebcamsNavigationView().push({
            xtype: 'webcamDetail',
            title: record.getData().city,
            data: record.getData(),
            prevCard: this
        });


    }
});