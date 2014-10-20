var WidgetManager=function(){
	this.config={
		"dir" : "./views/widgets/"
	}
}
WidgetManager.prototype.append=function($container,widgetName,param)
{
	var $widget= null
	try{
		$widget=require(this.config.dir + widgetName).render(param);
	}catch(e)
	{

	}
	if(!!!$widget)
	{
		$container.append("<error>" + widgetName + " not defined</error>");
	}else
	{
		$container.append($widget);
	}
	return $widget;
	
}
exports.getInstance=function(){
	return new WidgetManager();
}