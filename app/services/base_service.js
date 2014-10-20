var BaseService=function()
{

}

BaseService.prototype._onsuccess=function()
{
	console.log("success");
}

BaseService.prototype._onfailed=function()
{
	console.error("failed");
}

BaseService.prototype.success=function(fn)
{
	this._onsuccess=fn;
	return this;
}
BaseService.prototype.failed=function(fn)
{
	this._onfailed=fn;
	return this;
}

exports.BaseService=BaseService;