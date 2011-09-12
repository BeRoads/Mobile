oreilly.views.Camera = Ext.extend(Ext.TabPanel, {
    
 	region:'center',
	layout : 'fit',
	deferredRender:false,
	autoScroll: true, 
	margins:'0 4 4 0',
	activeTab:0,
	dockedItems: [{
                xtype: 'toolbar',
                title: 'Cameras'
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
        
       
	this.items[0] = oreilly.views.CameraList;
	this.items[1] = oreilly.views.CameraMap;        
        oreilly.views.Camera.superclass.initComponent.call(this);
    }
});

Ext.reg('camera', oreilly.views.Camera);
