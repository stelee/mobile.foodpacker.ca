//product service
var features_service_url= '/mock/features.json';
var categories_service_url= '/mock/categories.json';

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

exports.getInstance=function()
{
	return new Service();
}
