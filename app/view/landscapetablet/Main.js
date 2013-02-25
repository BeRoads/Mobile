Ext.define('BeRoads.view.landscapetablet.Main', {
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
                xtype:'navigationview',
                id :'mapNavigationView',
                docked : 'right',
                width:'80%',

                navigationBar : {
                    items: [
                        {
                            xtype: 'button',
                            id: 'preferenceButton',
                            iconCls: 'settings',
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
                        id : 'infoPanel',
                        xtype: 'panel',
                        height : '50%',
                        width : '50%',
                        styleHtmlCls : true,
                        style: "background-color: #dddddd",
                        modal: true,
                        hidden : true,
                        hideOnMaskTap: true,
                        centered: true,
                        cls : 'popupMarker'
                    },
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
                        //title : "<img src='resources/img/cars.png' alt='car' />",
                        data:[
                            {   title:'Traffic' , xtype : 'trafficeventsList' },
                            {   title:'Webcams' , xtype : 'webcamsList' },
                            {   title:'Radars' , xtype : 'radarsList' }
                        ]
                    }
                ]


            }
        ]


    }
});