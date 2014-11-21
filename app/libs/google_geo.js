var GoogleGeo=function()
{

}

GoogleGeo.prototype.decode=function(latitude,longtitude)
{
	var latlng=new google.maps.LatLng(latitude,longtitude);
	var geocoder = new google.maps.Geocoder();
	return new Promise(function(resolve,reject)
	{
		geocoder.geocode({'latLng': latlng}, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK) {
		      if (results[0]) {
		        resolve({
		        	address: results[0].formatted_address,
		        	postal_code: results[0].address_components[8].long_name,
		        	details: results[0]
		        })
		      } else {
		        cosole.error('No result found');
		      	reject("NOT FOUND");
		      }
		    } else {
		      cosole.error('Geocoder failed due to: ' + status);
		      reject(status);
		    }
		});
	})
}

exports.GoogleGeo=GoogleGeo;