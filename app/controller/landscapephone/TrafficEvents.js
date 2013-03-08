Ext.define('BeRoads.controller.landscapephone.TrafficEvents', {
    extend:'BeRoads.controller.TrafficEvents',

    views:['trafficevents.List', 'trafficevents.Detail'],
    store : ['offline.TrafficEvent','online.TrafficEvent'],
    displayed : false,
    config: {
        refs: {
            trafficeventsList: '#trafficeventsList',
            main : '#trafficeventsView'
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

    updateLanguage : function() {
        console.log("Updating language to "+localStorage.getItem('lang'));
    },

	/**
	 *	Push the traffic event detailed view, set the title and 
	 *	start a 'title scroller' if necessary (like highway displays)
	 *	@return
	 */
    onItemTap : function(cmp, index, target, record, e, eOpts ){
		this.callParent(arguments);
     	var me = this;
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
});
