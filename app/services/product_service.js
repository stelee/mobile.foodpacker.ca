//product service
var server='http://localhost:9000/opencart/';

var features_service_url= '/mock/features.json';
//var categories_service_url= '/mock/categories.json';
var categories_service_url= server + "categories/list/";

//var products_service_url= '/mock/products.json';
products_service_url= server + 'products/listByCategory/';
//var product_service_url='/mock/product.json';
var product_service_url= server + 'products/product/';

var price_service_url=server + 'products/price/'


var Service=function()
{
	var that=this;
	injector.process("loadBar","HttpClient","storage",function(loadBar,HttpClient,storage){//deps
		that.loadBar=loadBar;
		that.HttpClient=HttpClient;
		that.language=storage.getSystem("language") || "en";
	})
}

Service.prototype.getFeatures=function()
{
	var that=this;
	var client=new this.HttpClient(features_service_url);
	return client.get();
}

Service.prototype.getCategories=function()
{
	var that=this;
	var client=new this.HttpClient(categories_service_url+that.language);
	return client.get();
}

Service.prototype.getProducts=function(categoryId)
{
	var client=new this.HttpClient(products_service_url + categoryId + '/' + this.language);
	return client.get();
}


Service.prototype.getPrice=function(productId)
{
	var client=new this.HttpClient(price_service_url + productId + '/' + this.language);
	return client.get();
}

Service.prototype.getProduct=function(productId)
{
	var client=new this.HttpClient(product_service_url + productId + '/' + this.language);
	return client.get();
}

exports.getInstance=function()
{
	return new Service();
}
