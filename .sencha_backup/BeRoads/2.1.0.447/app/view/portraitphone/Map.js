Ext.define('BeRoads.view.portraitphone.Map', {
    extend:'BeRoads.view.Map',
    id : 'trafficMap',

    config:{
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