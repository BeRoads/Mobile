Ext.define('BeRoads.controller.Cameras', {
    extend: 'Ext.app.Controller',

    views: ['cameras.List', 'cameras.Detail'],
    stores: ['online.Camera', 'offline.Camera'],

    config: {
        refs: {
            cameraList: '#cameraList',
            main: '#mainpanel'
        },
        control: {
            cameraList: {
                disclose: 'onItemTap',
                show :'loadCameraList'
            }
        }
    },

    init:function () {

        this.callParent(arguments);

    },


    loadCameraList : function() {

        Ext.getCmp('cameraList').setStore(Ext.getStore('offline.Camera'));
        Ext.getCmp('cameraList').refresh();

    },

    onItemTap:function (cmp, record, target, index, e, eOpts ) {
        console.log(record);
        if (record !== undefined) {
            this.getMain().push({
                xtype: 'cameraDetail',
                title: record.getData().city,
                data: record.getData()
            });
        }
    }
});