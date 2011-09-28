Beroads.views.TrafficList = Ext.extend(Ext.Panel, {
    layout : 'fit',
    title : 'List',

    initComponent: function() {
       
       
	this.dockedItems = [{
            xtype: 'toolbar',
            title: 'Traffic'
        }]

        this.list = new Ext.List({
            grouped: false,
            itemTpl: '<span class="name">{location}</span> <span class="secondary">{message}</span>',
            loadingText: "Loading...",
            store: Beroads.stores.Traffic
            
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
                
        Beroads.views.TrafficList.superclass.initComponent.call(this);

    },
    
    
    initializeData: function(data) {
	
		data = data.item;
		Beroads.stores.Traffic.add.apply(Beroads.stores.Traffic, data);
        
    },
    
    
    
    onSelect: function(selectionmodel, records){
        if (records[0] !== undefined) {
            var sessionCard = new Beroads.views.TrafficDetail({
                prevCard: this,
                record: records[0]
            });

            // Tell the parent panel to animate to the new card
            Ext.getCmp('main').setActiveItem(sessionCard);
	    
        }
    }
});

Ext.reg('Beroads.views.TrafficList', Beroads.views.TrafficList);
