
/**
 * Truncate a string to get a better display
 * @input str the string to truncate
 * @output the truncated value of str
 */
var truncateContent = function (str) {
    var j = 0;
    for (var i = 0; i < str.length; i++) {
        if (j == 5) {
            var trunc = str.substr(0, i);
            trunc += "...";
            return trunc;
        }
        if (str[i] == " ")
            j++;
    }
    return str;
};

/**
 *	Compute distance between two coordinates.
 *  @input lat1 origin's latitude
 *	@input lon1 origin's longitude
 *	@input lat2	destination's latitude
 *	@input lon2 destination's longitude
 *	@output distance in kilometers between the two coordinates
 */
var getDistance = function(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in meters
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                    Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
};

/**
 * Convert a value from degrees to radian
 * @input deg value to convert (in degrees)
 * @output the converted value (in radians)
*/
var deg2rad = function (deg) {
    return deg * (Math.PI/180)
};

var formatTimestamp = function(timestamp){
	if(timestamp == null || timestamp == undefined)
		return "/";
	// create a new javascript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds
	var date = new Date(timestamp*1000);
	// hours part from the timestamp
	var hours = date.getHours();
	// minutes part from the timestamp
	var minutes = date.getMinutes();
	// seconds part from the timestamp
	var seconds = date.getSeconds();

	// will display time in 10:30:23 format
	var formattedTime = hours + ':' + minutes + ':' + seconds;
	return formattedTime;
}
