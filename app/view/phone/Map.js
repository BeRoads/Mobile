Ext.define('BeRoads.view.phone.Map', {
    extend:'BeRoads.view.Map',
    id : 'trafficMap',

    config:{
        title : 'Map',
        highAccuracy:true,
        mapOptions:{
            zoom:12,
            mapTypeId:google.maps.MapTypeId.ROADMAP,
            navigationControl:true,
            navigationControlOptions:{
                style:google.maps.NavigationControlStyle.DEFAULT
            }
        },
        useCurrentLocation:true
    }
});