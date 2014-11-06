var Input=function(attr)
{
	this.attr=attr;

	var $comp=$("<div class='form-group'>");
	var required=attr.required || "";
	var value=attr.value || "";
	$comp.append("<label for='" + attr.code + "'> "+ attr.label + "</label>" );
	var $input=$("<input type='text' class='form-control' id='" + attr.code + "' placeholder='" + attr.label + "' "+required+" value='" + value + "'>");
	if(attr.autocomplete)
	{
		$input.autocomplete(attr.autocomplete);
	}
	$comp.append($input);
	if(attr.onChange)
	{
		$input.on('change',attr.onChange);
	}
	this.$comp= $comp;
}
injector.process("BaseWidget",function(BaseWidget){
	Input.prototype=new BaseWidget();
})
exports.render=function(attr)
{
	return new Input(attr).getComp();
}