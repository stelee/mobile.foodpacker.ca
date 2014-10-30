var ProductsBusiness=function()
{
	var that=this;
	injector.process('productService',function(service){
		that.productService=service;
	})
}

ProductsBusiness.prototype.getProductsByCategory=function(categoryId)
{
	return this.productService.getProducts(categoryId);
}

exports.ProductsBusiness=ProductsBusiness;