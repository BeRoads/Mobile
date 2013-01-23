Ext.define('BeRoads.view.phone.traffic.List', {
    extend:'BeRoads.view.traffic.List',

    config:{
        title:_tr('traffic', localStorage.getItem('lang')),
        onItemDisclosure:true,
        store:null,
        itemTpl:'<span class="name">{location}</span><span class="distance">{distance} km</span>'
    }

});