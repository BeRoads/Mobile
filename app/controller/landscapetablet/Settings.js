Ext.define('BeRoads.controller.landscapetablet.Settings', {
    extend:'BeRoads.controller.Settings',

    views:['Settings'],

    config:{
        refs:{
            moreButton : '#moreButton',
            mapNavigationView : '#mapNavigationView',
            displayTraffic : '#displayTraffic',
            displayRadars : '#displayRadars',
            displayWebcams : '#displayWebcams', 
            lang : '#lang',
            area : '#area'
        },
        control:{
        }
    },

    init:function () {
        this.callParent(arguments);
    },

    

    onMoreButtonTap:function () {

        this.getPreferenceButton().hide();
		var me = this;
        Ext.Ajax.request({
            url: 'app/view/credits.html',
            success: function(rs){
                me.getMapNavigationView().push({
                    xtype: 'panel',
                    title: 'About',
                    html:rs.responseText,
                    styleHtmlContent : true,
                    padding : '25 25 25 25'
                });
            },
            scope: this
        });

    }
});
