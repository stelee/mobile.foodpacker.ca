//quickLaunch
var Widget=function(attrs)
{
	this.attrs=attrs;
	var className=attrs.className || "";
	var $comp=$("<div class='quickLaunch " + className + "'>")
	var $ul=$("<ul>");
	attrs.items.forEach(function(item){
		var className=item.className || "";
		var $li=$("<li class='" + item.bgColorClass + " " + className + "'><div><a href='"+ item.url +"'>" + _l(item.name) + "</a></div></li>");
		$li.appendTo($ul);
	})
	$ul.appendTo($comp);
	this.$comp=$comp
}
injector.process("baseWidget",function(base){
	Widget.prototype=base;
})
exports.render=function(attrs)
{
	return new Widget(attrs).getComp();
}