var Cart=function(){

}

injector.process("BaseController",function(BaseController)
{
	Cart.prototype=new BaseController();
})

Cart.prototype.render=function(){
	var that=this;
	this.getBody().empty();
	injector.process('templateManager','Cart','notifier',function(templateManager,Cart,notifier){
		var cart=Cart.getOnlyInstance();
		var items=cart.getItems();
		var data={
			items: items,
			refresh_text: _l("Refresh"),
			checkout_text: _l("Checkout"),
			back_text: _l("Back")
		}
		that.getBody().append(templateManager.render("cart",data));
		//bind all function
		//update the qty
		$(".qtyInput").on("change",function(){
			var newQty=Number($(this).val())
			var productId=$(this).attr("data-productid");
			if(isNaN(newQty))
			{
				notifier.error(_l("Not a valid number"));
				return;
			}
			cart.updateQty(productId,newQty);
		});
		//delete the item
		$(".deleteLink").on("click",function(){
			var $target=$(this);
			notifier.confirm(_l("Are you sure to delete the item?"),function(){
				var productId=$target.attr("data-productid");
				cart.delete(productId);
				$target.parent().parent().remove();
			},function(){});
		})
	});
}

exports.getInstance=function(){
	return new Cart();
}