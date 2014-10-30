exports.render=function(attrs)
{
	var style=attrs.style || "";
	if(style != "")
	{
		style = " style='" + style + "' ";
	}
	var $ret=$("<div class='list-group'" + style + ">");
	var renderItem=attrs.renderItem || function(item){
		return item.name;
	}

	attrs.items.forEach(function(item){
		$ret.append(renderItem(item));
	})

	return $ret;
}