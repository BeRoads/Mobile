oreilly.views.CameraList = Ext.extend(Ext.Panel, {
    layout: 'card',
    
    initComponent: function() {
        
	this.list = new Ext.List({
            grouped: false,
            itemTpl: '<div class="avatar"<tpl if="photo"> style="background-image: url({img})"</tpl>></div><span class="name">{name}<tpl if="position || affiliation"><br /><span class="tertiary">{highway}</span></tpl></span>',
            loadingText: false,
            store: new Ext.data.Store({
                model: 'Camera',
                proxy: {
                    type: 'scripttag',
                    url : 'http://iway.alwaysdata.net/api/camera/?region=brussels&format=json',
                    reader: {
                        type: 'json',
                        root: 'camera'
                    }
                },
                listeners: {
                    load: { fn: this.initializeData, scope: this }
                }
            })
        });

        this.listpanel = new Ext.Panel({
            items: this.list,
            layout: 'fit',
            dockedItems: [{
                xtype: 'toolbar',
                title: this.confTitle
            }],
            listeners: {
                activate: { fn: function(){
                    this.list.getSelectionModel().deselectAll();
                    Ext.repaint();
                }, scope: this }
            }
        })
        
        this.items = this.listpanel;
        
        oreilly.views.SpeakerList.superclass.initComponent.call(this);
    },
    
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
            
            var bioCard = new oreilly.views.SpeakerDetail({
                prevCard: this.listpanel,
                record: records[0]
            });
            
            this.setActiveItem(bioCard, 'slide');
        }
    }
});

Ext.reg('speakerlist', oreilly.views.SpeakerList);
