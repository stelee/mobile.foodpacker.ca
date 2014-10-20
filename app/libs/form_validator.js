var Bools=require('./libs/bools').Bools;
var _L=require('./libs/_l').Lang;

var FormValidator=function()
{

}

FormValidator.prototype.simpleValidate=function($form)
{
	var formCtrlArr=$form.find("input,textarea,select")
	var ret={
		success: true,
		data: {}
	}
	for(var i=0;i<formCtrlArr.length;i++)
	{
		var formCtrl=formCtrlArr[i]; 
		var $formCtrl=$(formCtrl);//warp with jquery
		if(Bools($formCtrl.attr("required")) && $formCtrl.val() === "")
		{
			ret.success = false;
			ret.description=_L("You must fill the required field");
			ret.target=$formCtrl;
			return ret;
		}
		var validateFn=$formCtrl.data("validate");
		if(typeof validateFn === "function")
		{
			if(validateFn.call(formCtrl,$formCtrl.val()) === false)
			{
				ret.success = false;
				ret.description=_L("The value for the field is not valid");
				ret.target=$formCtrl;
				return ret;
			}
		}
		ret.data[$formCtrl.attr("id")] = $formCtrl.val();
	}
	return ret;
}
FormValidator.prototype.resetErrorClass=function($form)
{
	$form.children(".has-error").removeClass("has-error");
}

exports.getInstance=function()
{
	return new FormValidator();
}