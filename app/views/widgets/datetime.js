exports.render=function(attr)
{
	var $comp=$("<div class='form-group'>");
	var required=attr.required || "";
	$comp.append("<label for='" + attr.code + "'> "+ attr.label + "</label>" );

	var type=attr.subType || "date";

	$comp.append("<input type='" + type + "' class='form-control' id='" + attr.code + "' placeholder='" + attr.label + "' "+required+">")
	return $comp;
}