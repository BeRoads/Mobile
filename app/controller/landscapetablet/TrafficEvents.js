Ext.define('BeRoads.controller.landscapetablet.TrafficEvents', {
    extend:'BeRoads.controller.TrafficEvents',

    views:['trafficevents.List', 'trafficevents.Detail'],
    store : ['offline.TrafficEvent','online.TrafficEvent'],
    loaded : false,
    config: {
        refs: {
            infoPanel : '#infoPanel',
            trafficeventsList: '#trafficeventsList'
        },
        control: {
            trafficeventsList: {
                itemtap: 'onItemTap',
                show  :'loadTrafficEventsPanel',
                erased : 'eraseTrafficPanel'
            }
        }
    },

    eraseTrafficPanel : function(){
        this.destroy();
    },

    init:function () {

        this.callParent(arguments);

    },


    loadTrafficEventsPanel:function (cmp, eOpts) {

        cmp.setStore(null);
        cmp.setStore(Ext.getStore('offline.TrafficEvent'));
        cmp.refresh();

    },

    onItemTap:function(cmp, index, target, record, e, eOpts) {

        var position = new google.maps.LatLng(record.getData().lat, record.getData().lng);
        var map = Ext.getCmp('trafficMap').getMap();
        map.setCenter(position);
        console.log(Ext.getCmp('trafficMap'));
        var html = '<span class=\"popupTitle\">'+record.getData().location+'</span><span class=\"popupDescription\">'+
                truncateContent(record.getData().message)+'</span>';
        this.getInfoPanel().setHtml(html);
        this.getInfoPanel().show();

    }
});