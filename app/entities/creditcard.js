var Nil=require("./libs/null");
var Credicard=function()
{
	this.data=[];
	var that=this;
	injector.process("storage",function(storage){
		that.storage=storage;
	});
}

Credicard.prototype.remove=function(index)
{
	this.storage.remove("credicard");
}

Credicard.prototype.getItem=function(){
	return this.data;
}
Credicard.prototype.put=function(data)
{
	this.data=data;
	this.storage.set("credicard",this.data);
}

exports.getOnlyInstance=function()
{
	var instance;
	var storage;
	injector.process("storage",function(s){
		storage=s;
	});
	var data=storage.get("credicard");
	if(!!!data)
	{
		instance=new Credicard();
		storage.set("credicard",instance.data);
	}else
	{
		instance=new Credicard();
		instance.data=data;
	}
	return instance;
}