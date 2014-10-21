var ToolbarController=function()
{

}

ToolbarController.prototype.render=function(jqSearch)
{
	var $container=$(jqSearch);
	$container.empty();
	injector.process("widgetManager","storage",function(widgetManager,storage){
		widgetManager.append($container,"dropdown",{
			items: [{name: "English",code : "en"},{name: "中文", code: "cn"}],
			default: function(){
				var ret=storage.getSystem('language') || 'en';
				return ret;
			},
			onSelect: function(code){
				storage.setSystem('language',code);
			}
		});
	})
}

exports.ToolbarController=ToolbarController;