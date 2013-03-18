Ext.define('BeRoads.controller.portraitphone.Radars', {
    extend: 'BeRoads.controller.Radars',

    views: ['radars.List', 'radars.Detail'],
    store : ['offline.Radar','online.Radar'],
    config: {
        refs: {
            radarsList: '#radarsList',
            main : '#radarsView'
        },
        control: {
            radarsList: {
                show :'loadRadarPanel',
                itemtap : 'onItemTap'
            }
        }
    },

    init:function () {
        this.callParent(arguments);
    }
});