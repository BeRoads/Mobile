Ext.define('BeRoads.view.radars.List', {
    extend:'Ext.List',
    id:'radarList',
    xtype : 'radarList',

    config:{
        title:_tr('radars', localStorage.getItem('lang')),
        store:null,
        itemTpl: '<span class="listItemSpan"><span class="distance">{distance} km</span>' +
            '<span class="name">{name}</span><span class="speedLimit">{speedLimit}</span></span>'
    }
});