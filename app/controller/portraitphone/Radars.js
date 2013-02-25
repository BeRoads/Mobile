Ext.define('BeRoads.controller.portraitphone.Radars', {
    extend: 'BeRoads.controller.Radars',

    views: ['radars.List', 'radars.Detail'],
    store : ['offline.Radar','online.Radar'],

    config: {
        refs: {
            radarsList: '#radarsList',
            radarsView : '#radarsView'
        },
        control: {
            radarsList: {
                show :'loadRadarPanel',
                itemtap : 'onItemTap'
            }
        }
    },

    init:function () {

        console.log("[+] init radars controller");

        this.callParent(arguments);

    },


    loadRadarPanel : function() {

        /*this.getRadarsList().setStore(Ext.getStore('offline.Radar'));
        this.getRadarsList().refresh();*/

    },

    onItemTap : function(cmp, index, target, record, e, eOpts ){
        console.log(record);
        if (record !== undefined) {
            this.getRadarsView().push({
                xtype: 'radarDetail',
                title: record.getData().name,
                data: record.getData(),
                prevCard: this
            });
        }
    }
});