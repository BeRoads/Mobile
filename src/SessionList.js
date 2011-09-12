oreilly.views.SessionList = Ext.extend(Ext.Panel, {
    layout: 'card',
    groupByDay: true,
    hasInitializedDate: false,
    startDateIndex: 0,
    initComponent: function() {
        

        this.list = new Ext.List({
            grouped: false,
            itemTpl: '<span class="name">{name}</span> <span class="secondary">{name}</span>',
            loadingText: false,
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
        
        this.on('activate', this.checkActiveDate, this);
        
        oreilly.views.SessionList.superclass.initComponent.call(this);

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
	
	alert('initialize data');

	var traficevents = [], 
			length = data.length;
        // First fill the sessions to the speaker store
        //var speakers = [], length   = data.data.items.length, proposal, i;
        
	
        for (i = 0; i < length; i++) {
            
            traficevents.push(data.traficevent[i]);
            
        }

	oreilly.TraficEventStore.add.apply(oreilly.TraficEventStore, traficevents);
	oreilly.TraficEventStore.sort('name');

        //oreilly.SpeakerStore.add.apply(oreilly.SpeakerStore, speakers);
        //oreilly.SpeakerStore.sort('last_name');

        
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

Ext.reg('traficlist', oreilly.views.SessionList);
