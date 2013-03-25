Ext.define('BeRoads.controller.TrafficEvents', {
    extend:'Ext.app.Controller',

	displayed : false,		//if true, the title of the detailed view keep scrolling
    views:['trafficevents.List', 'trafficevents.Detail'],
    store : ['offline.TrafficEvent','online.TrafficEvent'],
    config: {
        refs: {
            trafficeventsList: '#trafficeventsList',
            main: '#mainpanel',
            trafficMap: '#trafficMap'
        },
        control: {
            trafficeventsList: {
                itemtap: 'onItemTap',
                show  :'loadTrafficEventsPanel'
            }
        }
    },

    init:function () {
		this.displayed = true;
		this.callParent(arguments);
    },

    updateLanguage : function() {
        console.log("Updating language to "+localStorage.getItem('lang'));
        this.getTrafficeventsList().setTitle(_tr('traffic', localStorage.getItem('lang')));
    },
	/**
	 *	Bind the offline traffic events store to the trafficeventsList
	 *	@return 
	*/
    loadTrafficEventsPanel:function (cmp, eOpts) {
      	this.displayed = false;
  		cmp.setStore(Ext.getStore('offline.TrafficEvent'));
        cmp.refresh();
    },

	/**
	 *	Push the traffic event detailed view
	 *	@return
	*/
    onItemTap:function (cmp, index, target, record, e, eOpts ){
		this.displayed = true;
        if (record !== undefined) {
            this.getMain().push({
                xtype: 'trafficeventDetail',
                title: record.getData().location,
                data: record.getData()
            });
        }
    }
});
