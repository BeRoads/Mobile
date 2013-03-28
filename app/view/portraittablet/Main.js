Ext.define('BeRoads.view.portraittablet.Main', {
    extend:'Ext.Container',
    xtype:'mainview',


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
                xtype : 'toolbar',
                docked : 'top',
				id : 'topToolbar',
                title : _tr('map', localStorage.getItem('lang')),
                items: [
                    {
                        xtype: 'button',
                        id: 'menuButton',
                        iconCls : 'home',
                        iconMask : true,
                        ui: 'sencha',
                        align: 'left',
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
	                        id: 'backButton',
	                        text: 'Back',
	                        ui: 'back',
							docked : 'left',
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
                        id: 'preferenceButton',
                        iconCls: 'settings',
                        ui : 'flat-turquoise',
                        iconMask : true,
						docked : 'right',
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
            {
                xtype:'panel',
                layout : {
                    type : 'card'
                },
                id :'mapNavigationView',

                width:'100%',
                items : [

                    {
                        id : 'infoPanel',
                        xtype: 'panel',
                        html: '',
                        cls : 'popupMarker',
                        modal: true,
                        hidden : true,
                        hideOnMaskTap: true,
                        centered: true
                    },
                    {
                        id : 'settingsPanel',
                        xtype : 'settings',
                        modal : true,
                        hidden : 'true',
                        width : "50%",
                        height : "50%",
                        hideOnMaskTap: true,
                        centered: true
                    },
                    {
                        xtype : 'tabpanel',
                        id : 'navigationTabPanel',
                        tabBar : {
                            hidden : true,
                            dock : 'bottom'
                        },
                        items : [

                            {
                                xtype : 'trafficMap',
                                itemId : 'trafficMap',
                                title : "BeRoads",
								navigationBar : false,
                            },
                            {
                                xtype : 'navigationview',
                                itemId : 'trafficeventsNavigationView',
                                title : 'Traffic',	
								navigationBar : false,
                                items : [
                                    {
                                        xtype : 'trafficeventsList',
                                        itemId : 'trafficeventsList',
                                        title : 'traffic'

                                    }
                                ]
                            },
                            {
                                xtype : 'navigationview',
                                itemId : 'webcamsNavigationView',
                                title : "Webcams",
								navigationBar : false,
                                items : [
                                    {
                                        xtype : 'webcamsList',
                                        itemId : 'webcamsList'
                                    }
                                ]
                            },
                            {
                                xtype : 'radarsList',
                                itemId : 'radarsList',
                                title : "Radars",
								navigationBar : false,
                            }
                            
                        ]
                    }
                ]
            },
            {
                id : 'menuPanel',
                xtype: 'panel',
                hidden : true,
                modal : true,
				cls : 'popupMenu',
                hideOnMaskTap: true,
                defaultType: 'button',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        hidden : true,
                        id : 'mapButton',
                        text: _tr('map', localStorage.getItem('lang'))
                    },
                    {
                        id : 'trafficButton',
                        text: _tr('traffic', localStorage.getItem('lang'))
                    },
                    {
                        id : 'radarsButton',
                        text: _tr('radars', localStorage.getItem('lang'))
                    },
                    {
                        id : 'webcamsButton',
                        text: _tr('webcams', localStorage.getItem('lang'))
                    }
                ],
                left: 1
            }
        ]


    }
});