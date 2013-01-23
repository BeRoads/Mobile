Ext.define('BeRoads.view.phone.radars.List', {
    extend:'BeRoads.view.radars.List',

    config:{
        title:_tr('radars', localStorage.getItem('lang')),
        onItemDisclosure:true,
        store:null,
        itemTpl: '<span class="listItemSpan"><span class="distance">{distance} km</span>' +
            '<span class="name">{name}</span><span class="speedLimit">{speedLimit}</span></span>'
    }
});