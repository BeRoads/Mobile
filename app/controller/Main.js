Ext.define('BeRoads.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        views: ['Main'],
        refs: {
            trafficeventsView : "#trafficeventsView",
            radarsView : "#radarsView",
            webcamsView : "#webcamsView",
            tabpanel : "#tabpanel"
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
        return;
    }
});