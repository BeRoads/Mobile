Ext.define('BeRoads.view.FailCar', {
    extend: 'Ext.Panel',
    xtype : 'failcar',
    config : {
        layout : 'fit',
        title : 'Error'
    },

    
    initialize : function() {
        var me = this;
        Ext.Ajax.request({
            url: "app/view/errors/index.html",
            success: function(rs){
                me.setHtml(rs.responseText);
            },
            scope: this
        });
        this.callParent(arguments);
    }

});
