//quickLaunch
var Widget=function(attrs)
{
	this.attrs=attrs;
	var $comp=$("<div class='quickLaunch'>")
	var $ul=$("<ul>");
	attrs.items.forEach(function(item){
		var $li=$("<li class='" + item.bgColorClass + "'><div><a href='"+ item.url +"'>" + _l(item.name) + "</a></div></li>");
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