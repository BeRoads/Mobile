Ext.define('BeRoads.controller.landscapetablet.Radars', {
    extend: 'BeRoads.controller.Radars',

    views: ['radars.List', 'radars.Detail'],
    store : ['offline.Radar','online.Radar'],

    config: {
        refs: {
            infoPanel : '#infoPanel',
            radarsList: '#radarsList'
        },
        control: {
            radarsList: {
                show :'loadRadarPanel',
                itemtap: 'onItemTap'
            }
        }
    },

    init:function () {

        this.callParent(arguments);

    },

    loadRadarPanel : function(cmp, eOpts) {

        cmp.setStore(null);
        cmp.setStore(Ext.getStore('offline.Radar'));
        cmp.refresh();

    },

    onItemTap:function(cmp, index, target, record, e, eOpts) {

        var position = new google.maps.LatLng(record.getData().lat, record.getData().lng);
        var map = Ext.getCmp('trafficMap').getMap();
        map.setCenter(position);

    }
});