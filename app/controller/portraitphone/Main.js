Ext.define('BeRoads.controller.portraitphone.Main', {
    extend: 'BeRoads.controller.Main',

    views: ['Main'],

    config: {
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