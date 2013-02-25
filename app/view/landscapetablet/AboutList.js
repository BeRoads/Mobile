Ext.define('BeRoads.view.landscapetablet.AboutList', {
    extend:'BeRoads.view.AboutList',

    config:{
        onItemDisclosure:true,
        store:null,
        itemTpl:'<div class="page">{title}</div>'
    }

});
