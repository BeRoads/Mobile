Ext.define('BeRoads.controller.phone.Map', {
    extend: 'BeRoads.controller.Map',

    views: ['Map'],
    stores : ['offline.Radar', 'online.Radar','offline.Camera', 'online.Camera', 'offline.Traffic', 'online.Traffic'],

    config: {
        refs: {
        },
        control: {
        }
    },

    init:function () {
        console.log("[+] Initialize phone map controller");
        this.callParent(arguments);
    },

    openPreferences : function() {
        this.callParent(arguments);
    },

    loadTrafficMap : function(){
        this.callParent(arguments);
    },

    renderTrafficMap : function(comp, map, eOpts) {
        this.getMain().getNavigationBar().setTitle(_tr('map', localStorage.getItem('lang')));
        this.callParent(arguments);
    }
});