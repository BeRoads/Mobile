Ext.define('BeRoads.controller.Main', {
    extend: 'Ext.app.Controller',

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

    updateLanguage : function() {
        
    }
});