Ext.define('BeRoads.controller.portraittablet.Settings', {
    extend:'BeRoads.controller.Settings',

    views:['Settings'],

    config:{
        refs:{
            userFormSaveButton:'#userFormSaveButton',
            userFormFieldset:'#userFormFieldset',
            saveButton:'#saveButton',
            settingsPanel : '#settingsPanel',
			navigationTabPanel : '#navigationTabPanel',
            preferenceButton : '#preferenceButton',
			menuButton : '#menuButton',
            moreButton : '#moreButton',
			backButton : '#backButton',
            settingsNavigationView : '#settingsNavigationView'
        },
        control:{
            userFormFieldset : {
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

    updateLanguage : function() {
        console.log("Updating language to "+localStorage.getItem('lang'));
    },
    
	loadSettingsPanel : function(cmp){
        this.getUserFormFieldset().setInstructions(_tr('settings_message', localStorage.getItem('lang')));
	},
	
    onMoreButtonTap:function () {

        var me = this;
        Ext.Ajax.request({
            url: 'app/view/credits.html',
            success: function(rs){
                me.getSettingsNavigationView().push({
                    xtype: 'panel',
                    title: 'About',
                    html:rs.responseText,
                    styleHtmlContent : true,
                    padding : '25 25 25 25'
                });
				
				me.getSaveButton().hide();
		        me.getPreferenceButton().hide();
				me.getBackButton().show();
				me.getMenuButton().hide();
				
            },
            scope: this
        });

    }
});
