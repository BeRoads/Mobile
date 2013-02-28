Ext.define('BeRoads.controller.portraitphone.TrafficEvents', {
    extend:'BeRoads.controller.TrafficEvents',

    views:['trafficevents.List', 'trafficevents.Detail'],
    store : ['offline.TrafficEvent','online.TrafficEvent'],
    displayed : false,
    config: {
        refs: {
            trafficeventsList: '#trafficeventsList',
            trafficeventsView : '#trafficeventsView',
            tabPanel : '#tabpanel'
        },
        control: {
            trafficeventsList: {
                itemtap : 'onItemTap',
                show :'loadTrafficEventsPanel'
            }
        }
    },

    init:function () {

        console.log("[+] init traffic events controller");
        this.callParent(arguments);
    },

	
    loadTrafficEventsPanel:function (cmp, eOpts) {
		this.displayed = false;
        cmp.setStore(Ext.getStore('offline.TrafficEvent'));
        cmp.refresh();

    },

    onItemTap : function(cmp, index, target, record, e, eOpts ){

		
        if (record !== undefined) {
        	var me = this;
    		this.getTrafficeventsView().push({
                xtype: 'trafficeventDetail',
                title: record.getData().location,
                data: record.getData(),
                prevCard: this
            });
			this.displayed = true;
			
			var title = record.getData().location;
			var scroll = function(start, end, text, offset){
				if(me.displayed){
					me.getTrafficeventsView().getNavigationBar().setTitle(text.substring(start%offset, end%offset));
					setTimeout(function(){scroll(++start, ++end, text, offset);}, 250);
				}
			};
			if(title.length > 30)
				scroll(0, 30, title, title.length);
        }
    }
});
