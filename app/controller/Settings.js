Ext.define('BeRoads.controller.Settings', {
    extend:'Ext.app.Controller',

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



    },

    destroySettingsPanel : function(){

        this.destroy();
    },

    onSaveButtonTap:function () {

        //we reset this to 1970 epoch
       	var values = this.getUserFormFieldset().getFieldsAsArray();
	    localStorage.setItem('area', values[0].getValue());
	    localStorage.setItem('lang', values[1].getValue());
	    localStorage.setItem('displayTraffic', (values[2].getValue() == 0 ? false : true));
	    localStorage.setItem('displayRadars', (values[3].getValue() == 0 ? false : true));
	    localStorage.setItem('displayCameras', (values[4].getValue()== 0 ? false : true));
	    localStorage.setItem('lastUpdate', 0);
        window.location.reload();
    },
    onMoreButtonTap:function () {

        this.getPreferenceButton().hide();
        this.getMain().push({
            xtype: 'aboutList'
        });

    }
});
