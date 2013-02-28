Ext.define('BeRoads.controller.portraittablet.Radars', {
    extend: 'BeRoads.controller.Radars',

    views: ['radars.List', 'radars.Detail'],
    store : ['offline.Radar','online.Radar'],
    config: {
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
    }
});