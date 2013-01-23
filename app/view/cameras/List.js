Ext.define('BeRoads.view.cameras.List', {
    extend:'Ext.List',
    id:'cameraList',
    xtype : 'cameraList',

    config:{
        title:_tr('webcams', localStorage.getItem('lang')),
        store:null,
        itemTpl:'<div class="thumbnail"><img src="{img}" width="30" height="30" /></div>' +
            '<span class="name">{city}</span>'
    }

});