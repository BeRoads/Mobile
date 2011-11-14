Ext.regController('Traffic', {
    store: Beroads.stores.Traffic,
    model: "Traffic",
    index: function() {
        Beroads.views.viewport.reveal('trafficList');
    }

});
