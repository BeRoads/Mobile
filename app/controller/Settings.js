Ext.define('BeRoads.controller.Settings', {
    extend:'Ext.app.Controller',

    views:['Main'],

    //the change event is call on creation but we don't want to switch at this moment
    firstCall : true,

    config:{
        refs:{
            displayTraffic : '#displayTraffic',
            displayRadars : '#displayRadars',
            displayWebcams : '#displayWebcams',
            lang : "#lang",
            area : "#area",
            userFormFieldset:'#userFormFieldset',
            thanksFieldset : '#thanksFieldset',
            preferenceButton : '#preferenceButton',
            settingsPanel : '#settingsPanel',
            main : '#mainpanel'
        },
        control:{
            preferenceButton : {
                tap : 'onPreferenceButtonTap'
            },
			userFormFieldset : {
				show : 'loadSettingsPanel'
            },
            displayTraffic : {
                change : 'onDisplayTrafficChange'
            },
            displayRadars : {
                change : 'onDisplayRadarsChange'
            },
            displayWebcams : {
                change : 'onDisplayWebcamsChange'
            },
            area : {
                change : 'onAreaChange'
            },
            lang : {
                change : 'onLangChange'
            }
        }
    },

    init:function () {
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
        else{
           profile = 'portraitphone';
        }
        return profile;
    },

    updateLanguage : function() {
        console.log("Updating language to "+localStorage.getItem('lang'));
        this.getUserFormFieldset().setInstructions(_tr('settings_message', localStorage.getItem('lang')));
        this.getUserFormFieldset().setTitle(_tr('settings', localStorage.getItem('lang')));
        this.getLang().setLabel(_tr('lang', localStorage.getItem('lang')));
        this.getArea().setLabel(_tr('area', localStorage.getItem('lang')));
        this.getThanksFieldset().setTitle(_tr('thanks', localStorage.getItem('lang')));
    },

	loadSettingsPanel : function(){

		this.getUserFormFieldset().setInstructions(_tr('settings_message', localStorage.getItem('lang')));
        this.getPreferenceButton().hide();
       
    },

    onDisplayWebcamsChange : function(me, Slider, thumb, newValue, oldValue, eOpts) {
        
        if(!this.firstCall){
            localStorage.setItem('displayWebcams', 1-localStorage.getItem('displayWebcams'));
            var profile = this.getProfile();
            this.getApplication().getController('BeRoads.controller.'+profile+'.Map').updateMapArea('webcams');
        }
        

    }, 

    onDisplayRadarsChange : function(me, Slider, thumb, newValue, oldValue, eOpts) {
        
        if(!this.firstCall){
            localStorage.setItem('displayRadars', (1 - localStorage.getItem('displayRadars')));
            var profile = this.getProfile();
            this.getApplication().getController('BeRoads.controller.'+profile+'.Map').updateMapArea('radars');
        }
        
    },

    onDisplayTrafficChange : function(me, Slider, thumb, newValue, oldValue, eOpts){
        if(!this.firstCall){
            localStorage.setItem('displayTraffic', (1-localStorage.getItem('displayTraffic')));
            var profile = this.getProfile();
            this.getApplication().getController('BeRoads.controller.'+profile+'.Map').updateMapArea('traffic');
        }
    },

    onAreaChange : function(cmp, newValue, oldValue, eOpts) {
        localStorage.setItem('area', newValue);
        var profile = this.getProfile();
        this.getApplication().getController('BeRoads.controller.'+profile+'.Map').updateMapArea("area");
        
    },

    onLangChange : function(cmp, newValue, oldValue, eOpts) {
        localStorage.setItem('lang', newValue);
        var profile = this.getProfile();
        this.getApplication().getController('BeRoads.controller.'+profile+'.Main').updateLanguage();
        this.getApplication().getController('BeRoads.controller.'+profile+'.Map').updateLanguage();
        this.getApplication().getController('BeRoads.controller.'+profile+'.Radars').updateLanguage();
        this.getApplication().getController('BeRoads.controller.'+profile+'.Settings').updateLanguage();
        this.getApplication().getController('BeRoads.controller.'+profile+'.TrafficEvents').updateLanguage();
        this.getApplication().getController('BeRoads.controller.'+profile+'.Webcams').updateLanguage();
    },

    onPreferenceButtonTap : function(){

        this.getSettingsPanel().show();
        this.firstCall = false;
    }
});
