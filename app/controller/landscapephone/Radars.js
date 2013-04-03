Ext.define('BeRoads.controller.landscapephone.Radars', {
    extend: 'BeRoads.controller.Radars',

    config: {
        views: ['radars.List', 'radars.Detail'],
        store : ['offline.Radar','online.Radar'],
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
    },

    updateLanguage : function() {
        
    }
});