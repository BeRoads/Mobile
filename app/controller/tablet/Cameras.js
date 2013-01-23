Ext.define('BeRoads.controller.tablet.Cameras', {
    extend: 'BeRoads.controller.Cameras',

    views: ['cameras.List', 'cameras.Detail'],
    stores: ['online.Camera', 'offline.Camera'],

    config: {
        refs: {
            cameraList: '#cameraList',
            main: '#mainpanel'
        },
        control: {
            cameraList: {
                itemtap: 'onItemTap',
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

    onItemTap:function(cmp, index, target, record, e, eOpts) {

        var position = new google.maps.LatLng(record.getData().lat, record.getData().lng);
        var map = Ext.getCmp('trafficMap').getMap();
        map.setCenter(position);
        var html =  "<span class=\"popupTitle\" >"+record.getData().city+
                "</span><img margin-bottom='0px' height='50%' width='100%' src='"+record.getData().img+"' />";
        Ext.Msg.alert(record.getData().name, html, Ext.emptyFn);
    }
});