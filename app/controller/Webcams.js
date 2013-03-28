Ext.define('BeRoads.controller.Webcams', {
    extend: 'Ext.app.Controller',

    views: ['webcams.List', 'webcams.Detail'],
    stores: ['online.Webcam', 'offline.Webcam'],

    config: {
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
        console.log("[+] Setup Webcams controller");
        this.callParent(arguments);
    },

    updateLanguage : function() {
        console.log("Updating language to "+localStorage.getItem('lang'));
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