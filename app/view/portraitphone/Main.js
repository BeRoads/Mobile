Ext.define('BeRoads.view.portraitphone.Main', {
    extend:'Ext.navigation.View',
    id:'mainpanel',


    requires:[
        'BeRoads.view.Map',
        'BeRoads.view.trafficevents.List',
        'BeRoads.view.radars.List',
        'BeRoads.view.webcams.List'
    ],
    config:{
        title : 'BeRoads',
        navigationBar: {
            hidden : true
        },
        items:[
            {
                xtype:'tabpanel',
                id : 'tabpanel',
                tabBar:{
                    ui: 'dark',
                    docked:'bottom',
                    layout:{
                        pack:'center'
                    }
                },
                items:[
                    {
                        id : 'infoPanel',
                        xtype: 'panel',
                        html: 'This is a centered and modal panel',
                        modal: true,
                        hidden : true,
						width : "50%",
						height : "50%",
                        hideOnMaskTap: true,
                        centered: true,
                        cls : 'popupMarker'
                    },
                    {
                        id : 'settingsPanel',
                        xtype : 'settings',
                        modal : true,
                        hidden : 'true',
                        width : "80%",
                        height : "60%",
                        hideOnMaskTap: true,
                        centered: true
                    },
                    {
                        xtype : 'navigationview',
                        id : 'mapView',
                        iconCls: 'mapTabButton',
                        title: '',
                        navigationBar : {
                            items: [
                                {
                                    xtype: 'button',
                                    ui : 'flat-turquoise',
                                    id: 'preferenceButton',
                                    iconCls : 'settings',
                                    iconMask : true,
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
                                xtype:'trafficMap',
                                id : 'trafficMap'
                            }
                        ]

                    },
                    {
                        xtype : 'navigationview',
                        iconCls: 'trafficeventsTabButton',
                        id : 'trafficeventsView',
                        title: '',
                        items : [
                            {
                                xtype:'trafficeventsList',
                                id : 'trafficeventsList'
                            }
                        ]

                    },
                    {
                        xtype : 'navigationview',
                        iconCls: 'radarsTabButton',
                        id : 'radarsView',
                        title: '',
                        items : [
                            {
                                xtype:'radarsList',
                                id : 'radarsList'
                            }
                        ]
                    },
                    {
                        xtype : 'navigationview',
                        iconCls: 'webcamsTabButton',
                        id : 'webcamsView',
                        title: '',
                        items : [
                            {
                                xtype:'webcamsList',
                                id : 'webcamsList'
                            }
                        ]
                    }
                ]

            }

        ]
    }
});