Ext.define('BeRoads.view.tablet.traffic.List', {
    extend:'BeRoads.view.traffic.List',

    config:{
        title:_tr('traffic', localStorage.getItem('lang')),
        store:null,
        itemTpl:'<span class="name">{location}</span><span class="distance">{distance} km</span>'
    }

});