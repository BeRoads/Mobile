Ext.define('BeRoads.view.Map', {
    extend:'Ext.Map',
    id : 'trafficMap',
    xtype : 'trafficMap',

    config:{
        title: '',
        highAccuracy:true,
        mapOptions:{
            zoom:12,
            mapTypeId:google.maps.MapTypeId.ROADMAP,
            navigationControl:true,
            navigationControlOptions:{
                style:google.maps.NavigationControlStyle.DEFAULT
            }
        }
    }
});