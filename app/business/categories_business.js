var CategoriesBusiness=function()
{
	var that=this;
	injector.process('productService',function(service){
		that.productService=service;
	})
}

CategoriesBusiness.prototype.list=function()
{
	
	return this.productService.getCategories();
}

exports.CategoriesBusiness=CategoriesBusiness;