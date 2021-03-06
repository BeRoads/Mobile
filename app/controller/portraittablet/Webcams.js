Ext.define('BeRoads.controller.portraittablet.Webcams', {
    extend: 'BeRoads.controller.Webcams',

    config: {
        views: ['webcams.List', 'webcams.Detail'],
        stores: ['online.Webcam', 'offline.Webcam'],
        refs: {
            infoPanel : '#infoPanel',
            webcamsList: '#webcamsList',
            main: '#webcamsNavigationView',
			topToolbar : '#topToolbar',
			menuButton : '#menuButton',
			backButton : '#backButton'
        },
        control: {
            webcamsList: {
                itemtap: 'onItemTap',
                show :'loadWebcamsList'
            }
        }
    },

    init:function () {
        this.callParent(arguments);
    },

    updateLanguage : function() {
        
    },
	/**
	 *	Push the webcam detailed view
	 *	@return
	*/
    onItemTap:function(cmp, index, target, record, e, eOpts) {
        this.callParent(arguments);
		this.getTopToolbar().setTitle(record.getData().city);
		this.getMenuButton().hide();
		this.getBackButton().show();
    }
});