Ext.define('BeRoads.view.portraittablet.AboutList', {
    extend:'BeRoads.view.AboutList',

    config:{
        onItemDisclosure:true,
        store:null,
        itemTpl:'<div class="page">{title}</div>'
    }

});
