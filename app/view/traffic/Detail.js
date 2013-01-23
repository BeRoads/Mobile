Ext.define('BeRoads.view.traffic.Detail', {
    extend:'Ext.Panel',

    xtype:'trafficDetail',

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
                                Ext.Viewport.setActiveItem('trafficList', {type:'slide', direction:'right'});
                            }
                        }
                    ]}
                }

        ],
        styleHtmlContent:true,
        scrollable:'vertical',
        tpl:[
            '<div class="trafic_overview"><h4>{message}</h4></div>Source : {source}'
        ]
    }
});