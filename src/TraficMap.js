oreilly.views.TraficMap = Ext.extend(Ext.Panel, {
    coords: [50.85, 4.35],
    mapText: '',
    permLink: '',
    title : 'Map',

    
    initComponent: function(){
        
	var position = new google.maps.LatLng(this.coords[0], this.coords[1]);

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


				
				 for(var i = 0; i < oreilly.TraficEventStore.data.items.length; i++){
					var event = oreilly.TraficEventStore.data.items[i].data;
				 	alert(event.lat);
					var latlng = new google.maps.LatLng(event.lat, event.lng);
				
					markers[i] = new google.maps.Marker({
							position: latlng,
							map: map,
							title: event.name,
							html : "<p>"+event.name+"<br>"+event.description+"</p>"
					});
				
					var marker = markers[i];
					google.maps.event.addListener(marker, 'click', function() {
						infowindow.setContent(this.html);
						infowindow.open(map,this);
					});
					
				}
		
		    
		     var marker = new google.maps.Marker({
                         position: position,
                         title : 'Your position',
                         map: map
                    });
	
                }
            }
        });
        
        this.items = this.map;
        
        oreilly.views.TraficMap.superclass.initComponent.call(this);
    }
});

Ext.reg('traficmap', oreilly.views.TraficMap);
