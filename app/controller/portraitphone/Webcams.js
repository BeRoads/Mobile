Ext.define('BeRoads.controller.portraitphone.Webcams', {
    extend: 'BeRoads.controller.Webcams',

    views: ['webcams.List', 'webcams.Detail'],
    stores: ['online.Webcam', 'offline.Webcam'],
    config: {
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
    }
});