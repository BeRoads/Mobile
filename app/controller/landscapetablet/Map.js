Ext.define('BeRoads.controller.landscapetablet.Map', {
    extend: 'BeRoads.controller.Map',

    stores : ['offline.Radar', 'online.Radar','offline.Webcam', 'online.Webcam', 'offline.TrafficEvent', 'online.TrafficEvent'],

    config: {
        refs: {
            menuList : '#menuList',
            navigationMenu : '#navigationMenu',
            mapNavigationView : '#mapNavigationView',
            preferenceButton : '#preferenceButton',
			infoPanel : "#infoPanel"
        },
        control: {
            menuList :{
                itemtap : 'onMenuListItemTap'
            },
            preferenceButton : {
                tap : 'openPreferences'
            }
        }
    },

    init:function () {
        this.callParent(arguments);
    },

    updateLanguage : function() {
        console.log("Updating language to "+localStorage.getItem('lang'));
    },

    updateMapArea : function() {
        this.callParent(arguments);
    },

	/**
	 *	Open the settings view 
	 *	@return 
	 */
    openPreferences : function() {

		this.getInfoPanel().hide();
        this.getPreferenceButton().hide();
        this.getMapNavigationView().push({
            xtype: 'settings',
            title : 'Settings'
        });
    },

	/**
	 * Open the clicked view on the menuList
	 *	@return 
	 */
    onMenuListItemTap : function(cmp, index, target, record, e, eOpts) {

        if (record !== undefined) {
            if(record.getData().xtype == 'aboutList'){
                Ext.Ajax.request({
                    url: 'app/view/about.html',
                    success: function(rs){
                        this.getMapNavigationView().push({
                            xtype: 'panel',
                            title : 'About',
                            html : rs.responseText
                        });
                    },
                    scope: this
                });

            }else{
                this.getNavigationMenu().push({
                    xtype: record.getData().xtype
                });
            }
        }
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