//Function automatically triggered on success
		var showCoords = function(position) {
			this.localStorage.setItem('userCoords', position.coords.latitude+","+position.coords.longitude);
		}
		
		//Function automatically triggered on error
		var showError = function(error) {
		  this.localStorage.setItem('userCoords', "0,0");
		}
		
		navigator.geolocation.getCurrentPosition(showCoords,showError);
		
        if(localStorage.getItem('lang') == undefined || localStorage.getItem('lang') == null){
        	localStorage.setItem('lang', 'nl');
        } 
        if(localStorage.getItem('area') == undefined || localStorage.getItem('area') == null){
        	localStorage.setItem('area', 50);
        } 
        
        if(localStorage.getItem('displayTraffic') == undefined || localStorage.getItem('displayTraffic') == null){
        	localStorage.setItem('displayTraffic', true);
        }
        
        if(localStorage.getItem('displayCameras') == undefined || localStorage.getItem('displayCameras') == null){
        	localStorage.setItem('displayCameras', true);
        }
        
        if(localStorage.getItem('displayRadars') == undefined || localStorage.getItem('displayRadars') == null){
        	localStorage.setItem('displayRadars', true);
        }
        