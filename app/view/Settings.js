Ext.define('BeRoads.view.Settings', {
    extend: 'Ext.form.Panel',
    defaultInstructions: '',
    xtype : 'settings',

    id : 'settingsPanel',

    config : {
    },

    initialize: function(){

        this.callParent(arguments);

    	this.defaultInstructions = _tr('settings_message', localStorage.getItem('lang'));



    }





});