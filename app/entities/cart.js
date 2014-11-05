var Cart=function()
{
	var that=this;
	this.data={};
	injector.process("storage",function(storage){
		that.storage=storage;
	});
}

Cart.prototype.getItems=function(){
	var itemArray=new Array();
	for(key in this.data)
	{
		var entity=this.data[key];
		var obj={
			key: key,
			product_id: entity.product.product_id,
			name: entity.product.name,
			qty: entity.qty,
			unit_price: entity.product.price,
			currency: entity.product.currency,
			cover: entity.product.cover
		};

		itemArray.push(obj);
	}
	return itemArray;
}

Cart.prototype.updateQty=function(productId, qty)
{
	for(key in this.data)
	{
		var entity=this.data[key];
		if(String(entity.product.product_id) === String(productId))
		{
			entity.qty=qty;
			this.storage.set("cart",this.data);
			return;
		}
	}
}

Cart.prototype.delete=function(productId)
{
	for(key in this.data)
	{
		var entity=this.data[key];
		if(String(entity.product.product_id) === String(productId))
		{
			delete this.data[key];
			this.storage.set("cart",this.data);
			return;
		}
	}
}

Cart.prototype.put=function(product,newQty)
{
	if(newQty === 0)
		return;
	var key="_"+String(product.product_id);
	var p=this.data[key]; //the id must be convert to string type
	newQty = newQty || 1;
	if(typeof p === 'undefined')
	{
		this.data[key]={
			product : product,
			qty: Number(newQty)
		};
	}else
	{
		this.data[key].qty+= Number(newQty);
	}
	this.storage.set("cart",this.data);
}

exports.getOnlyInstance=function()
{
	var cart;
	var storage;
	injector.process("storage",function(s){
		storage=s;
	});
	var data=storage.get("cart");
	if(!!!data)
	{
		cart=new Cart();
		storage.set("cart",cart.data);
	}else
	{
		cart=new Cart();
		cart.data=data;
	}

	return cart;
}