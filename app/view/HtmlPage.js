Ext.define('BeRoads.view.HtmlPage', {
    extend: 'Ext.Panel',

    xtype : 'htmlpage',

    config : {
        autoLoad: 'overview.html',
        scroll: 'vertical',
        styleHtmlContent: true
    },


    initialize : function(){

        console.log(this);
        Ext.Ajax.request({
            url: this.config.url,
            success: function(rs){
                this.setHtml(rs.responseText);
            },
            scope: this
        });
        this.callParent(arguments);
        


    }
});