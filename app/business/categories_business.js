var CategoriesBusiness=function()
{
	var that=this;
	injector.process('productService','htmlEnDecode',function(service,htmledc){
		that.productService=service;
		that.htmlEnDecode=htmledc;
	})
}

CategoriesBusiness.prototype.list=function()
{
	var that=this;
	return new Promise(function(resolve,reject){
		that.productService.getCategories().then(function(data){
			data.map(function(elem){
				elem.description=that.htmlEnDecode.htmlDecode(elem.description);
				return elem;
			});
			resolve(data);
		}).catch(function(e){reject(e)});
	});
}

exports.CategoriesBusiness=CategoriesBusiness;