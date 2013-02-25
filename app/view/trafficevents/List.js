Ext.define('BeRoads.view.trafficevents.List', {
    extend:'Ext.List',
    id:'trafficeventsList',
    xtype : 'trafficeventsList',

    config:{
        title:_tr('traffic', localStorage.getItem('lang')),
        store:null,
        itemTpl:'<span class="name">{location}</span><span class="distance">{distance} km</span>'
    }

});