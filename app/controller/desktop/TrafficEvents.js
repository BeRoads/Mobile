Ext.define('BeRoads.controller.desktop.TrafficEvents', {
    extend:'BeRoads.controller.TrafficEvents',

    config: {
        views:['trafficevents.List', 'trafficevents.Detail'],
        store : ['offline.TrafficEvent','online.TrafficEvent'],
        refs: {
            infoPanel : '#infoPanel',
            trafficeventsList: '#trafficeventsList'
        },
        control: {
            trafficeventsList: {
                itemtap: 'onItemTap',
                show  :'loadTrafficEventsPanel'
            }
        }
    },

    init:function () {
        this.callParent(arguments);
    },

    updateLanguage : function() {
        
    },
    
    loadTrafficEventsPanel:function (cmp, eOpts) {
        cmp.setStore(null);
		this.callParent(arguments);
    },

	/**
	 *	Push the traffic event detailed view, set the title and 
	 *	start a 'title scroller' if necessary (like highway displays)
	 *	@return
	 */
    onItemTap:function(cmp, index, target, record, e, eOpts) {

        var position = new google.maps.LatLng(record.getData().lat, record.getData().lng);
        var map = Ext.getCmp('trafficMap').getMap();
        map.setCenter(position);
        var html = '<span class=\"popupTitle\">'+record.getData().location+'</span><span class=\"popupDescription\">'+
                truncateContent(record.getData().message)+'</span>';
        this.getInfoPanel().setHtml(html);
        this.getInfoPanel().show();
    }
});