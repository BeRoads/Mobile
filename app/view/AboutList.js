Ext.define('BeRoads.view.AboutList', {
    extend:'Ext.List',
    xtype:'aboutList',
    id:'aboutList',

    config:{
        onItemDisclosure:true,
        store:null,
        itemTpl:'<div class="page">{title}</div>'
    }

});
