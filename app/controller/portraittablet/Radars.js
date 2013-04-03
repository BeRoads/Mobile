Ext.define('BeRoads.controller.portraittablet.Radars', {
    extend: 'BeRoads.controller.Radars',

    config: {
        store : ['offline.Radar','online.Radar'],
        views: ['radars.List', 'radars.Detail'],
        refs: {
            infoPanel : '#infoPanel',
            radarsList: '#radarsList',
            main: '#mainpanel'
        },
        control: {
            radarsList: {
                show :'loadRadarPanel'
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