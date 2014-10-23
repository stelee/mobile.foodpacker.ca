//product service
var features_service_url= '/mock/features.json';

var Service=function()
{
	var that=this;
	injector.process("loadBar","HttpClient",function(loadBar,HttpClient){//deps
		that.loadBar=loadBar;
		that.HttpClient=HttpClient;
	})
}
injector.process("TraitsObjectStatusSupport",function(traits){
  mixin(Service,traits);
});

Service.prototype.getFeatures=function()
{
	var that=this;
	var client=new this.HttpClient(features_service_url)
	client.get().then(function(data){
		that._setStatusSuccess(data);
	}).catch(function(e){
		that._setStatusFailed(e);
	})
	return this;
}

exports.getInstance=function()
{
	return new Service();
}
