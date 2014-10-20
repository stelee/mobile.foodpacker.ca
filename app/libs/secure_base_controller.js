var SBaseController=function(){

}

injector.process("BaseController",function(BaseController)
{
	SBaseController.prototype=new BaseController();
})

SBaseController.prototype.auth=function(resolve,reject)
{
	var that=this;
	injector.process("appConfig","dispatcher","session",function(config,dispatcher,session){
		if(!!!session.get("user"))
		{
			reject();
			var login=config.login;
			if(!!login)
			{
				dispatcher.redirect(login);
			}else
			{
				that.render_402();
			}
		}else
		{
			resolve();
		}
		
	})
	
}
SBaseController.prototype.render_402=function()
{
	this.getBody().empty();
	this.getBody().append("<h3>402 Not Authorized</h3>")
	this.getBody().append("<p>The page you request is restrict</p>")
}

exports.SBaseController=SBaseController;

exports.getInstance=function(){
	return new SBaseController();
}