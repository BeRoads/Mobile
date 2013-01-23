Ext.define('BeRoads.view.Main', {
    extend:'Ext.navigation.View',

    id:'mainpanel',


    requires:[
        'BeRoads.view.Map',
        'BeRoads.view.traffic.List',
        'BeRoads.view.radars.List',
        'BeRoads.view.cameras.List'
    ],
    config:{
        autoDestroy: false,

        navigationBar: {

            items: [
                {
                    xtype: 'button',
                    id: 'preferenceButton',
                    iconCls: 'preferences',
                    text: '',
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                },
                {
                    xtype: 'button',
                    id: 'saveButton',
                    text: 'Save',
                    ui: 'sencha',
                    align: 'right',
                    hidden: true,
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
                    { xtype:'radarList' },
                    { xtype:'cameraList' }
                ]

            }

        ]
    }
});