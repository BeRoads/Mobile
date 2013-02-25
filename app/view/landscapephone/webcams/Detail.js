Ext.define('BeRoads.view.landscapephone.webcams.Detail', {
    extend:'BeRoads.view.webcams.Detail',

    config:{
        styleHtmlContent:true,
        scrollable:'vertical',
        tpl:[
            '<div class="camera_overview" ><img src={img} width="100%" style="margin:auto" /></div>'
        ]
    }
});