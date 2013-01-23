Ext.define('BeRoads.view.phone.FailCar', {
    extend: 'BeRoads.view.FailCar',

    config : {
        layout : 'fit',
        title : 'Error'
    },

    
    initialize : function() {

        this.callParent(arguments);
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
        
    }

});
