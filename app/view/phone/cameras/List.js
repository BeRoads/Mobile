Ext.define('BeRoads.view.phone.cameras.List', {
    extend:'BeRoads.view.cameras.List',

    config:{
        title:_tr('webcams', localStorage.getItem('lang')),
        onItemDisclosure:true,
        store:null,
        itemTpl:'<div class="thumbnail"><img src="{img}" width="30" height="30" /></div>' +
            '<span class="name">{city}</span>'
    }

});