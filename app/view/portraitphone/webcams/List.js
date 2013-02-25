Ext.define('BeRoads.view.portraitphone.webcams.List', {
    extend:'BeRoads.view.webcams.List',
    id:'webcamsList',
    xtype : 'webcamsList',

    config:{
        title:_tr('webcams', localStorage.getItem('lang')),
        store:null,
        grouped : true,
        itemTpl:'<div class="thumbnail"><img src="{img}" width="30" height="30" /></div>' +
            '<span class="name">{city}</span>'
    }


});