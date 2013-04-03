Ext.define('BeRoads.view.trafficevents.List', {
    extend:'Ext.List',
    id:'trafficeventsList',
    xtype : 'trafficeventsList',
    requires: ['Ext.data.proxy.LocalStorage','Ext.data.Store', 'Ext.data.proxy.JsonP'],
    config:{
        title:_tr('traffic', localStorage.getItem('lang')),
        store:null,
        itemTpl:'<span class="name">{location}</span><span class="distance">{distance} km</span>'
    }

});