var path=require('./libs/path');
exports.mergeOptionsWithDefault=function(attrs)
{
	this.options=path.walk(this._options,function(val,propPath)
	{
		var attrsVal=path.path(attrs,propPath);
		if(attrsVal === null)
		{
			return val;
		}else
		{
			return attrsVal;
		}
	})
}