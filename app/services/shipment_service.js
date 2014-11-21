var ShipmentService=function()
{

}

ShipmentService.prototype.estimate=function(postalCode)
{
	postalCode=postalCode.replace(/\s/g,"");
	var ret;
	if(postalCode.indexOf("H")===0)
	{
		ret=5;
	}else if(postalCode.indexOf("J")===0)
	{
		ret=8;
	}else
	{
		ret=10;
	}
	return new Promise(function(resolve,reject)
	{
		resolve(ret);
	})
}

exports.getInstance=function()
{
	return new ShipmentService();
}