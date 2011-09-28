Beroads.views.CamerasList = Ext.extend(Ext.Panel, {
    layout: 'card',
   
    title : 'List',
    initComponent: function() {
       
	this.dockedItems = [{
            xtype: 'toolbar',
            title: 'Cameras'
        }]

        this.list = new Ext.List({
            grouped: false,
            itemTpl: '<div class="avatar" style="background-image: url({img})"></div><span class="name">{name}</span> <span class="secondary">{name}</span>',
            loadingText: "Loading...",
            store: Beroads.stores.cameras
        });
        
        this.list.on('selectionchange', this.onSelect, this);
        
        this.list.on('render', function(){
            this.list.store.load();
            this.list.el.mask('<span class="top"></span><span class="right"></span><span class="bottom"></span><span class="left"></span>', 'x-spinner', false);
        }, this);
        
        this.listpanel = new Ext.Panel({
            items: this.list,
            layout: 'fit',
           
            listeners: {
                activate: { fn: function(){
                    this.list.getSelectionModel().deselectAll();
                    Ext.repaint();
                }, scope: this }
            }
        })
        
        this.items = this.listpanel;
        
        Beroads.views.CamerasList.superclass.initComponent.call(this);

    },
    
  
    
    
    
    
    onSelect: function(selectionmodel, records){
        if (records[0] !== undefined) {
            var sessionCard = new Beroads.views.CamerasDetail({
                prevCard: this,
                record: records[0]
            });

            // Tell the parent panel to animate to the new card
            Ext.getCmp('main').setActiveItem(sessionCard, {type: 'slide', reverse: false});
        }
    }
});

Ext.reg('Beroads.views.CamerasList', Beroads.views.CamerasList);
