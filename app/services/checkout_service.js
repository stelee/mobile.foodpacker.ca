var remoteUrl="";
injector.process('appConfig',function(config){
	remoteUrl=config.remote_url;
})
var service_url=remoteUrl + "order"
var Service=function()
{
	var that=this;
}

Service.prototype.send=function(data,onSuccess,onFailed)
{
	var that=this;
	injector.process("loadBar","HttpClient",function(loadBar,HttpClient){
		loadBar.show();
		var httpClient=new HttpClient(service_url);
		httpClient.post(data).then(function(ret){
			loadBar.hide();
			if(ret.ret === -1)
			{
				onFailed(ret.error);
			}else
			{
				onSuccess();
			}
			
		}).catch(function(err)
		{
			loadBar.hide();
			onFailed(err);
		})
	})
}

exports.getInstance=function()
{
	return new Service();
}