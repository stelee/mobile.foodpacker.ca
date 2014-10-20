var ToolbarController=function()
{

}

ToolbarController.prototype.render=function(jqSearch)
{
	var $container=$(jqSearch);
	$container.empty();
	injector.process("widgetManager",function(widgetManager){
		widgetManager.append($container,"dropdown",{
			items: [{name: "International",code : "international"},{name: "United States", code: "us"}],
			default: "international",
			onSelect: function(code){console.log("code selected to " + code)}
		});
	})
}

exports.ToolbarController=ToolbarController;