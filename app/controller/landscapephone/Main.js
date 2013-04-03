Ext.define('BeRoads.controller.landscapephone.Main', {
    extend: 'BeRoads.controller.Main',

    config: {
        views: ['Main'],
        refs: {
            trafficeventsView : "#trafficeventsView",
            radarsView : "#radarsView",
            webcamsView : "#webcamsView",
            tabpanel : "#tabpanel"
        },
        control: {
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
        this.getTrafficeventsView().getNavigationBar().setTitle(_tr('traffic', localStorage.getItem('lang')));
        this.getRadarsView().getNavigationBar().setTitle(_tr('radars', localStorage.getItem('lang')));
        this.getWebcamsView().getNavigationBar().setTitle(_tr('webcams', localStorage.getItem('lang')));
        this.getTabpanel().getTabBar().getAt(0).setTitle(_tr('map', localStorage.getItem('lang')));
        this.getTabpanel().getTabBar().getAt(1).setTitle(_tr('traffic', localStorage.getItem('lang')));
        this.getTabpanel().getTabBar().getAt(2).setTitle(_tr('radars', localStorage.getItem('lang')));
        this.getTabpanel().getTabBar().getAt(3).setTitle(_tr('webcams', localStorage.getItem('lang')));
        this.callParent(arguments);
    }
});