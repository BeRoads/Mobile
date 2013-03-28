Ext.define('BeRoads.controller.landscapetablet.Map', {
    extend: 'BeRoads.controller.Map',

    stores : ['offline.Radar', 'online.Radar','offline.Webcam', 'online.Webcam', 'offline.TrafficEvent', 'online.TrafficEvent'],

    config: {
        refs: {
            
            mapNavigationView : '#mapNavigationView',
			infoPanel : "#infoPanel"
        },
        control: {
        }
    },

    init:function () {
        this.callParent(arguments);
    },

    updateLanguage : function() {
        this.getMapNavigationView().getNavigationBar().setTitle(_tr('map', localStorage.getItem('lang')));
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