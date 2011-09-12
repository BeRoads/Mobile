oreilly.views.TraficDetail = Ext.extend(Ext.Panel, {
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
            tpl: new Ext.XTemplate( '<div class="bio_overview"><h3>{name}</h3><h4>{description}</h4></div> {source}'),
            data: this.record.data
        }];
        
       
        this.listeners = {
            activate: { fn: function(){
                if (this.sessionList) {
                    this.sessionList.getSelectionModel().deselectAll();
                }
            }, scope: this }
        };
        
        oreilly.views.TraficDetail.superclass.initComponent.call(this);
    },
    
    viewSession: function(selectModel, records){
        if (records[0] !== undefined) {
            var sessionCard = new oreilly.views.TraficDetail({
                prevCard: this,
                record: records[0],
                showTraficData: false
            });
            this.ownerCt.setActiveItem(sessionCard, 'slide');
        }
    }
});

Ext.reg('traficdetail', oreilly.views.TraficDetail);
