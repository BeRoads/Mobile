Ext.regController('Parkings', {
    store: Beroads.stores.parkings,
    model: "Parking",
    index: function() {
        Beroads.views.viewport.reveal('parkingsList');
    }
});
