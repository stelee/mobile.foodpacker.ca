var mock={
	"pre" : {
		"contract" : {
			columns: ["SeId","Price","Cold","Bargainref","Cls_GBP","Rate"],
			data: [
			[11111,12334,"AAAAAA","BBBBB","CCCCCC","23.415"],
			[11112,12338,"AAAAAA","BBBBB","CCCCCC","23.415"],
			[11113,12399,"AAAAAA","BBBBB","CCCCCC","23.415"]
			]
		}
	},
	"post" :{

	}
}

var ReportService=function()
{

}
//with Traits
injector.process("TraitsObjectStatusSupport",function(traits){
  mixin(ReportService,traits);
});

ReportService.prototype.getData=function(prefix,reportType,reportDate)
{
	//mock the access to the remote service
	var that=this;
	setTimeout(function(){
		if(mock[prefix][reportType])
		{
			that._setStatusSuccess(mock[prefix][reportType]);
		}else
		{
			that._setStatusFailed("report not implemeted");
		}
	},500)
	return this;
}


exports.ReportService=ReportService;