oreilly.views.Parking = Ext.extend(Ext.TabPanel, {
    
 	region:'center',
	layout : 'fit',
	deferredRender:false,
	autoScroll: true, 
	margins:'0 4 4 0',
	activeTab:0,
	dockedItems: [{
                xtype: 'toolbar',
                title: 'Parkings'
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
        
       
	this.items[0] = oreilly.views.ParkingList;
	this.items[1] = oreilly.views.ParkingMap;        
        oreilly.views.Parking.superclass.initComponent.call(this);
    }
});

Ext.reg('parking', oreilly.views.Parking);
