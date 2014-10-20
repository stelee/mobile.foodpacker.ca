exports.stringUtils={
	"camelToPhrase" : function(str)
	{
		var regex=/((^[a-z0-9][a-z0-9]*)|([A-Z0-9][a-z0-9]*))/g
		var m=str.match(regex)
		if(m === null)
			return str;
		return m.map(function(s,index)
			{
				if(index === 0)
					return s.substring(0,1).toUpperCase()+s.substring(1)
				else
					return s.substring(0,1).toLowerCase()+s.substring(1)
			}
		).join(" ");
	},
	"isEmptyOrNull" : function(str)
	{
		if(typeof str === "undefined" || str === null || str === "")
			return true;
		else
			return false;
	},
	"buildObjectIfStringType" : function(obj,fnConstruct)
	{
		if(typeof obj === "string")
		{
			return fnConstruct(obj);
		}else
		{
			return obj;
		}
	}
}