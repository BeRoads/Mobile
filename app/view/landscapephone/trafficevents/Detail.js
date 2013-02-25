Ext.define('BeRoads.view.landscapephone.trafficevents.Detail', {
    extend:'BeRoads.view.trafficevents.Detail',

    xtype:'trafficeventDetail',
    config:{
        styleHtmlContent:true,
        scrollable:'vertical',
        tpl:[
            '<div class="trafic_overview"><h4>{message}</h4></div>Source : {source}'
        ]
    }
});