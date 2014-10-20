//mock version of login service
var LoginService=function()
{
	var that=this;
	injector.process("loadBar",function(loadBar){
		that.loadBar=loadBar;
	})
}
injector.process("BaseService",function(BaseService){
	LoginService.prototype=new BaseService();
})
LoginService.prototype.login=function(username, password)
{
	var that=this;
	that.loadBar.show();
	injector.process("Neo",function(Neo){
		var manager=Neo.getInstance();
		var user=manager.loadModel("user");
		user
		.findFirstBy("email='" + username + "' and password = '" + password + "'")
		.success(function(user){
			that.loadBar.hide();
			if(user === null)
			{
					that._onfailed();
					return;
			}
			that._onsuccess({
				username: user.data.email,
				id : user.id,
				displayName: user.data.displayName
			})
		})
		.failed(function(error)
		{
			that.loadBar.hide();
			that._onfailed(error);
		})
	})
	return this;
}
exports.getInstance=function()
{
	return new LoginService();
}
