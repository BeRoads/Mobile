Ext.regController('Radars', {
    store: Beroads.stores.radars,
    model: "Radar",
    index: function() {
        Beroads.views.viewport.reveal('radarsList');
    }
});
