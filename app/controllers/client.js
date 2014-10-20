var Client=function(){

}

injector.process("SBaseController",function(BaseController)
{
	Client.prototype=new BaseController();
})

Client.prototype.render=function(){
	var that=this;
	var $body=this.getBody();
	$body.empty();
	injector.process("widgetManager","eventManager","formValidator","notifier","FormGenerator",
		function(manager,eventManager,validator,notifier,generator){
		manager.append($body,"buttonGroup",[{
			code: "client",
			text: "Client",
			triggerEvent: "Load-Client-Form"
		},{
			code : "visit",
			text: "Visit",
			triggerEvent: "Load-Visit-Form"
		}]);

		$container=$("<div>");
		$body.append($container);

		eventManager.bind(document,"Load-Client-Form",function(){
			$container.empty();
			var formGen=generator.getInstance();
			formGen.bind("verified",function(data)
			{
				injector.process("ClientBusiness",function(ClientBusiness){
					var business=new ClientBusiness();
					business.save(data).success(function(){
						notifier.info("client has been saved");
					}).failed(function(error){
						notifier.error(error);
					})
				})
			})
			injector.process("FormBusiness",function(FormBusiness)
			{
				var business=new FormBusiness();
				business.showAddClientForm(formGen).appendTo($container);
			});
		});
		eventManager.bind(document,"Load-Visit-Form",function(){
			$container.empty();
			var formGen=generator.getInstance();
			formGen.bind("verified",function(data)
			{
				injector.process("VisitBusiness",function(VisitBusiness)
				{
					var business=new VisitBusiness();
					business.save(data.clientCode,data).success(function(){
						notifier.info("this visit has been logged");
					}).failed(function(error){
						notifier.error(error)
					})
				})
			});
			injector.process("FormBusiness",function(FormBusiness)
			{
				var business=new FormBusiness();
				business.showAddVisitForm(formGen).appendTo($container);
			});
		})
	})
}

exports.getInstance=function(){
	return new Client();
}
