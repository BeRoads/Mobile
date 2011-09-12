Ext.regController('Cameras', {
    store: Beroads.stores.cameras,
    model: "Camera",
    index: function() {
        Beroads.views.viewport.reveal('camerasList');
    }
});
