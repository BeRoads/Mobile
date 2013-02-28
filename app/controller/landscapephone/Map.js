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

        console.log("[+] Initialize phone map controller");
    },

    openPreferences : function() {
        this.getMapView().push({
            title : 'Settings',
            xtype : 'settings'
        });

    },

    loadTrafficMap : function(){
        this.callParent(arguments);
    },

    renderTrafficMap : function(comp, map, eOpts) {
        //this.getMain().getNavigationBar().setTitle(_tr('map', localStorage.getItem('lang')));
        //
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
        this.callParent(arguments);
    }
});