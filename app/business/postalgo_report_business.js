var PostAlgoReportBusiness=function()
{

}
PostAlgoReportBusiness.prototype.showReport=function(reportName,reportDate,$reportContainer)
{

	var that=this;
	injector.process("widgetManager","@reportService","notifier","loadBar",function(widgetManager,service,notifier,loadBar){
		$reportContainer.empty();
		loadBar.show();
		service.getData("post",reportName,reportDate).success(function(tableData){
			loadBar.hide();
			widgetManager.append($reportContainer,"dataTable",{
				columns : tableData.columns,
				values: tableData.data
			});
		}).failed(function(error){
			loadBar.hide();
			$reportContainer.append("<h4 class='text-warning'>No data available</h4>");
			notifier.error("Can't get the table data due to "+error);
		});
	});
}
PostAlgoReportBusiness.prototype.showReportTypes=function(reportName,reportDate,$reportTypeContainer)
{
	var that=this;
	injector.process("reportTypes","stringUtils","dateUtils",function(reportTypes,stringUtils,dateUtils){
		var reportTypes=reportTypes['post-algo'];
		if(stringUtils.isEmptyOrNull(reportName))
		{
			reportName = stringUtils.buildObjectIfStringType(reportTypes[0],function(s){
				return {name: stringUtils.camelToPhrase(s),type: s}
			}).type;
		}
		reportDate=reportDate || dateUtils.getLastBizDate().format('Y-m-d');

		reportTypes.forEach(function(type){
			var typeObj;
			if(typeof type  === "string")
			{
				typeObj={
					name: stringUtils.camelToPhrase(type),
					type: type
				}
			}else
			{
				typeObj = type;
			}
			var activeClass="";
			if(typeObj.type === reportName)
			{
				activeClass = "active";
			}
			$reportTypeContainer.append("<li class='" + activeClass + "'><a href='#!/post-algo-reports/" + typeObj.type + "/" + reportDate + "/'>" + typeObj.name + "</a></li>");
		})
	});

}
exports.PostAlgoReportBusiness=PostAlgoReportBusiness;