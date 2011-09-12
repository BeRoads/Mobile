beroads.views.SettingsForm = Ext.extend(Ext.form.FormPanel, {
    defaultInstructions: 'Please enter the information above.',

    initComponent: function(){
        var titlebar, cancelButton, buttonbar, saveButton, fields;

        cancelButton = {
            text: 'cancel',
            ui: 'back',
            handler: this.onCancelAction
        };

        titlebar = {
            id: 'userFormTitlebar',
            xtype: 'toolbar',
            title: 'Settings',
            items: [ cancelButton ]
        };

        saveButton = {
            id: 'userFormSaveButton',
            text: 'save',
            ui: 'confirm',
            handler: this.onSaveAction,
            scope: this
        };

        buttonbar = {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{xtype: 'spacer'}, saveButton]
        };

        fields = {
            xtype: 'fieldset',
            id: 'userFormFieldset',
            title: 'Settings',
            instructions: this.defaultInstructions,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'left',
                labelWidth: '40%',
                required: false,
                useClearIcon: true,
                autoCapitalize : false
            },
            items: [
                {
		    xtype: 'fieldset',
		    title: 'Language',
		    id : 'language', 
		    items: [{
		        xtype: 'selectfield',
		        name: 'lang',
		        id: 'lang',
		        options: [
		            {text: 'French',  value: 'fr'},
		            {text: 'Dutch', value: 'nl'},
		            {text: 'German', value: 'de'},
			    {text: 'English', value: 'en'}
		        ]
		    }]
		},
		{
		    xtype: 'fieldset',
		    title: 'Region', 
		    items: [{
		        xtype: 'selectfield',
		        name: 'region',
		        id: 'region',
		        options: [
		            {text: 'Federal',  value: 'federal'},
		            {text: 'Walloonia', value: 'walloonia'},
		            {text: 'Flanders', value: 'flanders'},
			    {text: 'Brussels', value: 'brussels'}
		        ]
		    }]
		},
		{
		    xtype: 'fieldset',
		    title: 'Map', 
		    name : 'map',
		    
		    items: [
			{
		
			    xtype: 'togglefield',
			    name: 'displayTraffic',
			    label: 'Traffic',
			    id : 'displayTraffic',
			},
			{
			    xtype: 'togglefield',
			    name: 'displayRadars',
			    id : 'displayRadars',
			    label: 'Radars'
			},
			    {
			    xtype: 'togglefield',
			    name: 'displayCameras',
                            id : 'displayCameras',
			    label: 'Cameras'
			},
			   
			   {
			    xtype: 'togglefield',
			    name: 'displayParkings',
			    id : 'displayParkings', 
			    label: 'Aires de repos'
			
			}
            ]
        };

        Ext.apply(this, {
            scroll: 'vertical',
            dockedItems: [ titlebar, buttonbar ],
            items: [ fields ]
        });

        beroads.views.SettingsForm.superclass.initComponent.call(this);
    },

    onCancelAction: function() {
        Ext.dispatch({
            controller: 'Users',
            action: 'index'
        });
    },

    onSaveAction: function() {
        var model = this.getRecord();

        Ext.dispatch({
            controller: 'Settings',
            action    : 'save',
            data      : this.getValues(),
            form      : this
        });
    }

});

Ext.reg('SettingsForm', beroads.views.SettingsForm);
