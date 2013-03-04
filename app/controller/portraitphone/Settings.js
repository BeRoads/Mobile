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

    onPreferenceButtonTap : function(){
        this.getMapView().push({
            xtype : 'settings'
        });
    },

    loadSettingsPanel : function(){
		this.callParent(arguments);
        this.getMain().getNavigationBar().setTitle(_tr('settings', localStorage.getItem('lang')));
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

