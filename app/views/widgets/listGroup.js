exports.render=function(attrs)
{
	var $ret=$("<div class='list-group'>");
	var renderItem=attrs.renderItem || function(item){
		return item.name;
	}

	attrs.items.forEach(function(item){
		$ret.append(renderItem(item));
	})

	return $ret;
}