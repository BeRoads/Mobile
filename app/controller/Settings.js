Ext.define('BeRoads.controller.Settings', {
    extend:'Ext.app.Controller',

    views:['Main'],

    /*
        The togglefields 'change' event is call on creation but we don't want to switch values on creation.
    */
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

    /**
        Return the current profile depending on device type and screen orientation
        @return string profile
    **/
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

    /**
     *   Change the text values of the view to the current language value.
     *   @return 
    */
    updateLanguage : function() {
        this.getUserFormFieldset().setInstructions(_tr('settings_message', localStorage.getItem('lang')));
        this.getUserFormFieldset().setTitle(_tr('settings', localStorage.getItem('lang')));
        this.getLang().setLabel(_tr('lang', localStorage.getItem('lang')));
        this.getArea().setLabel(_tr('area', localStorage.getItem('lang')));
        this.getThanksFieldset().setTitle(_tr('thanks', localStorage.getItem('lang')));
    },

    /**
     *   No description needed, read the code you dumbass ! 
     */
	loadSettingsPanel : function(){
		this.getUserFormFieldset().setInstructions(_tr('settings_message', localStorage.getItem('lang')));
        this.getPreferenceButton().hide();
    },

    /**
        Called when the user toggle the 'displayWebcams' togglefield. Change the localStorage value 
        and call impacted controllers so they update their values.
        @return
    **/
    onDisplayWebcamsChange : function(me, Slider, thumb, newValue, oldValue, eOpts) {
        
        if(!this.firstCall){
            localStorage.setItem('displayWebcams', 1-localStorage.getItem('displayWebcams'));
            var profile = this.getProfile();
            this.getApplication().getController('BeRoads.controller.'+profile+'.Map').updateMapArea('webcams');
        }
    }, 

    /**
     *  Called when the user toggle the 'displayRadars' togglefield. Change the localStorage value 
     *  and call impacted controllers so they update their values.
     *   @return
     */
    onDisplayRadarsChange : function(me, Slider, thumb, newValue, oldValue, eOpts) {
        
        if(!this.firstCall){
            localStorage.setItem('displayRadars', (1 - localStorage.getItem('displayRadars')));
            var profile = this.getProfile();
            this.getApplication().getController('BeRoads.controller.'+profile+'.Map').updateMapArea('radars');
        }
    },

    /**
     *  Called when the user toggle the 'displayTraffic' togglefield. Change the localStorage value 
     *  and call impacted controllers so they update their values.
     *  @return
     */
    onDisplayTrafficChange : function(me, Slider, thumb, newValue, oldValue, eOpts){
        if(!this.firstCall){
            localStorage.setItem('displayTraffic', (1-localStorage.getItem('displayTraffic')));
            var profile = this.getProfile();
            this.getApplication().getController('BeRoads.controller.'+profile+'.Map').updateMapArea('traffic');
        }
    },

    /**
     *  Called when the user change the value of the area numberfield. Change the localStorage value 
     *  and call impacted controllers so they update their values.
     *  @return
     */
    onAreaChange : function(cmp, newValue, oldValue, eOpts) {
        localStorage.setItem('area', newValue);
        var profile = this.getProfile();
        this.getApplication().getController('BeRoads.controller.'+profile+'.Map').updateMapArea("area");
    },

    /**
     *  Called when the user change the value of the lang selectfield. Change the localStorage value 
     *  and call impacted controllers so they update their values.
     *  @return
     */
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

    /**
     *  Called when the user press the settings button. Shows uo the floating settings panel
     *  @return
     */
    onPreferenceButtonTap : function(){
        this.getSettingsPanel().show();
        this.firstCall = false;
    }
});
