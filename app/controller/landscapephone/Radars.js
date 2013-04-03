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

    /**
     *   Change the text values of the view to the current language value.
     *   @return 
    */
    updateLanguage : function() {
        this.getRadarsList().setTitle(_tr('radars', localStorage.getItem('lang')));
        this.callParent(arguments);
    }
});