Ext.define('BeRoads.controller.Radars', {
    extend: 'Ext.app.Controller',

    views: ['radars.List', 'radars.Detail'],
    store : ['offline.Radar','online.Radar'],
    config: {
        refs: {
            radarsList: '#radarsList',
            main: '#mainpanel'
        },
        control: {
            radarsList: {
                show :'loadRadarPanel',
                disclose: 'onItemTap'
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
        return;
    },
    
	/**
	 *	Bind the offline radars store to the radarsList list view
	 *	@return
	 */
    loadRadarPanel : function(cmp, eOpts) {
        cmp.refresh();
    },

	/**
	 *¨	Push the radar detailed view
	 *	@return
	 */
    onItemTap:function (cmp, index, target, record, e, eOpts ){
       return;
    }
});