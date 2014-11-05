var isNull=require("./libs/null").isNull;

var Generator=function()
{
	//dependencies
	var that=this;
	injector.process("widgetManager","eventManager","formValidator","notifier",
	function(widgetManager,eventManager,formValidator,notifier){
		that.widgetManager=widgetManager;
		that.eventManager=eventManager;
		that.formValidator=formValidator;
		that.notifier=notifier;
	})
}

Generator.prototype.getSubmitBtnText=function()
{
	return "Submit";
}

Generator.prototype.bind=function(identifier, fn)
{
	if(identifier === "verified")
	{
		this.onVerified=fn;
	}else if(identifier === "failed")
	{
		this.onFailed=fn;
	}
}

Generator.prototype.onVerified=function(data)
{
	this.notifier.success("done");
}

Generator.prototype.onFailed=function(ret)
{
	this.notifier.error(ret.description);
	$(ret.target).parent().addClass("has-error")
}

Generator.prototype.generate=function()
{
	var that=this;
	var $container=$("<div>");
	$form = this.widgetManager.append($container,"form");
	for(var i=0;i<arguments.length; i++)
	{
		var field=arguments[i];
		if(isNull(field.label))
		{
			field.label=field.type[0].toUpperCase() + field.type.slice(1);
		}
		this.widgetManager.append($form,field.type,field);
	}
	this.widgetManager.append($form,"button",{label:that.getSubmitBtnText(),code : "submit",type: "submit",onclick:function(){
		var validator=that.formValidator;
		var notifier=that.notifier;

		var $form=$(this).parent("[role=form]");
		validator.resetErrorClass($form);
		var ret=validator.simpleValidate($form);
		if(ret.success)
		{
			that.onVerified(ret.data);
		}else
		{
			that.onFailed(ret);
		}
	}});
	return $container;
}

exports.getInstance=function()
{
	return new Generator();
}
