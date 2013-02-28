Ext.define('BeRoads.controller.landscapephone.Radars', {
    extend: 'BeRoads.controller.Radars',

    views: ['radars.List', 'radars.Detail'],
    store : ['offline.Radar','online.Radar'],

    config: {
        refs: {
            radarsList: '#radarsList',
            radarsView : '#radarsView'
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