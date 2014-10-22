var EventManager=function(){
	this.eventMap={};
}
EventManager.prototype.append=function(scope,eventName,Fn, target){
	if(!!!this.eventMap[scope])
	{
		this.eventMap[scope]={};
	}
	if(!!!this.eventMap[scope][eventName])
	{
		this.eventMap[scope][eventName]=[];
	}
	var eventArr=this.eventMap[scope][eventName];
	eventArr.push({
		fn : Fn,
		target : target
	});
}
EventManager.prototype.on=function(scope,eventName,Fn, target){
	if(!!!this.eventMap[scope])
	{
		this.eventMap[scope]={};
	}
	this.eventMap[scope][eventName]=[{
		fn : Fn,
		target : target
	}];
}
EventManager.prototype.bind=function(scope,eventName,Fn,target)
{
	this.on(scope,eventName,Fn,target);
}
EventManager.prototype.unbind=function(scope,eventName)
{
	if(!!!this.eventMap[scope])
	{
		this.eventMap[scope]={};
	}
	this.eventMap[scope][eventName]=[];
}

EventManager.prototype.hasBind=function(scope,eventName)
{
	if(!!!this.eventMap[scope])
	{
		this.eventMap[scope]={};
	}
	if(typeof this.eventMap[scope][eventName] === "undefined" ||
		this.eventMap[scope][eventName] === null ||
		this.eventMap[scope][eventName].length === 0)
	{
		return false;
	}else
	{
		return true;
	}
}

EventManager.prototype.trigger=function(scope,eventName,parameters)
{
	if(!!!this.eventMap[scope])
	{
		this.eventMap[scope]={};
	}
	if(!!!this.eventMap[scope][eventName])
	{
		this.eventMap[scope][eventName]=[];
	}
	var evtArr=this.eventMap[scope][eventName];
	for(var i=0;i<evtArr.length;i++)
	{
		var evt=evtArr[i];
		var target=evt.target || this;
		var ret=evt.fn.call(target,eventName,parameters);
	}
}

exports.getInstance=function()
{
	return new EventManager();
}