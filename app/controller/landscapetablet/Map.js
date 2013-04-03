Ext.define('BeRoads.controller.landscapetablet.Map', {
    extend: 'BeRoads.controller.Map',

    config: {
        stores : ['offline.Radar', 'online.Radar','offline.Webcam', 'online.Webcam', 'offline.TrafficEvent',
            'online.TrafficEvent'],
        refs: {
            mapNavigationView : '#mapNavigationView',
			infoPanel : "#infoPanel"
        }
    },

    init:function () {
        this.callParent(arguments);
    },

    /**
     *   Change the text values of the view to the current language value.
     *   @return 
    */
    updateLanguage : function() {
        this.getMapNavigationView().getNavigationBar().setTitle(_tr('map', localStorage.getItem('lang')));
        this.callParent(arguments);
    },

     /**
     * Called when there is a modification in the 'displayX' values or in the area value. 
     * Update visible markers on the map and delete/reload some values depending on the 
     * new area value.
     */
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