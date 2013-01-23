Ext.define('BeRoads.controller.tablet.Settings', {
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
            main:'#mainpanel'
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

    },

    destroySettingsPanel : function(){

        this.getPreferenceButton().show();
        //this.getMain().getNavigationBar().setTitle(_tr('map', localStorage.getItem('lang')));
        this.callParent(arguments);
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

        this.getPreferenceButton().hide();
        this.getMain().push({
            xtype: 'aboutList'
        });

    }
});
