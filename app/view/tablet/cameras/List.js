Ext.define('BeRoads.view.tablet.cameras.List', {
    extend:'BeRoads.view.cameras.List',

    config:{
        title:_tr('webcams', localStorage.getItem('lang')),
        store:null,
        itemTpl:'<div class="thumbnail"><img src="{img}" width="30" height="30" /></div>' +
            '<span class="name">{city}</span>'
    }

});