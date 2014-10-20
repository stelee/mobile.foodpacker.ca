var ProgressBar=function()
{

}
ProgressBar.prototype.show=function()
{
	$("div.loading").remove();
	var $progress=$("<div class='loading'>\
		<i class='fa fa-2x fa-spinner fa-spin'></i>\
		<span>loading...</span>\
		</div>");
	$progress.appendTo("body");
}
ProgressBar.prototype.hide=function()
{
	$("div.loading").remove();
}

exports.getInstance=function()
{
	return new ProgressBar();
}