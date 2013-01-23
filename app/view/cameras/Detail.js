Ext.define('BeRoads.view.cameras.Detail', {
    extend:'Ext.Panel',

    xtype:'cameraDetail',

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