var Base;
injector.process("BaseReport",function(BaseReport)
{
	Base=BaseReport;
})
var ClientReport=function()
{
	Base.apply(this,arguments);
}
ClientReport.prototype=new Base();
module.exports=ClientReport;