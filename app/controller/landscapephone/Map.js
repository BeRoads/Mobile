Ext.define('BeRoads.controller.landscapephone.Map', {
    extend: 'BeRoads.controller.Map',

    config: {
        views: ['Main', 'Map'],
        stores : ['offline.Radar', 'online.Radar','offline.Webcam', 'online.Webcam', 'offline.TrafficEvent',
            'online.TrafficEvent'],
        refs: {
        },
        control: {
        }
    },

    init:function () {
		this.callParent(arguments);
    },

    updateLanguage : function() {
        this.getMapView().getNavigationBar().setTitle(_tr('map', localStorage.getItem('lang')));
        this.callParent(arguments);
    },

    updateMapArea : function() {
        this.callParent(arguments);
    },
    

	/**
	 * Add the traffic layer to the map then call the parent function to set up the map
	 *	@return 
	*/
    renderTrafficMap : function(comp, map, eOpts) {
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
        this.updateLanguage();
        this.callParent(arguments);
    }
});