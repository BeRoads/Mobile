Ext.define('BeRoads.controller.portraitphone.Webcams', {
    extend: 'BeRoads.controller.Webcams',

    config: {
        views: ['webcams.List', 'webcams.Detail'],
        stores: ['online.Webcam', 'offline.Webcam'],
        refs: {
            webcamsList: '#webcamsList',
            tabpanel : '#tabpanel',
            main : '#webcamsView'
        },
        control: {
            webcamsList: {
                itemtap : 'onItemTap',
                show :'loadWebcamsList'
            }
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
        this.getWebcamsList().setTitle(_tr('webcams', localStorage.getItem('lang')));
        this.callParent(arguments);
    }
});