var isNull=require("./libs/null").isNull;
var BaseWidget=function()
{
	this.$comp=null;
}
BaseWidget.prototype.getComp=function()
{
	if(this.attrs) this.setVal(this.attrs.value);
	return this.$comp;
}
BaseWidget.prototype.setVal=function(value)
{
	if(isNull(value))
	{
		return;
	}
	this.$comp.find("input,textarea,select").val(value);
}

exports.BaseWidget=BaseWidget;

exports.getInstance=function()
{
	return new BaseWidget();
}
