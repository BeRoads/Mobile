Ext.define('BeRoads.controller.landscapephone.Map', {
    extend: 'BeRoads.controller.Map',

    views: ['Main', 'Map'],
    stores : ['offline.Radar', 'online.Radar','offline.Webcam', 'online.Webcam', 'offline.TrafficEvent', 'online.TrafficEvent'],

    config: {
        refs: {
			preferenceButton : '#preferenceButton'
        },
        control: {
            preferenceButton : {
                tap : 'openPreferences'
            }
        }
    },

    init:function () {
		this.callParent(arguments);
    },

    openPreferences : function() {
        this.getMapView().push({
            title : 'Settings',
            xtype : 'settings'
        });
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