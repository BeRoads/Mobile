Ext.define('BeRoads.controller.tablet.Traffic', {
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
                itemtap: 'onItemTap',
                show :'loadTrafficPanel'
            }
        }
    },

    init:function () {

        this.callParent(arguments);

    },

    loadTrafficPanel:function () {

        Ext.getCmp('trafficList').setStore(Ext.getStore('offline.Traffic'));
        Ext.getCmp('trafficList').refresh();

    },

    onItemTap:function(cmp, index, target, record, e, eOpts) {

        var position = new google.maps.LatLng(record.getData().lat, record.getData().lng);
        var map = Ext.getCmp('trafficMap').getMap();
        map.setCenter(position);
        var html = '<span class=\"popupTitle\">'+record.getData().location+'</span><span class=\"popupDescription\">'+
                truncateContent(record.getData().message)+'</span>';
        Ext.Msg.alert(record.getData().title, html, Ext.emptyFn);
    }
});
