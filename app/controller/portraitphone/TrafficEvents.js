Ext.define('BeRoads.controller.portraitphone.TrafficEvents', {
    extend:'BeRoads.controller.TrafficEvents',

    displayed : false,
    config: {
        views:['trafficevents.List', 'trafficevents.Detail'],
        store : ['offline.TrafficEvent','online.TrafficEvent'],
        refs: {
            trafficeventsList: '#trafficeventsList',
            main : '#trafficeventsView',
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
        this.callParent(arguments);
    },
	
	/**
	 *	Push the traffic event detailed view, set the title and 
	 *	start a 'title scroller' if necessary (like highway displays)
	 *	@return
	 */
    onItemTap : function(cmp, index, target, record, e, eOpts ){

		this.callParent(arguments);
        var me = this;
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
});
