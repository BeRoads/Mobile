oreilly.views.TraficList = Ext.extend(Ext.Panel, {
    layout : 'fit',
    title : 'List',

    initComponent: function() {
       
       

	
        this.list = new Ext.List({
            grouped: false,
            itemTpl: '<span class="name">{name}</span> <span class="secondary">{name}</span>',
            loadingText: "Loading...",
            store: new Ext.data.Store({
                model: 'TraficEvent',
                proxy: {
                    type: 'scripttag',
                    url : 'http://iway.alwaysdata.net/api/trafic/?region=walloonia&format=json',
                    reader: {
                        type: 'json',
                        root: 'traficevent'
                    }
                },
                listeners: {
                    load: { fn: this.initializeData, scope: this }
                }
            })
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
        
        
        
        oreilly.views.TraficList.superclass.initComponent.call(this);

    },
    
    
    
    initializeData: function(data) {
	
	var traficevents = []; 

        for (var i = 0; i < data.data.items.length; i++) {
           
            traficevents.push(data.data.items[i]);
            
        }

	oreilly.TraficEventStore.add.apply(oreilly.TraficEventStore, traficevents);
	
        
    },
    
    
    
    onSelect: function(selectionmodel, records){
        if (records[0] !== undefined) {
            var sessionCard = new oreilly.views.TraficDetail({
                prevCard: Ext.getCmp('trafic'),
                record: records[0]
            });

            // Tell the parent panel to animate to the new card
            Ext.getCmp('main').setActiveItem(sessionCard);
	    
        }
    }
});

Ext.reg('traficlist', oreilly.views.TraficList);
