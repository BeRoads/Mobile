Ext.define('BeRoads.view.landscapephone.Main', {
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
                        hideOnMaskTap: true,
                        centered: true,
                        cls : 'popupMarker'
                    },
                    {
                        id : 'settingsPanel',
                        xtype : 'settings',
                        modal : true,
                        hidden : 'true',
                        width : "25%",
                        height : "80%",
                        hideOnMaskTap: true,
                        centered: true
                    },
                    {
                        xtype : 'navigationview',
                        id : 'mapView',
                        iconCls: 'mapTabButton',
						ui : 'plain',
						iconMask: true,
                        title: _tr('map', localStorage.getItem('lang')),
                        navigationBar : {
                            items: [
                                {
                                    xtype: 'button',
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
                        items : [
                            {
                                xtype:'trafficMap'
                            }
                        ]

                    },
                    {
                        xtype : 'navigationview',
                        iconCls: 'trafficeventsTabButton',
						iconMask: true,
                        id : 'trafficeventsView',
                        title: _tr('traffic', localStorage.getItem('lang')),
                        items : [
                            {
                            xtype:'trafficeventsList',
                                id:'trafficeventsList'
                            }
                        ]

                    },
                    {
                        xtype : 'navigationview',
                        iconCls: 'radarsTabButton',
						iconMask: true,
                        id : 'radarsView',
                        title: _tr('radars', localStorage.getItem('lang')),
                        items : [
                            {
                                xtype:'radarsList',
                                id:'radarsList'
                            }
                        ]
                    },
                    {
                        xtype : 'navigationview',
                        iconCls: 'webcamsTabButton',
						iconMask: true,
                        id : 'webcamsView',
                        title: _tr('webcams', localStorage.getItem('lang')),
                        items : [
                            {
                                xtype:'webcamsList',
                                id:'webcamsList'
                            }
                        ]
                    }
                ]

            }

        ]
    }
});