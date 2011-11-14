var userLocation = null;

function success(position)
{
	// GeoPosition Object
	userLocation = position;
}

function fail()
{
	// Could not obtain location
}

if( navigator.geolocation )
{
	// Call getCurrentPosition with success and failure callbacks
	navigator.geolocation.getCurrentPosition( success, fail );
	console.log(userLocation);
	
}
else
{
	alert("Sorry, your browser does not support geolocation services.");
}
