Beroads.views.Settings = Ext.extend(Ext.form.FormPanel, {
    defaultInstructions: '',

    initComponent: function(){
    	this.defaultInstructions = _tr('settings_message', localStorage.getItem('lang'));
        var titlebar, cancelButton, buttonbar, saveButton, fields;

        cancelButton = {
            text: _tr('back', localStorage.getItem('lang')),
            ui: 'back',
            handler: this.onCancelAction
        };

        saveButton = {
            id: 'userFormSaveButton',
            text: _tr('save', localStorage.getItem('lang')),
            ui: 'confirm',
            handler: this.onSaveAction,
            scope: this
        };

        titlebar = {
            id: 'userFormTitlebar',
            xtype: 'toolbar',
            title: _tr('settings', localStorage.getItem('lang')),
            items: [ cancelButton, {xtype: 'spacer'}, saveButton ]
        };

        

        
        fields = {
            xtype: 'fieldset',
            id: 'userFormFieldset',
            title: _tr('preferences', localStorage.getItem('lang')),
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
            	{xtype: 'numberfield',
            		id : 'area',
                    name: 'area',
                    label: _tr('area', localStorage.getItem('lang')),
                    maxLength: 10,
                    value : localStorage.getItem('area'),
                    useClearIcon: true
                },
                {
		    xtype: 'fieldset',
		    title:  _tr('language', localStorage.getItem('lang')),
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
		        ],
		        value : localStorage.getItem('lang')
		    }]
		},
		{
		    xtype: 'fieldset',
		    title: _tr('map_options', localStorage.getItem('lang')),
		    name : 'map',
		    
		    items: [
			{
		
			    xtype: 'togglefield',
			    name: 'displayTraffic',
			    label: _tr('traffic', localStorage.getItem('lang')),
			    id : 'displayTraffic',
			    value : (localStorage.getItem('displayTraffic') == 'false' ? 0 : 1)
			},
			{
			    xtype: 'togglefield',
			    name: 'displayRadars',
			    id : 'displayRadars',
			    label: _tr('radars', localStorage.getItem('lang')),
			    value : (localStorage.getItem('displayRadars') == 'false' ? 0 : 1)
			},
			    {
			    xtype: 'togglefield',
			    name: 'displayCameras',
                id : 'displayCameras',
			    label: _tr('webcams', localStorage.getItem('lang')),
			    value : (localStorage.getItem('displayCameras') == 'false' ? 0 : 1)
			}
            	]
		}]
        };

        Ext.apply(this, {
            scroll: 'vertical',
            dockedItems: [ titlebar],
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

		
		var values = this.getValues();
		
		localStorage.setItem('area',values['area']);
		localStorage.setItem('lang',values['lang']);
		localStorage.setItem('displayTraffic', (values['displayTraffic']== 0 ? false : true));
		localStorage.setItem('displayRadars', (values['displayRadars']== 0 ? false : true));
		localStorage.setItem('displayCameras', (values['displayCameras']== 0 ? false : true));
		
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
