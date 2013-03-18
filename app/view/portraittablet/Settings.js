Ext.define('BeRoads.view.portraittablet.Settings', {
	extend: 'BeRoads.view.Settings',
	xtype : 'settings',
	config : {

		items: [ {
			xtype: 'fieldset',
			id: 'userFormFieldset',

			instructions: _tr('settings_message', localStorage.getItem('lang')),
			title: _tr('preferences', localStorage.getItem('lang')),
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
			}
			]
		},

		{
			xtype : 'button',
			id : 'moreButton',
			text : 'More'
		}
		]
	}
});