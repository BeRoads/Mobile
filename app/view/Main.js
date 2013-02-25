Ext.define('BeRoads.view.Main', {
    extend:'Ext.navigation.View',

    id:'mainpanel',


    requires:[
        'BeRoads.view.Map',
        'BeRoads.view.trafficevents.List',
        'BeRoads.view.radars.List',
        'BeRoads.view.webcams.List'
    ],
    config:{
        autoDestroy: false,

        navigationBar: {
            hidden : true
        },
        items:[
            {
                xtype:'tabpanel',
                layout : {
                    type : 'card'
                },
                tabBar:{
                    docked:'bottom',
                    layout:{
                        pack:'center'
                    }
                },
                items:[
                    { xtype:'trafficMap' },
                    { xtype:'trafficList' },
                    { xtype:'radarsList' },
                    { xtype:'webcamsList' }
                ]

            }

        ]
    }
});