Ext.define('BeRoads.controller.landscapetablet.Webcams', {
    extend: 'BeRoads.controller.Webcams',

    views: ['webcams.List', 'webcams.Detail'],
    stores: ['online.Webcam', 'offline.Webcam'],
    loaded : false,
    config: {
        refs: {
            infoPanel : '#infoPanel',
            webcamsList: '#webcamsList'
        },
        control: {
            webcamsList: {
                itemtap: 'onItemTap',
                show :'loadCameraList'
            }
        }
    },

    init:function () {

        this.callParent(arguments);

    },


    loadCameraList : function(cmp, eOpts) {
        if(this.loaded){
            cmp.setStore(null);
        }else{
            this.loaded = true;
        }
        cmp.setStore(Ext.getStore('offline.Webcam'));
        cmp.refresh();

    },

    onItemTap:function(cmp, index, target, record, e, eOpts) {

        var position = new google.maps.LatLng(record.getData().lat, record.getData().lng);
        var map = Ext.getCmp('trafficMap').getMap();
        map.setCenter(position);
        var html =  "<span class=\"popupTitle\" >"+record.getData().city+
                "</span><img margin-bottom='0px' height='80%' width='100%' src='"+record.getData().img+"' />";
        this.getInfoPanel().setHtml(html);
        this.getInfoPanel().show();

    }
});