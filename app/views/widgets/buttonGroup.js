exports.render=function(buttons)
{
	var $comp=$("<div class='btn-group'>");
	buttons.forEach(function(button){
		var $button=$("<button type='button' class='btn btn-default' value='" + button.code +"'>" + button.text +"</button>")
		$comp.append($button);
		injector.process("eventManager",function(eventManager){
			$button.click(function(){
				$(this).parent().children().removeClass("active");
				$(this).addClass("active");
				eventManager.trigger(document,button.triggerEvent);
			})
		})
	})
	return $comp;
}