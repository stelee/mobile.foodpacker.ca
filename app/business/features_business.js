var FeaturesBusiness=function()
{

}
FeaturesBusiness.prototype.appendTo=function($container)
{
	var $featuresContainer=$("<div>");
	injector.process('productService',function(pService){
		pService.getFeatures().then(function(data){
			data.forEach(function(item){
				var $div=$("<div style='background-image:url(" + item['image_url'] + ")' class='features-tile'>");

				$featuresContainer.append($div);
			})
		}).catch(function(e){
			console.error(e);
		});
	})

	$container.append($featuresContainer);
}

exports.FeaturesBusiness=FeaturesBusiness;