Beroads.views.HtmlPage = Ext.extend(Ext.Panel, {
    autoLoad: 'overview.html',
    scroll: 'vertical',
    styleHtmlContent: true,
    initComponent: function(){
        
        var toolbarBase = {
            xtype: 'toolbar',
            title: this.title
        };
        
        if (this.prevCard !== undefined) {
            toolbarBase.items = {
                ui: 'back',
                text: _tr('back', localStorage.getItem('lang')),
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard, { type: 'slide', reverse: true });
                }
            }
        }
        
        this.dockedItems = toolbarBase;
        
        Ext.Ajax.request({
            url: this.url,
            success: function(rs){
                this.update(rs.responseText);
            },
            scope: this
        });
        Beroads.views.HtmlPage.superclass.initComponent.call(this);
    }
});

Ext.reg('htmlpage', Beroads.views.HtmlPage);