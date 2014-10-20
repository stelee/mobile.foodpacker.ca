var path;
injector.process("path",function(m){
	path=m;
})
var DatePicker=function(attr)
{
	this.attr=attr;
	var dateFormat=path.getValue(this,"attr.dateFormat","yy-mm-dd");
	var fnOnSelect=path.getValue(this,"attr.onSelect",function(dateText){
		console.log("the date is "+dateText);
	})
	var maxDate=path.getValue(this,"attr.maxDate",999);

	var $comp=$("<div class='form-group left'>");
	var $datepicker=$("<div>");
	$comp.append($datepicker);
	$datepicker.datepicker({
		onSelect: fnOnSelect,
		dateFormat: dateFormat,
		maxDate: maxDate
	});
	this.$comp=$comp;
}
injector.process("@baseWidget",function(base){
	DatePicker.prototype=base;
})

exports.render=function(attr)
{
	return new DatePicker(attr).getComp();
}