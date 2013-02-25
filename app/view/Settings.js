Ext.define('BeRoads.view.Settings', {
    extend: 'Ext.form.Panel',
    defaultInstructions: '',
    xtype : 'settings',

    id : 'settingsPanel',

    config : {
        title :  _tr('preferences', localStorage.getItem('lang'))
    },

    initialize: function(){
        this.defaultInstructions = _tr('settings_message', localStorage.getItem('lang'));

        this.callParent(arguments);
    }





});