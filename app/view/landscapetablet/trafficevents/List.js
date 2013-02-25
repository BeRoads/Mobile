Ext.define('BeRoads.view.landscapetablet.trafficevents.List', {
    extend:'BeRoads.view.trafficevents.List',

    xtype : 'trafficeventsList',
    id : 'trafficeventsList',

    config:{
        title:_tr('traffic', localStorage.getItem('lang')),
        store:null,
        itemTpl:'<span class="name">{location}</span><span class="distance">{distance} km</span>'
    }

});