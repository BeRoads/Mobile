Ext.define('BeRoads.controller.landscapetablet.About', {
    extend:'BeRoads.controller.About',

    views:['AboutList'],

    config:{
        refs:{
            aboutList:'#aboutList',
            preferenceButton : '#preferenceButton',
            mapNavigationView : '#mapNavigationView'
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
        this.getPreferenceButton().hide();
        this.getMapNavigationView().getNavigationBar().setTitle(_tr('about', localStorage.getItem('lang')));

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
        console.log(record);
        if (record !== undefined) {
            this.getMapNavigationView().push({
                xtype: 'htmlpage',
                url: record.getData().url
            });
        }
    }
});
