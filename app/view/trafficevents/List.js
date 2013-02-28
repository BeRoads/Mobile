Ext.define('BeRoads.view.trafficevents.List', {
    extend:'Ext.List',
    id:'trafficeventsList',
    xtype : 'trafficeventsList',

    config:{
        title:_tr('traffic', localStorage.getItem('lang')),
        store:null,
        itemTpl:'<span class="name">{location}</span><div class="tag"><img src="resources/img/{category}_tag.png" height="20px" width="50px"/><p><span>{category}</p></span></div><span class="distance">{distance} km</span>'
    }

});