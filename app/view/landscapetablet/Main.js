Ext.define('BeRoads.view.landscapetablet.Main', {
    extend:'Ext.Container',
    xtype:'mainview',


    config:{
        fullscreen:true,

        layout:{
            type:'card',
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
                width:'70%',

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
                width:'30%',
	
				shadow:true,
				floating:true,
				shadowOffset:20,
                items:[
                    {
                        xtype:'list',
                        width:'100%',
                        id : 'menuList',
                        title : '',
						itemTpl : '<div class="thumbnail"><img src="{iconURL}" width="30" height="30" /></div><span class="name">{title}</span>',
                        //title : "<img src='resources/img/cars.png' alt='car' />",
                        data:[
                            {   title:_tr('traffic', localStorage.getItem('lang')), xtype : 'trafficeventsList',  iconURL : 'resources/img/traffic_icon.png'},
                            {   title:_tr('webcams', localStorage.getItem('lang')) , xtype : 'webcamsList', iconURL : 'resources/img/cameras_icon.png' },
                            {   title:_tr('radars', localStorage.getItem('lang')) , xtype : 'radarsList', iconURL : 'resources/img/radars_icon.png' }
                        ]
                    },
						{
							xtype : 'panel',
							width : '3px',
							floating : true,
							styleHtmlCls : true,
							style : 'background-image: linear-gradient(right , rgb(255,255,255) 0%, rgb(0,0,0) 66%);background-image: -o-linear-gradient(right , rgb(255,255,255) 0%, rgb(0,0,0) 66%);background-image: -moz-linear-gradient(right , rgb(255,255,255) 0%, rgb(0,0,0) 66%);background-image: -webkit-linear-gradient(right , rgb(255,255,255) 0%, rgb(0,0,0) 66%);background-image: -ms-linear-gradient(right , rgb(255,255,255) 0%, rgb(0,0,0) 66%); background-image: -webkit-gradient(linear,right bottom,left bottom,color-stop(0, rgb(255,255,255)),color-stop(0.66, rgb(0,0,0)));',							
							docked :'right'
						}
                ]


            }
        ]


    }
});