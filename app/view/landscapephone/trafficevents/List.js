Ext.define('BeRoads.view.landscapephone.trafficevents.List', {
    extend:'BeRoads.view.trafficevents.List',

    id:'trafficeventsList',
    xtype : 'trafficeventsList',

    config:{
        title:_tr('traffic', localStorage.getItem('lang')),
        store:null,
        itemTpl:'<span class="name">{location}</span><span class="distance">{distance} km</span>'
    }

});