BeRoutes = new Ext.Application({
    name: "BeRoutes",

    launch: function() {


	BeRoutes.headerPanel = new Ext.Panel({
		id : 'headerPanel',
		html : 'BeRoutes',
		dock : 'top'
	});

        


        BeRoutes.Viewport = new Ext.Panel ({
            fullscreen: true,
            layout: 'card',
            cardSwitchAnimation: 'slide',
            items: [BeRoutes.headerPanel]
        });

    }
});


