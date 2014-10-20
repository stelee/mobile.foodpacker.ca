exports.render=function(attr)
{
	var type=attr.type || "button";
	var label=attr.label || (type[0].toUpperCase()+type.slice(1));
	var $button= $("<button type='" + type + "' class='btn btn-default'>" + label + "</button>");
	if(typeof attr.onclick === "function")
	{
		$button.on('click',function(evt){
			attr.onclick.call(this,evt);
		})
	}
	return $button
}