Ext.define('BeRoads.view.tablet.cameras.Detail', {
    extend:'BeRoads.view.cameras.Detail',

    config:{
        dockedItems:[
            {
                xtype:'toolbar',
                config : {
                    items:[
                        {
                            text:'back',
                            ui:'back',
                            handler:function () {
                                Ext.Viewport.setActiveItem('cameraList', {type:'slide', direction:'right'});
                            }
                        }
                    ]}
            }

        ],
        styleHtmlContent:true,
        scrollable:'vertical',
        tpl:[
            '<div class="camera_overview" ><img src={img} width="100%" style="margin:auto" /></div>'
        ]
    }
});