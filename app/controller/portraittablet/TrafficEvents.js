Ext.define('BeRoads.controller.portraittablet.TrafficEvents', {
    extend:'BeRoads.controller.TrafficEvents',

    views:['trafficevent.List', 'trafficevent.Detail'],
    store : ['offline.TrafficEvent','online.TrafficEvent'],
    config: {
        refs: {
            infoPanel : '#infoPanel',
            trafficeventsList: '#trafficeventsList',
            trafficeventsNavigationView: '#trafficeventsNavigationView',
			topToolbar : '#topToolbar',
			menuButton : '#menuButton',
			backButton : '#backButton',
			main : '#trafficeventsNavigationView'
        },
        control: {
			backButton : {
				tap : 'onBackButtonTap'
			},
            trafficeventsList: {
                itemtap: 'onItemTap',
                show  :'loadTrafficEventsPanel'
            }
        }
    },

	onBackButtonTap : function(){
		this.displayed = false;
	},


    init:function () {
        this.callParent(arguments);
    },

	/**
	 *	Push the traffic event detailed view, set the title and 
	 *	start a 'title scroller' if necessary (like highway displays)
	 *	@return
	 */
    onItemTap:function(cmp, index, target, record, e, eOpts) {
		this.callParent(arguments);
		
		var me = this;
		this.getTopToolbar().setTitle(record.getData().location);
		this.getMenuButton().hide();
		this.getBackButton().show();
		this.displayed = true;
		
		var title = record.getData().location;
		var scroll = function(start, end, text, offset){
			if(me.displayed){
				me.getTopToolbar().setTitle(text.substring(start%offset, end%offset));
				setTimeout(function(){scroll(++start, ++end, text, offset);}, 250);
			}
		};
		if(title.length > 30)
			scroll(0, 30, title, title.length);

    }
});
