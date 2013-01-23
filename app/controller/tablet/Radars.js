Ext.define('BeRoads.controller.tablet.Radars', {
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
                itemtap: 'onItemTap'
            }
        }
    },

    init:function () {

        this.callParent(arguments);

    },

    loadRadarPanel : function() {

        Ext.getCmp('radarList').setStore(Ext.getStore('offline.Radar'));
        Ext.getCmp('radarList').refresh();

    },

    onItemTap:function(cmp, index, target, record, e, eOpts) {
        var position = new google.maps.LatLng(record.getData().lat, record.getData().lng);
        var map = Ext.getCmp('trafficMap').getMap();
        map.setCenter(position);
        var html = "<span class=\"popupTitle\">Radar</span><span class=\"popupDescription\">Speed Limit : "+record.getData().speedLimit+"</span>";
        Ext.Msg.alert(record.getData().id, html, Ext.emptyFn);
    }
});