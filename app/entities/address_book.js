var Nil=require("./libs/null");
var AddressBook=function()
{
	this.data=[];
	var that=this;
	injector.process("storage",function(storage){
		that.storage=storage;
	});
}

AddressBook.prototype.removeByIndex=function(index)
{
	this.data=this.data.filter(function(e,i){return i!=index});
	this.storage.set("address_book",this.data);
}

AddressBook.prototype.getItems=function(){
	return this.data;
}
AddressBook.prototype.put=function(data)
{
	var name=data.name;

	if(Nil.isEmpty(name))
	{
		name=data.addressline1;
		data.name=addressline1;
	}

	for(var i=0;i<this.data.length;i++)
	{
		if(this.data[i].name === name)
		{
			//update
			this.data[i]=data;
			this.storage.set("address_book",this.data);
			return;
		}
	}
	this.data.push(data);
	this.storage.set("address_book",this.data);
}

exports.getOnlyInstance=function()
{
	var instance;
	var storage;
	injector.process("storage",function(s){
		storage=s;
	});
	var data=storage.get("address_book");
	if(!!!data)
	{
		instance=new AddressBook();
		storage.set("address_book",instance.data);
	}else
	{
		instance=new AddressBook();
		instance.data=data;
	}
	return instance;
}