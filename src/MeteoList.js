oreilly.views.MeteoList = Ext.extend(Ext.Panel, {
    layout: 'card',
    groupByDay: true,
    hasInitializedDate: false,
    startDateIndex: 0,
    title : 'List',
    initComponent: function() {
       
	var toolbarBase = {
            xtype: 'toolbar',
            title: 'Meteos'
        };

        this.list = new Ext.List({
            grouped: false,
            itemTpl: '<span class="name">{name}</span> <span class="secondary">{name}</span>',
            loadingText: "Loading...",
            store: new Ext.data.Store({
                model: 'TraficEvent',
                proxy: {
                    type: 'scripttag',
                    url : 'http://iway.alwaysdata.net/api/trafic/?region=brussels&format=json',
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
        
        this.on('activate', this.checkActiveDate, this);
        
        oreilly.views.MeteoList.superclass.initComponent.call(this);

    },
    
    checkActiveDate: function(){
        if (!this.hasInitializedDate && this.dateButtons) {
            var currentTime = new Date(),
                month = currentTime.getMonth() + 1,
                day = currentTime.getDate(),
                year = currentTime.getFullYear();
            
            var dateIndex = this.dateButtons.items.findIndex('dateData', month+'/'+day+'/'+year);
            
            if (dateIndex !== -1) this.startDateIndex = dateIndex;
            
            this.dateButtons.setPressed(this.startDateIndex);
            this.changeDate(this.dateButtons.items.getAt(this.startDateIndex));
            this.doComponentLayout();
            this.hasInitializedDate = true;
        }
    },
    
    initializeData: function(data) {
	
	var Meteos = []; 

        for (var i = 0; i < data.data.items.length; i++) {
           
            Meteos.push(data.data.items[i]);
            
        }

	oreilly.MeteoStore.add.apply(oreilly.MeteoStore, Meteos);
	oreilly.MeteoStore.sort('name');
        
    },
    
    changeDate: function(btn) {
        this.list.store.clearFilter();
        this.list.store.filter('lastUpdate', btn.dateData);
        this.list.scroller.scrollTo({y: 0}, false);
    },
    
    onSelect: function(selectionmodel, records){
        if (records[0] !== undefined) {
            var sessionCard = new oreilly.views.SessionDetail({
                prevCard: this.listpanel,
                record: records[0]
            });

            // Tell the parent panel to animate to the new card
            this.setActiveItem(sessionCard, 'slide');
        }
    }
});

Ext.reg('meteolist', oreilly.views.MeteoList);
