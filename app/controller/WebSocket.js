Ext.define('BeRoads.controller.WebSocket', {
    extend: 'Ext.app.Controller',

    host : "ws://0.0.0.0:8080/socket",
    socket : null,
    config: {
        stores: ['offline.TrafficEvent', 'offline.Radar', 'offline.Webcam'],
        refs: {
        },
        control: {
        }
    },

    init:function () {

        console.log("Init websocket controller");
        var me = this;

        this.socket = new WebSocket(this.host);

        this.socket.onopen = function(){
            console.log('Socket Status: '+me.socket.readyState+' (open)');
        };

        this.socket.onmessage = function(msg){

            v = eval('('+msg.data+')');
            console.log(v);
            //first ACK message, we set the transmitted uuid
            if(v['code']==2 && (me.socket.uuid==null || me.socket.uuid == undefined)){
                me.socket.uuid = v['uuid'];
            }
            //we receive a publish message, we have to update the client
            if(v['code']==3){
                console.log(v['data']);
            }
        };

        this.socket.onclose = function(){
            console.log('Socket Status: '+me.socket.readyState+' (Closed)');
        };
        this.callParent(arguments);
    },

    subscribe : function() {

        if(this.socket.readyState != 1 ){
            throw new Exception("Can't subscribe if the websocket is closed.");
        }
        if(this.socket.uuid == null || this.socket.uuid == undefined) {
            throw new Exception("Can't subscribe without a valid uuid.");
        }
        var message = {
            "uuid" : this.socket.uuid,
            "code" : 1,
            "coords" : BeRoads.app.user_coords,
            "area" : localStorage.getItem("area"),
            "language" : localStorage.getItem("lang")
        };
        socket.send(JSON.stringify(message));
    },

    update : function() {

        if(this.socket.readyState != 1 ){
            throw new Exception("Can't subscribe if the websocket is closed.");
        }
        if(this.socket.uuid == null || this.socket.uuid == undefined) {
            throw new Exception("Can't subscribe without a valid uuid.");
        }
        var message = {
            "uuid" : this.socket.uuid,
            "code" : 1,
            "coords" : BeRoads.app.user_coords,
            "area" : localStorage.getItem("area"),
            "language" : localStorage.getItem("lang")
        };
        socket.send(JSON.stringify(message));
    }
});