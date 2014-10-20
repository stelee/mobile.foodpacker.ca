var ReportLoader=function()
{

}

ReportLoader.prototype.loadReport=function(rItem)
{
	var ReportClass=require('./reports/'+rItem.id);
	if(!!!ReportClass) return null;
	return new ReportClass(rItem);
}
exports.getInstance=function()
{
	return new ReportLoader();
}