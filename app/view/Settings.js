Ext.define('BeRoads.view.Settings', {
    extend: 'Ext.form.Panel',

    xtype : 'settings',
    id : 'settingsPanel',
    config : {
        title :  _tr('preferences', localStorage.getItem('lang'))
    }
});