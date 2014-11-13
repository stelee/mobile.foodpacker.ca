var Null=require('./libs/null');

var Product=function()
{
	this.product=null;
}
injector.process("BaseController",function(BaseController)
{
	Product.prototype=new BaseController();
});

Product.prototype.render=function(params)
{
	var that=this;
	var $body=this.getBody();
	$body.empty();
	var productId=params;
	if(Null.isEmpty(productId))
	{
		$body.append(_l("<h3>","You have to specify a valid product id","</h3>"));
		return;
	}
	injector.process("@productsBusiness","templateManager","eventManager",function(productsBusiness,templateManager,eventManager){
		productsBusiness.getProduct(productId).then(function(product){
			product.price_text=_l("Price");
			product.stock_text=_l("Stock");
			product.description_text=_l("Description");
			product.buy_text=_l("Buy");
			product.qty_text=_l("Qty");
			product.back_text=_l("< Go back")
			if(Null.isNotNull(product.special_price))
			{
				product.price_amount="<del class='del'>" + product.price + "</del> <span class='good_deal'>" + product.special_price +"</span>";
			}else if(Null.isNotNull(product.discount_price))
			{
				product.price_amount="<del>" + product.price + "</del><span class='good_deal'>" + product.discount_price +"</span>";
			}else
			{
				product.price_amount = product.price;
			}

			$body.append(templateManager.render("product",product));
			that.product=product;
			that.initEvent(eventManager);
		});
	})
}
Product.prototype.initEvent=function(eventManager)
{
	var that=this;
	eventManager.bind(document,"changeCover",function(evt,data){
		var src=data.target.attr("src");
		$("#product_cover").attr("src",src);
	})
	eventManager.bind(document,"buy",function(evt, data){
		injector.process("storage","notifier","Cart",function(storage,notifier,Cart){
			var cart=Cart.getOnlyInstance();
			cart.put(data.product,data.qty);
			if(cart.error)
			{
				notifier.error(error);
			}else
			{
				notifier.success("Successfully put to the shopping cart");
			}
		})
	})
	$(".coverChangeBtn").on('click',function()
	{
		eventManager.trigger(document,"changeCover",{target : $(this)});
	})
	$("#buyBtn").on('click',function(){
		var qty=$("#qtyInput").val();
		eventManager.trigger(document,"buy",{
			product:that.product,
			qty: qty
		})
	})
}
exports.getInstance=function(){
	return new Product();
}