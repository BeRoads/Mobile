Beroads.views.Settings = Ext.extend(Ext.form.FormPanel, {
    defaultInstructions: 'Please enter the information above.',

    initComponent: function(){
        var titlebar, cancelButton, buttonbar, saveButton, fields;

        cancelButton = {
            text: 'Retour',
            ui: 'back',
            handler: this.onCancelAction
        };

        titlebar = {
            id: 'userFormTitlebar',
            xtype: 'toolbar',
            title: 'Réglages',
            items: [ cancelButton ]
        };

        saveButton = {
            id: 'userFormSaveButton',
            text: 'Sauver',
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
            title: 'Préférences',
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
		    title: 'Langage',
		    id : 'language', 
		    items: [{
		        xtype: 'selectfield',
		        name: 'lang',
		        id: 'lang',
		        options: [
		            {text: 'Français',  value: 'fr'},
		            {text: 'Dutch', value: 'nl'},
		            {text: 'German', value: 'de'},
			    {text: 'English', value: 'en'}
		        ]
		    }]
		},
		{
		    xtype: 'fieldset',
		    title: 'Région', 
		    items: [{
		        xtype: 'selectfield',
		        name: 'region',
		        id: 'region',
		        options: [
		            {text: 'Fédéral',  value: 'federal'},
		            {text: 'Wallonie', value: 'walloonia'},
		            {text: 'Flandre', value: 'flanders'},
			    {text: 'Bruxelles', value: 'brussels'}
		        ]
		    }]
		},
		{
		    xtype: 'fieldset',
		    title: 'Option carte', 
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
		}]
        };

        Ext.apply(this, {
            scroll: 'vertical',
            dockedItems: [ titlebar, buttonbar ],
            items: [ fields ]
        });

        Beroads.views.Settings.superclass.initComponent.call(this);
    },

    onCancelAction: function() {
        Ext.getCmp('main').setActiveItem(this.prevCard, {
                        type: 'slide',
                        reverse: true,
                        scope: this,
                        after: function(){
                            this.destroy();
                        }
                    });
    },

    onSaveAction: function() {

	Ext.getCmp('main').setActiveItem(this.prevCard, {
                        type: 'slide',
                        reverse: true,
                        scope: this,
                        after: function(){
                            this.destroy();
                        }
                    });
        
    }

});

Ext.reg('Beroads.views.Settings', Beroads.views.Settings);
