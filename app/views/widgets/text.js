exports.render=function(attr)
{
	var rowNumber=attr.rowNumber || 3;
	var required=attr.required || "";
	var $comp=$("<div class='form-group'>");
	$comp.append("<label for='" + attr.code + "'> "+ attr.label + "</label>" );
	$comp.append("<textarea class='form-control' id='" + attr.code + "' row='" + rowNumber + "'' "+required+">")
	return $comp;
}