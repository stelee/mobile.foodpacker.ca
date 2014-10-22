var language=null //this is the simple and multiple language ready
var languageMap=null;
exports.Lang=function()
{
	if(language === null)
	{
		injector.process("storage",function(storage){
			language=storage.getSystem("language") || "en";
		})
		languageMap=require('./i18n/'+language).map;
	}
	
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