Ext.define('BeRoads.controller.landscapetablet.Main', {
    extend: 'BeRoads.controller.Main',
    require : ['Ext.data.Store'],

    config: {
        views: ['Main'],
        refs: {

            menuList : '#menuList',
            navigationMenu : '#navigationMenu'
        },
        control: {
            menuList :{
                show : 'loadMenuList',
                itemtap : 'onMenuListItemTap'
            }
        }
    },

    init:function () {
		this.callParent(arguments);
    },

    loadMenuList : function() {
        this.getMenuList().setStore(Ext.create('Ext.data.Store', {
            data:[
                {   title:_tr('traffic', localStorage.getItem('lang')), value : 'traffic', xtype : 'trafficeventsList',  iconURL : 'resources/img/trafficevents_icon.png'},
                {   title:_tr('webcams', localStorage.getItem('lang')), value : 'webcams', xtype : 'webcamsList', iconURL : 'resources/img/webcams_icon.png' },
                {   title:_tr('radars', localStorage.getItem('lang')) , value : 'radars', xtype : 'radarsList', iconURL : 'resources/img/radars_icon.png' }
            ]
        }));
        this.getMenuList().refresh();
    },

    updateLanguage : function() {
        
        
        this.getMenuList().setStore(Ext.create('Ext.data.Store', {
                            data:[
                                {   title:_tr('traffic', localStorage.getItem('lang')), value : 'traffic', xtype : 'trafficeventsList',  iconURL : 'resources/img/trafficevents_icon.png'},
                                {   title:_tr('webcams', localStorage.getItem('lang')), value : 'webcams', xtype : 'webcamsList', iconURL : 'resources/img/webcams_icon.png' },
                                {   title:_tr('radars', localStorage.getItem('lang')) , value : 'radars', xtype : 'radarsList', iconURL : 'resources/img/radars_icon.png' }
                            ]
                        }));
        this.getMenuList().refresh();

        this.callParent(arguments);
    },

    /**
     * Open the clicked view on the menuList
     *  @return 
     */
    onMenuListItemTap : function(cmp, index, target, record, e, eOpts) {

        if (record !== undefined) {
            if(record.getData().xtype == 'aboutList'){
                Ext.Ajax.request({
                    url: 'app/view/about.html',
                    success: function(rs){
                        this.getMapNavigationView().push({
                            xtype: 'panel',
                            title : _tr('about', localStorage.getItem('lang')),
                            html : rs.responseText
                        });
                    },
                    scope: this
                });

            }else{
                this.getNavigationMenu().push({
                    xtype: record.getData().xtype,
                    title : _tr(record.getData().value, localStorage.getItem('lang'))
                });
            }
        }
    }
});