Ext.define('BeRoads.controller.landscapephone.Webcams', {
    extend: 'BeRoads.controller.Webcams',

    config: {
        views: ['webcams.List', 'webcams.Detail'],
        stores: ['online.Webcam', 'offline.Webcam'],
        refs: {
            webcamsList: '#webcamsList',
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

    updateLanguage : function() {
        console.log("Updating language to "+localStorage.getItem('lang'));
    }
});