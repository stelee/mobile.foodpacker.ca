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
		var $option=$("<option value='" + option.value + "'>" + option.text + "</option>");
		$select.append($option);
	})

	$comp.append($select);
	return $comp;
}