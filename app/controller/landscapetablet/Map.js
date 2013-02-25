Ext.define('BeRoads.controller.landscapetablet.Map', {
    extend: 'BeRoads.controller.Map',

    stores : ['offline.Radar', 'online.Radar','offline.Webcam', 'online.Webcam', 'offline.TrafficEvent', 'online.TrafficEvent'],

    config: {
        refs: {
            menuList : '#menuList',
            navigationMenu : '#navigationMenu',
            mapNavigationView : '#mapNavigationView',
            preferenceButton : '#preferenceButton'
        },
        control: {
            menuList :{
                itemtap : 'onMenuListItemTap'
            }
        }
    },


    openPreferences : function() {

        this.getPreferenceButton().hide();
        this.getMapNavigationView().push({
            xtype: 'settings',
            title : 'Settings'
        });
        this.callParent(arguments);

    },
    onMenuListItemTap : function(cmp, index, target, record, e, eOpts) {

        if (record !== undefined) {
            if(record.getData().xtype == 'aboutList'){
                Ext.Ajax.request({
                    url: 'app/view/about.html',
                    success: function(rs){
                        this.getMapNavigationView().push({
                            xtype: 'panel',
                            title : 'About',
                            html : rs.responseText
                        });
                    },
                    scope: this
                });

            }else{
                this.getNavigationMenu().push({
                    xtype: record.getData().xtype
                });
            }

        }


    },

    init:function () {

        console.log("[+] Initialize tablet map controller");
        this.callParent(arguments);

    },

    renderTrafficMap : function(comp, map, eOpts) {

        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
        this.callParent(arguments);

    }



});