BeRoads = new Ext.Application({
    name: "BeRoads",

    launch: function() {


	BeRoads.headerPanel = new Ext.Panel({
		id : 'headerPanel',
		html : 'BeRoads',
		dock : 'top'
	});

        


        BeRoads.Viewport = new Ext.Panel ({
            fullscreen: true,
            layout: 'card',
            cardSwitchAnimation: 'slide',
            items: [BeRoads.headerPanel]
        });

    }
});


