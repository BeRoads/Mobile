Beroads.views.parkingsDetail = Ext.extend(Ext.Panel, {
    scroll: 'vertical',
    showSessionData: true,
    initComponent: function(){
        this.dockedItems = [{
            xtype: 'toolbar',
            title: this.record.data.name,
            items: [{
                ui: 'back',
                text: 'Back',
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard, {
                        type: 'slide',
                        reverse: true,
                        scope: this,
                        after: function(){
                            this.destroy();
                        }
                    });
                }
            }]
        }];
        
        this.items = [{
            styleHtmlContent: true,
            tpl: new Ext.XTemplate( '<div class="parking_overview"><h3>{name}</h3</div>'),
            data: this.record.data
        }];
        
       
        this.listeners = {
            activate: { fn: function(){
                if (this.list) {
                    this.list.getSelectionModel().deselectAll();
                }
            }, scope: this }
        };
        
        BBeroads.views.parkingsDetail.superclass.initComponent.call(this);
    }
});

Ext.reg('Beroads.views.parkingsDetail', Beroads.views.parkingsDetail);
