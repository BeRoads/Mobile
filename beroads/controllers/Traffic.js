Ext.regController('Traffic', {
    store: Beroads.stores.traffic,
    model: "Traffic",
    index: function() {
        Beroads.views.viewport.reveal('trafficList');
    }

});
