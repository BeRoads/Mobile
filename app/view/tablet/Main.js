Ext.define('BeRoads.view.tablet.Main', {
    extend:'Ext.Container',
    xtype:'mainview',

    requires:[
        'Ext.dataview.NestedList',
        'Ext.navigation.Bar',
        'BeRoads.view.Map',
        'BeRoads.view.traffic.List',
        'BeRoads.view.radars.List',
        'BeRoads.view.cameras.List'
    ],

    config:{
        fullscreen:true,

        layout:{
            type:'hbox',
            animation:{
                type:'slide',
                direction:'left',
                duration:250
            }
        },

        items:[

            {
                xtype:'navigationview',
                id :'mapNavigationView',
                docked : 'right',
                width:'80%',

                navigationBar : {
                    items: [
                        {
                            xtype: 'button',
                            id: 'preferenceButton',
                            iconCls: 'preferences',
                            text: '',
                            align: 'right',
                            hidden: false,
                            hideAnimation: Ext.os.is.Android ? false : {
                                type: 'fadeOut',
                                duration: 200
                            },
                            showAnimation: Ext.os.is.Android ? false : {
                                type: 'fadeIn',
                                duration: 200
                            }
                        }
                    ]
                },
                items : [
                    {
                        xtype : 'trafficMap',
                        itemId : 'trafficMap',
                        title : "BeRoads"
                    }
                ]
            },

            {

                xtype:'navigationview',
                id :'navigationMenu',
                docked:'left',
                width:'20%',
                items:[
                    {
                        xtype:'list',
                        width:'100%',
                        itemTpl: '{title}',
                        id : 'menuList',
                        title : '',
                        onItemDisclosure:true,
                        data:[
                            {   title:'Traffic' , xtype : 'trafficList' },
                            {   title:'Cameras' , xtype : 'cameraList' },
                            {   title:'Radars' , xtype : 'radarList' },
                            {   title:'About' , xtype : 'aboutList' }
                        ]
                    },

                ]


            }
        ]


    }
});