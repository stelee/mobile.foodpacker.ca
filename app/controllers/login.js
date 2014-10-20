var Login=function(){

}

injector.process("BaseController",function(BaseController)
{
	Login.prototype=new BaseController();
})

Login.prototype.render=function(){
	var $body=this.getBody();
	$body.empty();
	injector.process('FormGenerator',function(FormGen){

		var formGen=FormGen.getInstance();
		formGen.bind("verified",function(data){
			injector.process("loginService","dispatcher","notifier","session",function(service,dispatcher,notifier,session){
				service.login(data.email,data.password).success(function(user){
					session.set("user",user);
					dispatcher.redirect("/")
				}).failed(function(){
					session.remove("user");
					notifier.error("Username or password doesn't match");
				})
			})
		});

		$body.append(formGen.generate(
		{type: "email",code : "email", required: "required", value: "liy@leesoft.ca"}
		,{type: "password", code: "password", required: "required", value : "ilovesun"}
		));
	})
}

exports.getInstance=function(){
	return new Login();
}
