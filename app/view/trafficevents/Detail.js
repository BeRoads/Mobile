Ext.define('BeRoads.view.trafficevents.Detail', {
    extend:'Ext.Panel',
    xtype:'trafficeventDetail',

    config:{
        styleHtmlContent:true,
        scrollable:'vertical',
        tpl:[
            '<div class="trafic_overview"><h4>{message}</h4></div>Source : {source}<br />Last update : {formatted_time}'
        ]
    }
});