Ext.define('BeRoads.controller.tablet.Map', {
    extend: 'BeRoads.controller.Map',

    stores : ['offline.Radar', 'online.Radar','offline.Camera', 'online.Camera', 'offline.Traffic', 'online.Traffic'],

    config: {
        refs: {
            menuList : '#menuList',
            navigationMenu : '#navigationMenu',
            mapNavigationView : '#mapNavigationView',
            preferenceButton : '#preferenceButton'
        },
        control: {
            menuList :{
                disclose : 'onMenuListDisclose'
            }
        }
    },


    openPreferences : function() {
        this.getPreferenceButton().hide();
        this.getMapNavigationView().push({
            xtype: 'settings'
        });
        this.callParent(arguments);
    },
    onMenuListDisclose : function(cmp, record, target, index, e, eOpts ) {
        if (record !== undefined) {
            if(record.getData().xtype == 'aboutList'){
                Ext.Ajax.request({
                    url: 'app/view/about.html',
                    success: function(rs){
                        this.getMapNavigationView().push({
                            xtype: 'panel',
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

    }



});