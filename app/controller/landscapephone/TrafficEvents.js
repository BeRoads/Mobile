Ext.define('BeRoads.controller.landscapephone.TrafficEvents', {
    extend:'BeRoads.controller.TrafficEvents',

    views:['trafficevents.List', 'trafficevents.Detail'],
    store : ['offline.TrafficEvent','online.TrafficEvent'],
    displayed : false,
    config: {
        refs: {
            trafficeventsList: '#trafficeventsList',
            trafficeventsView : '#trafficeventsView'
        },
        control: {
            trafficeventsList: {
                itemtap : 'onItemTap',
                show :'loadTrafficEventsPanel'
            }
        }
    },

    init:function () {

    },

    loadTrafficEventsPanel:function (cmp, eOpts) {
		this.displayed = false;
        cmp.setStore(Ext.getStore('offline.TrafficEvent'));
        cmp.refresh();

    },

    onItemTap : function(cmp, index, target, record, e, eOpts ){
		console.log(window.innerWidth);
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
			if(title.length > (window.innerWidth/15))
				scroll(0, window.innerWidth/15, title, title.length);
        }
    }
});
