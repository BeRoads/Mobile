Ext.define('BeRoads.controller.portraittablet.TrafficEvents', {
    extend:'BeRoads.controller.TrafficEvents',

    views:['trafficevent.List', 'trafficevent.Detail'],
    store : ['offline.TrafficEvent','online.TrafficEvent'],
    displayed : false,
    config: {
        refs: {
            infoPanel : '#infoPanel',
            trafficeventsList: '#trafficeventsList',
            trafficeventsNavigationView: '#trafficeventsNavigationView'
        },
        control: {
            trafficeventsList: {
                itemtap: 'onItemTap',
                show  :'loadTrafficEventsPanel',
                erased : 'eraseTrafficEventsPanel'
            }
        }
    },


    //TODO : really necessary ??
    eraseTrafficEventsPanel : function(){
        this.destroy();
    },

    init:function () {
        console.log("Init traffic list controller");
		this.displayed = true;
        this.callParent(arguments);

    },


    loadTrafficEventsPanel:function (cmp, eOpts) {

       //cmp.setStore(null);
       cmp.setStore(Ext.getStore('offline.TrafficEvent'));
       cmp.refresh();

    },

    onItemTap:function(cmp, index, target, record, e, eOpts) {

        // Tell the parent panel to animate to the new card
        this.getTrafficeventsNavigationView().push({
            xtype: 'trafficeventDetail',
			id : 'trafficEventDetail',
            title: record.getData().location,
            data: record.getData(),
            prevCard: this
        });
		var title = this.getTrafficeventsNavigationView().getNavigationBar().getTitle();
		
		var me = this;
		var scroll = function(start, end, text, offset){
			me.getTrafficeventsNavigationView().getNavigationBar().setTitle(text.substring(start%offset, end%offset));
			
			//TODO : find a good way to stop it !
			// make the string like a loop feed
			if(me.displayed){
				setTimeout(function(){scroll(++start, ++end, text, offset);}, 250);
			}
		};
		scroll(0, 30, title, title.length);

    }
});
