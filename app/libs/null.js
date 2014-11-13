var isNull=function(obj){
	 if(typeof(obj)==='undefined')
    {
        return true;
    }
    if(obj===null)
    {
        return true;
    }
    return false;
}

var isNotNull=function(obj)
{
    return !isNull(obj);
}
var isNotEmpty=function(obj)
{
    return !isEmpty(obj);
}

var isEmpty=function(obj)
{
	if(typeof obj === 'string' && obj === "")
    {
        return true;
    }
    if(JSON.stringify(obj) === '{}')
	{
		return true;
	}
	return isNull(obj);
}
exports.isNull=isNull;
exports.isEmpty=isEmpty;
exports.isNotEmpty=isNotEmpty;
exports.isNotNull=isNotNull;