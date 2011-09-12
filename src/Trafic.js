oreilly.views.Trafic = Ext.extend(Ext.TabPanel, {
    
	id : 'trafic',
 	region:'center',
	layout : 'fit',
	deferredRender:false,
	autoScroll: true, 
	margins:'0 4 4 0',
	activeTab:0,
	dockedItems: [{
                xtype: 'toolbar',
                title: 'Trafic'
            }],
	items:[{
		id:'tab1',
		title: 'List',
		},
		{
		id:'tab2',
		title: 'Map',
		}
	],

    initComponent: function(){
        
       
	this.items[0] = oreilly.views.TraficList;
	this.items[1] = oreilly.views.TraficMap;        
        oreilly.views.Trafic.superclass.initComponent.call(this);
    }
});

Ext.reg('trafic', oreilly.views.Trafic);
