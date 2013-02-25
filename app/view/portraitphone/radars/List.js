Ext.define('BeRoads.view.portraitphone.radars.List', {
    extend:'BeRoads.view.radars.List',

    id:'radarsList',
    xtype : 'radarsList',

    config:{
        title:_tr('radars', localStorage.getItem('lang')),
        store:null,
        itemTpl: '<span class="listItemSpan"><span class="distance">{distance} km</span>' +
            '<span class="name">{name}</span><span class="speedLimit">{speedLimit}</span></span>'
    }
});