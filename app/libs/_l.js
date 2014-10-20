var language="en" //this is the simple and multiple language ready
var languageMap=require('./i18n/'+language).map;
exports.Lang=function()
{
	var ret=[];
	for(var i=0;i<arguments.length;i++)
	{
		var orig=arguments[i];
		var result=languageMap[orig];
		if(typeof result ==="undefined" || result === null)
		{
			result=orig;
		}
		ret.push(result);
	}
	return ret.join(" ");
}