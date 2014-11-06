exports.render=function(attrs)
{
	var multiple="";
	var required=attrs.required || "";
	if(!!attrs.multiple)
	{
		multiple="multiple";
	}
	var $comp=$("<div class='form-group'>");
	$comp.append("<label for='" + attrs.code + "'> "+ attrs.label + "</label>" );
	var $select=$("<select " + multiple + "class='form-control' id='" + attrs.code + "' "+required+">");
	attrs.options.forEach(function(option){
		var value,text;
		if(typeof option != "object")
		{
			value=option;
			text=option;
		}else
		{
			value=option.value;
			text=option.text;
		}
		var $option=$("<option value='" + value + "'>" + text + "</option>");
		$select.append($option);
	})
	if(attrs.value)
	{
		$select.val(attrs.value);
	}
	$comp.append($select);
	return $comp;
}