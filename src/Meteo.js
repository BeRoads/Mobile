oreilly.views.Meteo = Ext.extend(Ext.TabPanel, {
    
 	region:'center',
	layout : 'fit',
	deferredRender:false,
	autoScroll: true, 
	margins:'0 4 4 0',
	activeTab:0,
	dockedItems: [{
                xtype: 'toolbar',
                title: 'Meteo'
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
        
       
	this.items[0] = oreilly.views.MeteoList;
	this.items[1] = oreilly.views.MeteoMap;        
        oreilly.views.Meteo.superclass.initComponent.call(this);
    }
});

Ext.reg('meteo', oreilly.views.Meteo);
