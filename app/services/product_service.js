//product service
var Service=function()
{
	var that=this;
	injector.process("loadBar",function(loadBar){
		that.loadBar=loadBar;
	})
}
injector.process("Service",function(BaseService){
	Service.prototype=new BaseService();
});

exports.getInstance=function()
{
	return new LoginService();
}
