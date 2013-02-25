Ext.define('BeRoads.view.radars.Detail', {
    extend:'Ext.Panel',

    xtype:'radarDetail',

    config:{
        styleHtmlContent:true,
        scrollable:'vertical',
        tpl:[
            '<div class="radar_overview"><h3>{id}</h3></div>'
        ]
    }
});