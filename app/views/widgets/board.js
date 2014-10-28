exports.render=function(attrs)
{
	var content=attrs.content || "welcome";
	var className=attrs.className || "";
	var width=attrs.width || 0;
	var $ret= $("<div class='infoBoard " + className + "'>" + content + "</div>");
	if(width > 0)
	{
		$ret.width(width);
	}
	
	return $ret;
}