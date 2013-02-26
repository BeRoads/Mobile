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
                title : 'BeRoads',
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
                    },
                    {
                        xtype: 'button',
                        id: 'saveButton',
                        text: 'Save',
                        ui: 'sencha',
						docked : 'right',
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
                                title : "BeRoads"
                            },
                            {
                                xtype : 'navigationview',
                                itemId : 'trafficeventsNavigationView',
                                title : 'Traffic',				
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
                                title : "Radars"
                            },
                            {
                                xtype : 'settings',
                                itemId : 'settingsPanel',
                                title : "Settings"
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
                        text: 'Map'
                    },
                    {
                        id : 'trafficButton',
                        text: 'Traffic'
                    },
                    {
                        id : 'radarsButton',
                        text: 'Radars'
                    },
                    {
                        id : 'webcamsButton',
                        text: 'Webcams'
                    }
                ],
                left: 1
            }
        ]


    }
});