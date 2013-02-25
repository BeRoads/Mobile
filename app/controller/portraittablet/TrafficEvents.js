Ext.define('BeRoads.controller.portraittablet.TrafficEvents', {
    extend:'BeRoads.controller.TrafficEvents',

    views:['trafficevent.List', 'trafficevent.Detail'],
    store : ['offline.TrafficEvent','online.TrafficEvent'],
    loaded : false,
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
            title: record.getData().location,
            data: record.getData(),
            prevCard: this
        });

    }
});
