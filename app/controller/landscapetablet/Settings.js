Ext.define('BeRoads.controller.landscapetablet.Settings', {
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
                show : 'loadSettingsPanel'
            },
			userFormFieldset : {
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

    onMoreButtonTap:function () {

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
