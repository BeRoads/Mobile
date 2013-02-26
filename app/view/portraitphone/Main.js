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
                        xtype : 'navigationview',
                        id : 'mapView',
                        iconCls: 'map',
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
                                xtype:'trafficMap',
                                id : 'trafficMap'
                            }
                        ]

                    },
                    {
                        xtype : 'navigationview',
                        iconCls: 'traffic',
                        id : 'trafficeventsView',
                        title: _tr('traffic', localStorage.getItem('lang')),
                        items : [
                            {
                                xtype:'trafficeventsList',
                                id : 'trafficeventsList'
                            }
                        ]

                    },
                    {
                        xtype : 'navigationview',
                        iconCls: 'radars',
                        id : 'radarsView',
                        title: _tr('radars', localStorage.getItem('lang')),
                        items : [
                            {
                                xtype:'radarsList',
                                id : 'radarsList'
                            }
                        ]
                    },
                    {
                        xtype : 'navigationview',
                        iconCls: 'cameras',
                        id : 'webcamsView',
                        title: _tr('webcams', localStorage.getItem('lang')),
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