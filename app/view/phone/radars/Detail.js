Ext.define('BeRoads.view.phone.radars.Detail', {
    extend:'BeRoads.view.radars.Detail',

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
                                Ext.Viewport.setActiveItem('radarList', {type:'slide', direction:'right'});
                            }
                        }
                    ]}
            }

        ],
        styleHtmlContent:true,
        scrollable:'vertical',
        tpl:[
            '<div class="radar_overview"><h3>{id}</h3></div>'
        ]
    }
});