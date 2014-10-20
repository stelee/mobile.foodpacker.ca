var Index=function(){

}

injector.process("BaseController",function(BaseController)
{
	Index.prototype=new BaseController();
})

Index.prototype.render=function(){
	var that=this;
	var $body=this.getBody();
	$body.empty();
	injector.process("widgetManager","eventManager","templateManager","dateUtils",
		function(widgetManager,eventManager,templateManager,dateUtils){
		$body.append(templateManager.render("dashboard"));
		var $datePickerContainer=$body.find("#datePickerContainer");
		var $workspace=$body.find("#workspace");

		widgetManager.append($datePickerContainer,"datePicker",{
			onSelect: function(dateText)
			{
				eventManager.trigger(document,"fetch-overall-reports",{date: dateText});
			},
			maxDate: -1
		});
		eventManager.bind(document,"fetch-overall-reports",function(evt,params){
			var date=params.date;
			that.updateByDate($workspace,date);
		})

		//auto refresh the report of last business day
		var lastBizDate=dateUtils.getLastBizDate();
		that.updateByDate($workspace,lastBizDate.format("Y-m-d"));

		//bindin the event for the tab in the dashboard

		$body.find("#reportTypeList").find("a").on('click',function(evt){
			var $link=$(evt.target);
			$body.find("#reportTypeList > li").removeClass("active");
			$link.parent().addClass("active");
			var tabIndex=$link.attr("tab-index");
			$("#reportContainer").find("div[tab-index]").addClass('hidden')
			$("#reportContainer").find("div[tab-index=" + tabIndex + "]").removeClass('hidden')
			if(tabIndex === "1")
			{
				var d3ExceptionTrendChart=d3.select("#exceptionTrendChart");
				injector.process("@dashBoardReportBusiness",function(business){
					business.exceptionTrendChart(d3ExceptionTrendChart);
				})
			}
		})
	});

}


Index.prototype.updateByDate=function($workspace,date)
{
	$workspace.find("#reportDate").text(date);
	var $preAlgoReportContainer=$workspace.find("#preAlgoReports");
	var $postAlgoReportContainer=$workspace.find("#postAlgoReports");
	var d3SummaryBalanceSheetChart=d3.select("#summaryBalanceSheetChart");
	injector.process("@dashBoardReportBusiness",function(business){
		business.updateByDate($preAlgoReportContainer,$postAlgoReportContainer,date);
		business.summaryBalanceChart(d3SummaryBalanceSheetChart,date);
	})
}

exports.getInstance=function(){
	return new Index();
}