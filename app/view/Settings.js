Ext.define('BeRoads.view.Settings', {
	extend: 'Ext.form.Panel',
	xtype : 'settings',

	config : {

        items: [
		{
			xtype: 'fieldset',
			id: 'userFormFieldset',
			title :  _tr('preferences', localStorage.getItem('lang')),
			instructions: _tr('settings_message', localStorage.getItem('lang')),
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
				xtype: 'numberfield',
				id : 'area',
				name: 'area',
				label: _tr('area', localStorage.getItem('lang')),
				maxLength: 10,
				value : localStorage.getItem('area'),
				useClearIcon: true
			},
			{
				xtype: 'selectfield',
				name: 'lang',
				id: 'lang',
				label:  _tr('language', localStorage.getItem('lang')),
				options: [
				{text: 'Français',  value: 'fr'},
				{text: 'Dutch', value: 'nl'},
				{text: 'German', value: 'de'},
				{text: 'English', value: 'en'}
				],
				value : localStorage.getItem('lang')
			},
			{

					xtype: 'togglefield',
					name: 'displayTraffic',
                    cls : 'customtoggle',
					label: '<span style="float:left"><img height="32px"  src="resources/img/trafficevents_icon.png"/></span>',
					id : 'displayTraffic',
					value : (localStorage.getItem('displayTraffic'))
				},
				{
					xtype: 'togglefield',
					name: 'displayRadars',
					id : 'displayRadars',
                    cls : 'customtoggle',
					label: '<span style="float:left"><img height="32px"  src="resources/img/radars_icon.png"/></span>',
					value : (localStorage.getItem('displayRadars'))
				},
				{
					xtype: 'togglefield',
					name: 'displayWebcams',
					id : 'displayWebcams',
                    cls : 'customtoggle',
					label: '<span style="float:left"><img height="32px"  src="resources/img/webcams_icon.png"/></span>',
					value : (localStorage.getItem('displayWebcams'))
				}
			]
		},
		{
			xtype: 'fieldset',
			id: 'thanksFieldset',
			title :  _tr('thanks', localStorage.getItem('lang')),
			items : [
				{
				xtype: 'numberfield',
				disabled: true,
				id : 'irail',
				labelWidth: '100%',
				label: '<img height="32px" style="margin-left:25%;margin-right:10%;" src="resources/img/irail.png"/><img height="32px" style="margin-right:25%;" src="resources/img/thedatatank.png"/>'
				}
			]
		}
		]
	}
});