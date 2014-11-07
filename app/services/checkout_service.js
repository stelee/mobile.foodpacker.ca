var Service=function()
{

}

Service.prototype.send=function(data,onSuccess,onFailed)
{
	injector.process("loadBar",function(loadBar){
		loadBar.show();
		setTimeout(function(){
			loadBar.hide();
			onSuccess();
		},5000);
	})
}

exports.getInstance=function()
{
	return new Service();
}