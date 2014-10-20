var dateUtils;
injector.process("dateUtils",function(u)
{
	dateUtils=u;
})

var PreAlgoReports=function(){

}

injector.process("BaseController",function(BaseController)
{
	PreAlgoReports.prototype=new BaseController();
})
PreAlgoReports.prototype.render=function(params)
{
	var reportParams=params.split("/");
	var reportName=reportParams[0];
	var reportDate=reportParams[1] || dateUtils.getLastBizDate().format('Y-m-d');
	var $body=this.getBody();
	$body.empty();
	injector.process("widgetManager","templateManager",
		"@preAlgoReportBusiness"
		,function(widgetManager,templateManager,reportBusiness){
			$body.append(templateManager.render("report"));
			var $reportTypeList=$body.find("#reportTypeList");
			var $reportContainer=$body.find("#reportContainer");
			$reportTypeList.empty();
			reportBusiness.showReportTypes(reportName,reportDate,$reportTypeList);
			reportBusiness.showReport(reportName,reportDate,$reportContainer);
	});
}
exports.getInstance=function(){
	return new PreAlgoReports();
}