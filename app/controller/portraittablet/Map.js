Ext.define('BeRoads.controller.portraittablet.Map', {
    extend: 'BeRoads.controller.Map',

    config: {
        stores : ['offline.Radar', 'online.Radar','offline.Webcam', 'online.Webcam',
            'offline.TrafficEvent', 'online.TrafficEvent'],
        refs: {
            mapView : "mapNavigationView"
        },
        control: {
        }
    },

	
    init:function () {
        this.callParent(arguments);
    },
	
    updateLanguage : function() {
        
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
        this.callParent(arguments);
    }
});