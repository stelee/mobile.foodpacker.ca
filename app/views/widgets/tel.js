var Tel=function(attr)
{
	this.attrs=attr;
	var $comp=$("<div class='form-group'>");
	var required=attr.required || "";
	$comp.append("<label for='" + attr.code + "'> "+ attr.label + "</label>" );
	var $input=$("<input type='tel' class='form-control' id='" + attr.code + "' placeholder='" + attr.label + "' "+required+">");
	$comp.append($input);
	$input.data("validate",function(value){
		if(value === "")
		{
			return true;
		}
		var re = /^(\([0-9]{3}\)\s?|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    	return re.test(value);
	});
	this.$comp=$comp;
}
injector.process("baseWidget",function(base){
	Tel.prototype=base;
})
exports.render=function(attr)
{
	return new Tel(attr).getComp();
}