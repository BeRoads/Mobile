Ext.define('BeRoads.view.radars.List', {
    extend:'Ext.List',
    id:'radarsList',
    xtype : 'radarsList',

    requires: ['Ext.data.proxy.LocalStorage','Ext.data.Store', 'Ext.data.proxy.JsonP'],

    config:{
        title:'',
        store:null,
        itemTpl: '<span class="listItemSpan"><span class="distance">{distance} km</span>' +
            '<span class="name">{name}</span><span class="speedLimit">{speedLimit}</span></span>'
    }
});