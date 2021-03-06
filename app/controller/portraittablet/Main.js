Ext.define('BeRoads.controller.portraittablet.Main', {
    extend: 'BeRoads.controller.Main',

    currentView : 'map',
    config: {
        views: ['Main'],
        refs: {
            trafficMap : '#trafficMap',
            menuList : '#menuList',
            navigationTabPanel : '#navigationTabPanel',
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
            backButton : '#backButton'
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

    init:function () {
		this.callParent(arguments);
    },

    updateLanguage : function() {
        
       
        this.getTopToolbar().setTitle(_tr(this.currentView, localStorage.getItem('lang')));
        this.getMapButton().setText(_tr('map', localStorage.getItem('lang')));
        this.getTrafficButton().setText(_tr('traffic', localStorage.getItem('lang')));
        this.getWebcamsButton().setText(_tr('webcams', localStorage.getItem('lang')));
        this.getRadarsButton().setText(_tr('radars', localStorage.getItem('lang')));
        this.callParent(arguments);
    },

    /**
     * Pop the current view and reset the title depending on the currently displayed view
     *  @return 
     */
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
    
    /**
     * Simple hide/show function for the menuButton
     *  @return 
     */
    onMenuButtonTap : function(){
        if(this.getMenuPanel().isHidden()){
            this.getMenuPanel().show();
        }else{
            this.getMenuPanel().hide();
        }
    },

    /**
     * Update menuPanel content depending on the currently displayed view
     *  @return 
     */
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

    /** 
     * Push the settings view 
     *  @return 
     */
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

    /**
     * Push the traffic events view and set the according title on top toolbar
     *  @return 
     */
    onTrafficButtonTap : function(cmp, index, target, record, e, eOpts) {

        this.getMenuPanel().hide();
        this.updateMenuPanel();
        this.getTrafficButton().hide();
        this.currentView = 'traffic';
        this.getNavigationTabPanel().setActiveItem(this.getTrafficeventsNavigationView());
        this.getTopToolbar().setTitle(_tr('traffic', localStorage.getItem('lang')));
    },

    /**
     * Push the radars view and set the according title on top toolbar
     *  @return 
     */
    onRadarsButtonTap : function(cmp, index, target, record, e, eOpts) {

        this.getMenuPanel().hide();
        this.updateMenuPanel();
        this.getRadarsButton().hide();
        this.currentView = 'radars';
        this.getNavigationTabPanel().setActiveItem(this.getRadarsList());
        this.getTopToolbar().setTitle(_tr('radars', localStorage.getItem('lang')));
    },

    /**
     * Push the webcams view and set the according title on top toolbar
     *  @return 
     */
    onWebcamsButtonTap : function(cmp, index, target, record, e, eOpts) {
        this.getMenuPanel().hide();
        this.updateMenuPanel();
        this.getWebcamsButton().hide();
        this.currentView = 'webcams';
        this.getNavigationTabPanel().setActiveItem(this.getWebcamsNavigationView());
        this.getTopToolbar().setTitle(_tr('webcams', localStorage.getItem('lang')));
    },

    /**
     * Push the map view and set the according title on top toolbar
     *  @return 
     */
    onMapButtonTap : function(cmp, index, target, record, e, eOpts) {

        this.getMenuPanel().hide();
        this.updateMenuPanel();
        this.getMapButton().hide();
        this.currentView = 'map';
        this.getNavigationTabPanel().setActiveItem(this.getTrafficMap());
        this.getTopToolbar().setTitle(_tr('map', localStorage.getItem('lang')));

    }
});