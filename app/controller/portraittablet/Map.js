Ext.define('BeRoads.controller.portraittablet.Map', {
    extend: 'BeRoads.controller.Map',

    stores : ['offline.Radar', 'online.Radar','offline.Webcam', 'online.Webcam', 'offline.TrafficEvent', 'online.TrafficEvent'],

    currentView : 'map',
    config: {
        refs: {
            trafficMap : '#trafficMap',
            menuList : '#menuList',
            navigationTabPanel : '#navigationTabPanel',
            preferenceButton : '#preferenceButton',
            menuPanel : '#menuPanel',
            mapButton : '#mapButton',
            trafficButton : '#trafficButton',
            webcamsButton : '#webcamsButton',
            radarsButton : '#radarsButton',
            menuButton : '#menuButton',
            radarsList : '#radarsList',
            webcamsNavigationView : '#webcamsNavigationView',
            trafficeventsNavigationView  : '#trafficeventsNavigationView',
            settingsPanel : '#settingsPanel',
			topToolbar : '#topToolbar',
			backButton : '#backButton',
			settingsNavigationView : '#settingsNavigationView'
			
        },
        control: {
			backButton : {
				tap : 'onBackButtonTap'
			},
            menuButton : {
                tap : 'onMenuButtonTap'
            },
            mapButton : {
                tap : 'onMapButtonTap'
            },
            trafficButton : {
                tap : 'onTrafficButtonTap'
            },
            radarsButton : {
                tap : 'onRadarsButtonTap'
            },
            webcamsButton : {
                tap : 'onWebcamsButtonTap'
            }
        }
    },

	onBackButtonTap : function(){
		if(this.currentView == "traffic"){
			this.getTrafficeventsNavigationView().pop();
			this.getTopToolbar().setTitle(_tr('traffic', localStorage.getItem('lang')));
		}
		else if(this.currentView == "webcams"){
			this.getWebcamsNavigationView().pop();
			this.getTopToolbar().setTitle(_tr('webcams', localStorage.getItem('lang')));
		}
		else if(this.currentView == "settings"){
			this.getSettingsNavigationView().pop();
			this.getTopToolbar().setTitle(_tr('settings', localStorage.getItem('lang')));
			this.getSaveButton().show();
		}
		this.getMenuButton().show();
		this.getBackButton().hide();
	},
	
    onMenuButtonTap : function(){
        if(this.getMenuPanel().isHidden()){
            this.getMenuPanel().show();
        }else{
            this.getMenuPanel().hide();
        }
    },

    updateMenuPanel : function() {
        if(this.currentView=='map'){
            this.getMapButton().show()
        }
        else if(this.currentView == 'traffic'){
            this.getTrafficButton().show();
        }
        else if(this.currentView == 'radars'){
            this.getRadarsButton().show();
        }
        else if(this.currentView == 'webcams'){
            this.getWebcamsButton().show();
        }

    },

    openPreferences : function() {
		
        this.getPreferenceButton().hide();
        this.getMapButton().show()
        this.getTrafficButton().show();
        this.getRadarsButton().show();
        this.getWebcamsButton().show();
		this.getSaveButton().show();
        this.getNavigationTabPanel().setActiveItem(this.getSettingsNavigationView());
		this.getTopToolbar().setTitle(_tr('settings', localStorage.getItem('lang')));
		this.currentView = "settings";
    },

    onTrafficButtonTap : function(cmp, index, target, record, e, eOpts) {

        this.getMenuPanel().hide();
        this.updateMenuPanel();
        this.getTrafficButton().hide();
        this.currentView = 'traffic';
        this.getNavigationTabPanel().setActiveItem(this.getTrafficeventsNavigationView());
		this.getTopToolbar().setTitle(_tr('traffic', localStorage.getItem('lang')));
    },

    onRadarsButtonTap : function(cmp, index, target, record, e, eOpts) {

        this.getMenuPanel().hide();
        this.updateMenuPanel();
        this.getRadarsButton().hide();
        this.currentView = 'radars';
        this.getNavigationTabPanel().setActiveItem(this.getRadarsList());
		this.getTopToolbar().setTitle(_tr('radars', localStorage.getItem('lang')));
    },

    onWebcamsButtonTap : function(cmp, index, target, record, e, eOpts) {
        this.getMenuPanel().hide();
        this.updateMenuPanel();
        this.getWebcamsButton().hide();
        this.currentView = 'webcams';
        this.getNavigationTabPanel().setActiveItem(this.getWebcamsNavigationView());
		this.getTopToolbar().setTitle(_tr('webcams', localStorage.getItem('lang')));
    },

    onMapButtonTap : function(cmp, index, target, record, e, eOpts) {

        this.getMenuPanel().hide();
        this.updateMenuPanel();
        this.getMapButton().hide();
        this.currentView = 'map';
        this.getNavigationTabPanel().setActiveItem(this.getTrafficMap());
		this.getTopToolbar().setTitle(_tr('map', localStorage.getItem('lang')));

    },

    onMenuListItemTap : function(cmp, index, target, record, e, eOpts) {

        console.log(record);

    },

    init:function () {
        console.log("[+] Initialize tablet map controller");
        this.callParent(arguments);

    },

    renderTrafficMap : function(comp, map, eOpts) {
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
        this.callParent(arguments);
    }



});