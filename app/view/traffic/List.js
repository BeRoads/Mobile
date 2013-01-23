Ext.define('BeRoads.view.traffic.List', {
    extend:'Ext.List',
    id:'trafficList',
    xtype : 'trafficList',

    config:{
        title:_tr('traffic', localStorage.getItem('lang')),
        store:null,
        itemTpl:'<span class="name">{location}</span><span class="distance">{distance} km</span>'
    }

});