Beroads.views.FailCar = Ext.extend(Ext.Panel, {
    
    layout : 'fit',
    title : 'Error',
    
    initComponent: function() {
                   	
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
            url: "beroads/views/errors/index.html",
            success: function(rs){
                this.update(rs.responseText);
            },
            scope: this
        });
        
        Beroads.views.FailCar.superclass.initComponent.call(this);
    }   

});

Ext.reg('Beroads.views.FailCar', Beroads.views.FailCar);
