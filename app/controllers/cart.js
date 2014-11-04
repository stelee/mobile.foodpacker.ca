var prepare=require('./libs/_l').prepare;
var Cart=function(){

}

injector.process("BaseController",function(BaseController)
{
	Cart.prototype=new BaseController();
})

Cart.prototype.render=function(param)
{
	if(param === "checkout")
	{
		this.render_checkout();
	}else
	{
		this.render_cart();
	}
}

Cart.prototype.render_checkout=function()
{
	var that=this;
	this.getBody().empty();
	injector.process('templateManager','Cart','notifier','FormGenerator',
	function(templateManager,Cart,notifier,FormGen){
		var formGen=FormGen.getInstance();
		var cart=Cart.getOnlyInstance();
		var items=cart.getItems();
		var data={
			items: items,
		}

		//add text
		prepare(data,"location_type_text","Location Type");
		prepare(data,"new_address_text","New Address");
		prepare(data,"my_current_address_text","My Current Address");
		prepare(data,"security_info_text","The credit card information will be stored in your local device and will be protected by PIN number that you set");
		prepare(data,"cart_text","Cart");
		prepare(data,"submit_text","Submit");
		prepare(data,"back_text","Back");

		that.getBody().append(templateManager.render("checkout",data));

		var $address_form=$("#address_form");
		formGen.generate({
			label: "Steet Line 1",
			type: "input",
			code: "addressline1"	
		},{
			label: "Steet Line 2",
			type: "input",
			code: "addressline2"	
		},
		{
			label: "City",
			type: "input",
			code: "city"	
		},
		{
			label: "Province",
			type: "input",
			code: "province"	
		},
		{
			label: "Postalcode",
			type: "input",
			code: "postalcode"	
		}
		).appendTo($address_form);

	});
}

Cart.prototype.render_cart=function(){
	var that=this;
	this.getBody().empty();
	injector.process('templateManager','Cart','notifier',function(templateManager,Cart,notifier){
		var cart=Cart.getOnlyInstance();
		var items=cart.getItems();
		var data={
			items: items,
			refresh_text: _l("Refresh"),
			checkout_text: _l("Checkout"),
			back_text: _l("Back"),
			total_text: _l("Total")
		}
		that.getBody().append(templateManager.render("cart",data));
		that.refreshTotal();
		//bind all function
		//update the qty
		$(".qtyInput").on("change",function(){
			var newQty=Number($(this).val())
			var productId=$(this).attr("data-productid");
			if(isNaN(newQty) || newQty<=0)
			{
				notifier.error(_l("Not a valid number"));
				$(this).val(1);
				return;
			}
			cart.updateQty(productId,newQty);
			that.refreshTotal();
		});
		//delete the item
		$(".deleteLink").on("click",function(){
			var $target=$(this);
			notifier.confirm(_l("Are you sure to delete the item?"),function(){
				var productId=$target.attr("data-productid");
				cart.delete(productId);
				$target.parent().parent().remove();
				that.refreshTotal();
			},function(){});
		})
		//checkout
		$("#checkoutBtn").on("click",function(e){
	
			if($("#total_price").text() === "0")
			{
				notifier.error(_l("Your shopping cart is still empty"));
				window.location.href="#!/products/categories/";
			}else
			{
				window.location.href="#!/cart/checkout";
			}
			e.preventDefault();
		})
	});
}

Cart.prototype.refreshTotal=function()
{
	if($('.qtyInput').length ===0)
	{
		$("#total_price").text(0);
		return;
	}
	var total=$('.qtyInput').map(
		function(elem){return $(this).val() * $(this).attr('data-unitprice')}
		)
	.toArray()
	.reduce(function(a,b){a+b});
	$("#total_price").text(total);
}
exports.getInstance=function(){
	return new Cart();
}