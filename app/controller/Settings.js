Ext.define('BeRoads.controller.Settings', {
    extend:'Ext.app.Controller',

    views:['Settings'],

    //the change event is call on creation but we don't want to switch at this moment
    firstCall : true,

    config:{
        refs:{
            userFormFieldset:'#userFormFieldset',
            preferenceButton : '#preferenceButton',
            moreButton : '#moreButton',
            main:'#mainpanel'
        },
        control:{
			userFormFieldset : {
				show : 'loadSettingsPanel',
                erased : 'destroySettingsPanel'
            },
            moreButton : {
                tap : 'onMoreButtonTap'
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
    },

	loadSettingsPanel : function(){
		this.getUserFormFieldset().setInstructions(_tr('settings_message', localStorage.getItem('lang')));
        this.getPreferenceButton().hide();
    },

	destroySettingsPanel : function(){
        this.getPreferenceButton().show();		
    },

    onDisplayWebcamsChange : function(me, Slider, thumb, newValue, oldValue, eOpts) {
        localStorage.setItem('displayWebcams', 1-localStorage.getItem('displayWebcams'));
        var profile = this.getProfile();
        this.getApplication().getController('BeRoads.controller.'+profile+'.Map').updateMapArea();
    }, 

    onDisplayRadarsChange : function(me, Slider, thumb, newValue, oldValue, eOpts) {
        localStorage.setItem('displayRadars', (1 - localStorage.getItem('displayRadars')));
        var profile = this.getProfile();
        this.getApplication().getController('BeRoads.controller.'+profile+'.Map').updateMapArea();
    },

    onDisplayTrafficChange : function(me, Slider, thumb, newValue, oldValue, eOpts){
        localStorage.setItem('displayTraffic', (1-localStorage.getItem('displayTraffic')));
        var profile = this.getProfile();
        this.getApplication().getController('BeRoads.controller.'+profile+'.Map').updateMapArea();
    },

    onAreaChange : function(cmp, newValue, oldValue, eOpts) {
        
        localStorage.setItem('area', newValue);

        var profile = this.getProfile();
        this.getApplication().getController('BeRoads.controller.'+profile+'.Map').updateMapArea();
        
    },

    onLangChange : function(cmp, newValue, oldValue, eOpts) {
         
        localStorage.setItem('lang', newValue);
        var profile = this.getProfile();
        this.getApplication().getController('BeRoads.controller.'+profile+'.Map').updateLanguage();
        this.getApplication().getController('BeRoads.controller.'+profile+'.Radars').updateLanguage();
        this.getApplication().getController('BeRoads.controller.'+profile+'.Settings').updateLanguage();
        this.getApplication().getController('BeRoads.controller.'+profile+'.TrafficEvents').updateLanguage();
        this.getApplication().getController('BeRoads.controller.'+profile+'.Webcams').updateLanguage();
    },

	/**
	 * Push a 'credits' like page
	 */
    onMoreButtonTap:function () {
        this.getPreferenceButton().hide();
        this.getMain().push({
            xtype: 'aboutList'
        });
    }
});
