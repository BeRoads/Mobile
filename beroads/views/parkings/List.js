Beroads.views.parkingsList = Ext.extend(Ext.Panel, {
    layout: 'card',
    groupByDay: true,
    hasInitializedDate: false,
    startDateIndex: 0,
    title : 'List',
    initComponent: function() {
       
	var toolbarBase = {
            xtype: 'toolbar',
            title: 'Parkings'
        };

        this.list = new Ext.List({
            grouped: false,
            itemTpl: '<span class="name">{name}</span> <span class="secondary">{name}</span>',
            loadingText: "Loading...",
            store: new Ext.data.Store({
                model: 'Parking',
                proxy: {
                    type: 'scripttag',
                    url : 'http://iway.alwaysdata.net/api/parkings/?region='+localStorage.getItem("region")+'&format=json',
                    reader: {
                        type: 'json',
                        root: 'parking'
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
       
        
        Beroads.views.parkingsList.superclass.initComponent.call(this);

    },
    
    initializeData: function(data) {
	
	var parkings = []; 

        for (var i = 0; i < data.data.items.length; i++) {
           
            parkings.push(data.data.items[i]);
            
        }

	Beroads.stores.parkings.add.apply(Beroads.stores.parkings, parkings);
	Beroads.stores.parkings.sort('name');
        
    },

    onSelect: function(selectionmodel, records){
        if (records[0] !== undefined) {
            var sessionCard = new Beroads.views.SessionDetail({
                prevCard: this.listpanel,
                record: records[0]
            });

            Ext.getCmp('main').setActiveItem(sessionCard);
        }
    }
});

Ext.reg('Beroads.views.parkingsList', Beroads.views.parkingsList);
