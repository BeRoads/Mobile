Ext.define('BeRoads.view.webcams.List', {
    extend:'Ext.List',
    id:'webcamsList',
    xtype : 'webcamsList',
    requires: ['Ext.data.proxy.LocalStorage','Ext.data.Store', 'Ext.data.proxy.JsonP'],

    config:{
        title:_tr('webcams', localStorage.getItem('lang')),
        store:null,
        grouped : true,
        itemTpl:'<div class="thumbnail"><img src="http://src.sencha.io/30/30/{img}" width="30" height="30" /></div>' +
            '<span class="name">{city}</span>'
    }
});