//product service
var features_service_url= '/mock/features.json';
var categories_service_url= '/mock/categories.json';
var products_service_url= '/mock/products.json';

var Service=function()
{
	var that=this;
	injector.process("loadBar","HttpClient",function(loadBar,HttpClient){//deps
		that.loadBar=loadBar;
		that.HttpClient=HttpClient;
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
	var client=new this.HttpClient(categories_service_url);
	return client.get();
}

Service.prototype.getProducts=function(categoryId)
{
	var client=new this.HttpClient(products_service_url);
	return client.get({categoryId: categoryId});
}

exports.getInstance=function()
{
	return new Service();
}
