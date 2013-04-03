Ext.define('BeRoads.view.Settings', {
	extend: 'Ext.form.Panel',
	xtype : 'settings',
	requires : ['Ext.tab.Panel', 'Ext.form.FieldSet', 'Ext.field.Number','Ext.field.Select', 'Ext.field.Toggle'],
	config : {

        items: [
		{
			xtype: 'fieldset',
			id: 'userFormFieldset',
			title :  '',
			instructions: '',
			defaults: {
				xtype: 'textfield',
				labelAlign: 'left',
				labelWidth: '40%',
				required: false,
				clearIcon: true,
				autoCapitalize : false
			},
			items: [
			{
				xtype: 'numberfield',
				id : 'area',
				name: 'area',
				label: '',
				maxLength: 10,
				value : 0,
				clearIcon: true
			},
			{
				xtype: 'selectfield',
				name: 'lang',
				id: 'lang',
				label:  '',
				options: [
				{text: 'Français',  value: 'fr'},
				{text: 'Dutch', value: 'nl'},
				{text: 'German', value: 'de'},
				{text: 'English', value: 'en'}
				],
				value : 'nl'
			},
			{

					xtype: 'togglefield',
					name: 'displayTraffic',
                    cls : 'customtoggle',
					label: '<span style="float:left"><img height="32px"  src="resources/img/trafficevents_icon.png"/></span>',
					id : 'displayTraffic',
					value : true
				},
				{
					xtype: 'togglefield',
					name: 'displayRadars',
					id : 'displayRadars',
                    cls : 'customtoggle',
					label: '<span style="float:left"><img height="32px"  src="resources/img/radars_icon.png"/></span>',
					value : true
				},
				{
					xtype: 'togglefield',
					name: 'displayWebcams',
					id : 'displayWebcams',
                    cls : 'customtoggle',
					label: '<span style="float:left"><img height="32px"  src="resources/img/webcams_icon.png"/></span>',
					value : true
				}
			]
		},
		{
			xtype: 'fieldset',
			id: 'thanksFieldset',
			title : '',
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
