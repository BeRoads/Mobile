Ext.define('BeRoads.view.webcams.Detail', {
    extend:'Ext.Panel',
    xtype:'webcamDetail',

    config:{
        styleHtmlContent:true,
        scrollable:'vertical',
        tpl:[
            '<div class="camera_overview" ><img src="http://src.sencha.io/detect/{img}" width="100%" style="margin:auto" /></div>'
        ]
    }
});