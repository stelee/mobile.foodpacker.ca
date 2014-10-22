var ToolbarController=function()
{

}

ToolbarController.prototype.render=function(jqSearch)
{
	var $container=$(jqSearch);
	$container.empty();
	injector.process("widgetManager","storage","eventManager",function(widgetManager,storage,eventManager){
		widgetManager.append($container,"dropdown",{
			items: [{name: "English",code : "en"},{name: "中文", code: "cn"}],
			default: function(){
				var ret=storage.getSystem('language') || 'en';
				return ret;
			},
			onSelect: function(code){
				storage.setSystem('language',code);
				if(eventManager.hasBind(document,"Change-Language"))
				{
					eventManager.trigger(document,"Change-Language");
				}else
				{
					eventManager.bind(document,"Change-Language",function(){
						location.reload();
					})
				}
				//location.reload();
			}
		});
	})
}

exports.ToolbarController=ToolbarController;