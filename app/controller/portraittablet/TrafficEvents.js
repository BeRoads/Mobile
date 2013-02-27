Ext.define('BeRoads.controller.portraittablet.TrafficEvents', {
    extend:'BeRoads.controller.TrafficEvents',

    views:['trafficevent.List', 'trafficevent.Detail'],
    store : ['offline.TrafficEvent','online.TrafficEvent'],
    displayed : false,
    config: {
        refs: {
            infoPanel : '#infoPanel',
            trafficeventsList: '#trafficeventsList',
            trafficeventsNavigationView: '#trafficeventsNavigationView',
			topToolbar : '#topToolbar',
			menuButton : '#menuButton',
			backButton : '#backButton',
			trafficeventsNavigationView : '#trafficeventsNavigationView'
        },
        control: {
			backButton : {
				tap : 'onBackButtonTap'
			},
            trafficeventsList: {
                itemtap: 'onItemTap',
                show  :'loadTrafficEventsPanel',
                erased : 'eraseTrafficEventsPanel'
            }
        }
    },

	onBackButtonTap : function(){
		this.displayed = false;
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

		var me = this;
        this.getTrafficeventsNavigationView().push({
            xtype: 'trafficeventDetail',
			id : 'trafficEventDetail',
            title: record.getData().location,
            data: record.getData(),
            prevCard: this
        });
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
