Ext.define('BeRoads.controller.portraittablet.Settings', {
    extend:'BeRoads.controller.Settings',

    views:['Settings'],

    config:{
        refs:{
            userFormSaveButton:'#userFormSaveButton',
            userFormFieldset:'#userFormFieldset',
            saveButton:'#saveButton',
            settingsPanel : '#settingsPanel',
            preferenceButton : '#preferenceButton',
            moreButton : '#moreButton',
            mapNavigationView : '#mapNavigationView'
        },
        control:{
            settingsPanel : {
                show : 'loadSettingsPanel',
                erased : 'destroySettingsPanel'
            },
            saveButton:{
                tap:'onSaveButtonTap'
            },
            moreButton : {
                tap : 'onMoreButtonTap'
            }
        }
    },

    init:function () {

        this.callParent(arguments);

    },

    loadSettingsPanel : function(){

        //this.getMain().getNavigationBar().setTitle(_tr('settings', localStorage.getItem('lang')));
        this.getSaveButton().show();
    },

    destroySettingsPanel : function(){

        this.getPreferenceButton().show();
        this.getSaveButton().hide();
        //this.callParent(arguments);
    },

    onSaveButtonTap:function () {

        //we reset this to 1970 epoch
        var items = this.getUserFormFieldset().config.items;
        localStorage.setItem('area', items[0].value);
        localStorage.setItem('lang', items[1].items[0].value);
        localStorage.setItem('displayTraffic', (items[2].items[0].value == 0 ? false : true));
        localStorage.setItem('displayRadars', (items[2].items[1].value == 0 ? false : true));
        localStorage.setItem('displayCameras', (items[2].items[2].value == 0 ? false : true));
        localStorage.setItem('lastUpdate', 0);

        this.destroy();
        window.location.reload();
    },
    onMoreButtonTap:function () {


        this.getSaveButton().hide();
        this.getPreferenceButton().hide();
        var me = this;
        Ext.Ajax.request({
            url: 'app/view/credits.html',
            success: function(rs){
                me.getSaveButton().hide();
                me.getMapNavigationView().push({
                    xtype: 'panel',
                    title: 'About',
                    html:rs.responseText,
                    styleHtmlContent : true,
                    padding : '25 25 25 25'
                });
            },
            scope: this
        });

    }
});
