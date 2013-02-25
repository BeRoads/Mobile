Ext.define('BeRoads.controller.portraitphone.Settings', {
    extend:'BeRoads.controller.Settings',

    views:['Main', 'Settings'],

    config:{
        refs:{
            userFormSaveButton:'#userFormSaveButton',
            userFormFieldset:'#userFormFieldset',
            saveButton:'#saveButton',
            settingsPanel : '#settingsPanel',
            preferenceButton : '#preferenceButton',
            moreButton : '#moreButton',
            main:'#mainpanel',
            mapView : '#mapView'
        },
        control:{
            settingsPanel : {
                show : 'loadSettingsPanel',
                destroy : 'destroySettingsPanel'
            },
            preferenceButton : {
                tap : 'onPreferenceButtonTap'
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

    destroySettingsPanel : function(){
        this.getPreferenceButton().show();
        this.getSaveButton().hide();
        this.callParent(arguments);


    },

    onPreferenceButtonTap : function(){
        this.getMapView().push({
            xtype : 'settings'
        });

    },

    loadSettingsPanel : function(){

        this.getPreferenceButton().hide();
        this.getSaveButton().show();
        this.getMain().getNavigationBar().setTitle(_tr('settings', localStorage.getItem('lang')));

    },


    onSaveButtonTap:function () {

        console.log();
        //we reset this to 1970 epoch
        var values = this.getUserFormFieldset().getFieldsAsArray();
        localStorage.setItem('area', values[0].getValue());
        localStorage.setItem('lang', values[1].getValue());
        localStorage.setItem('displayTraffic', (values[2].getValue() == 0 ? false : true));
        localStorage.setItem('displayRadars', (values[3].getValue() == 0 ? false : true));
        localStorage.setItem('displayCameras', (values[4].getValue()== 0 ? false : true));
        localStorage.setItem('lastUpdate', 0);

        this.destroy();
        window.location.reload();
    },
    onMoreButtonTap:function () {

        var me = this;
        Ext.Ajax.request({
            url: 'app/view/credits.html',
            success: function(rs){
                me.getSaveButton().hide();
                me.getMapView().push({
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

