Ext.define('BeRoads.controller.Webcams', {
    extend: 'Ext.app.Controller',

    config: {
        stores: ['online.Webcam', 'offline.Webcam'],
        views: ['webcams.List', 'webcams.Detail'],
        refs: {
            webcamsList: '#webcamsList',
            main: '#mainpanel'
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
        
        this.getWebcamsList().setTitle(_tr('webcams', localStorage.getItem('lang')));
    },
	/**
	 *	Bind the offline webcams store to the webcamsList view
	 *	@return
	*/
    loadWebcamsList : function(cmp, eOpts) {
        cmp.setStore(Ext.getStore('offline.Webcam'));
        cmp.refresh();
    },

	/**
	 *	Push the webcam detailed view
	 *	@return
	*/
    onItemTap:function (cmp, index, target, record, e, eOpts) {
        
        if (record !== undefined) {
            this.getMain().push({
                xtype: 'webcamDetail',
                title: record.getData().city,
                data: record.getData()
            });
        }
    }
});