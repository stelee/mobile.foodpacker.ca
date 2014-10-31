var Cart=function(){

}

injector.process("BaseController",function(BaseController)
{
	Cart.prototype=new BaseController();
})

Cart.prototype.render=function(){
	var that=this;
	this.getBody().empty();
	injector.process('templateManager','Cart',function(templateManager,Cart){
		var cart=Cart.getOnlyInstance();
		var items=cart.getItems();
		var data={
			items: items,
			product_name_text: _l("Product Name"),
			unit_price_text: _l("Unit Price"),
			qty_text: _l("Qty")
		}
		that.getBody().append(templateManager.render("cart",data));
	});
}

exports.getInstance=function(){
	return new Cart();
}