Ext.define('BeRoads.controller.landscapephone.About', {
    extend:'BeRoads.controller.About',

    views:['Map','AboutList'],

    config:{
        refs:{
            aboutList:'#aboutList',
            preferenceButton : '#preferenceButton',
            mapView:'#mapView'
        },
        control:{
            aboutList : {
                show : 'loadAboutList',
                disclose : 'onItemTap'
            }
        }
    },

    init:function () {
        this.callParent(arguments);
    },

    loadAboutList : function(){
        console.log('loading about list...');

        Ext.getCmp('aboutList').setStore(new Ext.data.Store({
            fields:['title', 'url'],
            data:[
                {
                    title:_tr('overview', localStorage.getItem('lang')),
                    url:'app/view/overview.html'

                },
                {
                    title:_tr('credits', localStorage.getItem('lang')),
                    url:'app/view/credits.html'
                }
            ]}));
        this.getAboutList().refresh();

    },

    onItemTap:function (cmp, record, target, index, e, eOpts ) {
        var me = this;
        console.log(record);
        if (record !== undefined) {
            Ext.Ajax.request({
                url: record.getData().url,
                success: function(rs){
                    me.getMapView().push({
                        xtype: 'panel',
                        title:record.getData().title,
                        html:rs.responseText
                    });
                },
                scope: this
            });

        }
    }
});
