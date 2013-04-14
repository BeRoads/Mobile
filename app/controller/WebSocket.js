Ext.define('BeRoads.controller.WebSocket', {
    extend: 'Ext.app.Controller',

    host : "ws://0.0.0.0:8080/socket",
    socket : null,
    ack : 0,
    config: {
        stores: ['offline.TrafficEvent', 'offline.Radar', 'offline.Webcam'],
        refs: {
        },
        control: {
        }
    },

    init:function () {

        var me = this;

        this.socket = new WebSocket(this.host);

        this.socket.onopen = function(){
            console.log('Socket Status: '+me.socket.readyState+' (open)');
        };

        this.socket.onmessage = function(msg){

            var record = JSON.parse(msg.data);
            //first ACK message, we set the transmitted uuid
            if(record.code==2){
                me.socket.uuid = record.uuid;
                me.ack--;
            }
            //we receive a publish message, we have to update the client
            if(record.code==3){
                var event = Ext.getStore('offline.TrafficEvent').add(record.data)[0];
                Ext.getStore('offline.TrafficEvent').sort('distance', 'ASC');
                Ext.getStore('offline.TrafficEvent').sync();
                var position = new google.maps.LatLng(record.data.lat, record.data.lng);
                BeRoads.app.getController('BeRoads.controller.'+me.getProfile()+'.Map').
                    addTrafficEvent(record.data, position);
            }
        };

        this.socket.onclose = function(){
            console.log('Socket Status: '+me.socket.readyState+' (Closed)');
        };
        this.callParent(arguments);
    },

    getProfile : function() {
        var profile;
        if(Ext.os.is.Phone && Ext.Viewport.getOrientation() == 'landscape'){
            profile = 'landscapephone';
        }
        else if(Ext.os.is.Phone && Ext.Viewport.getOrientation() == 'portrait'){
            profile = 'portraitphone';
        }
        else if(Ext.os.is.Tablet && Ext.Viewport.getOrientation() == 'landscape'){
            profile = 'landscapetablet';
        }
        else if(Ext.os.is.Tablet && Ext.Viewport.getOrientation() == 'portrait'){
            profile = 'portraittablet';
        }
        else if(Ext.os.is.Desktop){
            profile = 'desktop';
        }
        else{
            profile = 'portraitphone';
        }
        return profile;
    },

    subscribe : function() {

        var me = this;
        if(this.socket.readyState != 1 ){
            throw "Can't subscribe if the websocket is closed.";
        }
        if(this.socket.uuid == undefined || this.socket.uuid == null){
            throw "Can't subscribe if there is no valid subscription.";
        }
        if(this.ack>0){
            setTimeout(function(){me.subscribe();},1000);
        }else{
            var message = {
                "code" : 1,
                "coords" : BeRoads.app.user_coords.coords,
                "area" : localStorage.getItem("area"),
                "language" : localStorage.getItem("lang")
            };
            console.log("Subscribing...");
            console.log(message);
            this.ack++;
            this.socket.send(JSON.stringify(message));
        }
    },

    update : function() {

        var me = this;
        if(this.socket.readyState != 1 ){
            throw "Can't subscribe if the websocket is closed.";
        }
        if(this.socket.uuid == undefined || this.socket.uuid == null){
            throw "Can't subscribe if there is no valid subscription.";
        }

        if(this.ack>0){
            setTimeout(function(){me.update();},1000);
        }else{
            var message = {
                "code" : 1,
                "coords" : BeRoads.app.user_coords.coords,
                "area" : localStorage.getItem("area"),
                "language" : localStorage.getItem("lang")
            };
            console.log("Updating...");
            console.log(message);
            this.ack++;
            this.socket.send(JSON.stringify(message));
        }

    }
});