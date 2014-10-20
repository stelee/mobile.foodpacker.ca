var Password=function(attrs)
{
	var $comp=$("<div class='form-group'>");
	var required=attrs.required || "";
	var value=attrs.value || "";
	$comp.append("<label for='" + attrs.code + "'> "+ attrs.label + "</label>" );
	$comp.append("<input type='password' class='form-control' id='" + attrs.code + "' placeholder='" + attrs.label + "' "+required+" value='" + value + "'>")
	this.$comp=$comp;
}
injector.process("baseWidget",function(base){
	Password.prototype=base;
})
exports.render=function(attrs)
{
	return new Password(attrs).getComp();
}