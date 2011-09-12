oreilly.views.ParkingMap = Ext.extend(Ext.Panel, {
    coords: [50.85, 4.35],
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
                center : position,  //nearby Brussels
                zoom: 12,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },
            listeners: {
                maprender : function(comp, map){
                    	var markers = new Array();

			var infowindow = new google.maps.InfoWindow({
				content: "holding..."
			 });
				
			 for(var i = 0; i < oreilly.ParkingStore.data.items.length; i++){
				var parking = oreilly.ParkingStore.data.items[i].data;

				var latlng = new google.maps.LatLng(parking.lat, parking.lng);
			
				markers[i] = new google.maps.Marker({
						position: latlng,
						map: map,
						title: parking.name,
						html : "<p>"+parking.name+"</p>"
				});
				
				var marker = markers[i];

				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(this.html);
					infowindow.open(map,this);
				});
				
			}

                   
                }
            }
        });
        
        this.items = this.map;
        
        oreilly.views.ParkingMap.superclass.initComponent.call(this);
    }
});

Ext.reg('parkingmap', oreilly.views.ParkingMap);
