var FeaturesBusiness=function()
{

}
FeaturesBusiness.prototype.appendTo=function($container)
{
	var $featuresContainer=$("<div>");
	$featuresContainer.append(_l("<h3>","Features","</h3>"));
	
	$container.append($featuresContainer);
}

exports.FeaturesBusiness=FeaturesBusiness;