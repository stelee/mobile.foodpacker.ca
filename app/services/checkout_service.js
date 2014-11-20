var service_url="http://localhost:9000/opencart/order"
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
		// setTimeout(function(){
		// 	loadBar.hide();
		// 	onSuccess();
		// },5000);
	})
}

exports.getInstance=function()
{
	return new Service();
}