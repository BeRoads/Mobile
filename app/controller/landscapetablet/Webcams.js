Ext.define('BeRoads.controller.landscapetablet.Webcams', {
    extend: 'BeRoads.controller.Webcams',

    views: ['webcams.List', 'webcams.Detail'],
    stores: ['online.Webcam', 'offline.Webcam'],
    config: {
        refs: {
            infoPanel : '#infoPanel',
            webcamsList: '#webcamsList'
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
    
	/**
	 *	Bind the offline webcams store to the webcamsList view
	 *	@return
	*/
    loadWebcamsList : function(cmp, eOpts) {
        cmp.setStore(null);
        this.callParent(arguments);
    },

	/**
	 * 	Center map on webcam's coordinates and open the infoPanel 
	 *	@return 
	*/
    onItemTap:function(cmp, index, target, record, e, eOpts) {

        var position = new google.maps.LatLng(record.getData().lat, record.getData().lng);
        var map = Ext.getCmp('trafficMap').getMap();
        map.setCenter(position);
        var html =  '<span class=\"popupTitle\">'+record.getData().city+"</span><img src='http://src.sencha.io/detect/"+record.getData().img+"' />";
        this.getInfoPanel().setHtml(html);
        this.getInfoPanel().show();

    }
});