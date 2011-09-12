oreilly.views.MeteoMap = Ext.extend(Ext.Panel, {
    coords: [37.788115, -122.402222],
    mapText: '',
    permLink: '',
    title : 'Map',

    initComponent: function(){
        
        var position = new google.maps.LatLng(this.coords[0], this.coords[1]);
        
        
        
        var infowindow = new google.maps.InfoWindow({
            content: this.mapText
        });
        
        this.map = new Ext.Map({
            mapOptions : {
                center : position,  //nearby San Fran
                zoom: 12,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },
            listeners: {
                maprender : function(comp, map){
                    var marker = new google.maps.Marker({
                         position: position,
                         title : 'Sencha HQ',
                         map: map
                    });

                    infowindow.open(map, marker);

                    google.maps.event.addListener(marker, 'click', function() {
                         infowindow.open(map, marker);
                    });
                }
            }
        });
        
        this.items = this.map;
        
        oreilly.views.TraficMap.superclass.initComponent.call(this);
    }
});

Ext.reg('meteomap', oreilly.views.MeteoMap);
