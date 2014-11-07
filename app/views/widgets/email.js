var Email=function(attr)
{
	this.attrs=attr;
	var $comp=$("<div class='form-group'>");
	var required=attr.required || "";
	$comp.append("<label for='" + attr.code + "'> "+ attr.label + "</label>" );
	var $input=$("<input type='email' class='form-control' id='" + attr.code + "' placeholder='" + attr.label + "' "+required+">");
	$comp.append($input);
	$input.data("validate",function(value){
		if(value  === "") return true;
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(value);
	});
	if(attr.onChange)
	{
		$input.on('change',attr.onChange);
	}
	this.$comp=$comp;
}
injector.process("baseWidget",function(base){
	Email.prototype=base;
})
exports.render=function(attr)
{
	return new Email(attr).getComp();
}