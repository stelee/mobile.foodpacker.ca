var BaseReport=function(rItem)
{
	this.rItem=rItem; //report meta data item
}

//with Traits
injector.process("TraitsObjectStatusSupport",function(traits){
	mixin(BaseReport,traits);
})

BaseReport.prototype.run=function()
{
	debugger;
	this._setStatusFailed("Not implemented yet");
	return this;
}

exports.BaseReport=BaseReport;