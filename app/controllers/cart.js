var prepare=require('./libs/_l').prepare;
var Null=require('./libs/null');
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
	injector.process('templateManager','Cart','notifier','FormGenerator','storage',
	function(templateManager,Cart,notifier,FormGen,storage){
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
		prepare(data,"security_info_text","The credit card information will be stored in your local device and will be protected by cvv2 of your card");
		prepare(data,"cart_text","Cart");
		prepare(data,"submit_text","Submit");
		prepare(data,"back_text","Back");

		that.getBody().append(templateManager.render("checkout",data));
		that.buildAddressPanel();
		that.buildPaymentPanel();

		$("#doCheckoutBtn").on('click',function(evt){
			//verify
			injector.process("formValidator","notifier","Creditcard","checkoutService",
			function(validator,notifier,Creditcard,checkoutService){
				var $form=$("#checkout").find("[role=form]");
				validator.resetErrorClass($form);
				var ret=validator.simpleValidate($form);
				if($("#cvv").val() === "")
				{
					ret.success=false;
					ret.description=_l("Please input the security code(cvv2) number");
				}

				if(ret.success)
				{
					if(ret.data.card_number.indexOf("************")===0)
					{
						ret.data.card_number=Creditcard.getOnlyInstance().getItem().card_number;
					}
					checkoutService.send(ret.data,function(){
						notifier.success(_l("Place order successfully"));
						window.location.href="#!/"
					})
				}else
				{
					notifier.error(ret.description);
					$(ret.target).parent().addClass("has-error")
				}
			})

			
			evt.preventDefault();
		})

	})
}
Cart.prototype.buildPaymentPanel=function()
{
	var that=this;
	var data;
	injector.process("Creditcard",function(Creditcard){
		data=Creditcard.getOnlyInstance().getItem();
	});
	injector.process('FormGenerator','notifier',
	function(FormGen,AddressBook,notifier){
		var formGen=FormGen.getInstance();
		var $payment_form=$("#payment_form");
		formGen.getSubmitBtnText=function()
		{
			return " <span class='glyphicon glyphicon-floppy-disk myicon'></span> ";
		};
		formGen.onVerified=function(data)
		{
			var that=this;
			injector.process("Creditcard",function(Creditcard){
				var ab=Creditcard.getOnlyInstance();
				delete data['cvv'];

				if(data.card_number.indexOf("************")===0)
				{
					data.card_number = ab.getItem().card_number;
				}

				ab.put(data);
				that.notifier.success(_l("Saved successfully"));
			})
		};
		formGen.generate({
			label: _l("Card Number"),
			type: "input",
			code: "card_number",
			required: "required",
			value: that.mask(data.card_number)
		},{
			label: _l("Name"),
			type: "input",
			code: "name",
			required: "required",
			value: data.name
		},{
			label: _l("Expiry Month"),
			type: "select",
			code: "expiry_month",
			required: "required",
			value: data.expiry_month,
			options:[
			{value: "01", text: "January(01)"}
			,{value: "02", text: "February(02)"}
			,{value: "03", text: "March(03)"}
			,{value: "04", text: "April(04)"}
			,{value: "05", text: "May(05)"}
			,{value: "06", text: "June(06)"}
			,{value: "07", text: "July(07)"}
			,{value: "08", text: "August(08)"}
			,{value: "09", text: "September(09)"}
			,{value: "10", text: "October(10)"}
			,{value: "11", text: "November(11)"}
			,{value: "12", text: "December(12)"}
			]
		},
		{
			label: _l("Expiry Year"),
			type: "select",
			code: "expiry_year",
			required: "required",
			value: data.expiry_year,
			options:[
			"14","15","16","17","18","19","20","21","22","23","24"
			]
		},
		{
			label: _l("Card Security Code (CVV2)"),
			type: "password",
			code: "cvv"
		}).appendTo($payment_form);
	});
}

Cart.prototype.mask=function(cardNumber)
{
	if(Null.isEmpty(cardNumber))
	{
		return "";
	}else
	{
		return "************"+cardNumber.substr(-3);
	}
	
}

Cart.prototype.buildAddressPanel=function()
{
	var that=this;
	//add option for address option
	injector.process("AddressBook",function(AddressBook){
		var ab=AddressBook.getOnlyInstance();
		var items=ab.getItems();
		items.forEach(function(item,index){
			$("#locationType").append("<option value='"+index+"'> " + item.name + "</option>")
		});
		$("#locationType").on("change",function(){
			var val=$(this).val();
			if(val==="new")
			{
				that.showAddressForm();
			}else if(val ==="auto")
			{
				that.showCurrentLocation()//auto detect the location
			}else
			{
				that.showAddressForm(items[val]);
			}
		})
	});	
	that.showAddressForm();
}
Cart.prototype.showCurrentLocation=function()
{
	navigator.geolocation.getCurrentPosition(function(position){
		var latitude=position.coords.latitude;
		var longitude=position.coords.longitude;
		var $address_form=$("#address_form");
		$address_form.empty();
		$address_form.append('<center><iframe width="240" height="240" frameborder="0" style="border:0"\
src="https://www.google.com/maps/embed/v1/place?zoom=12&q=loc:' + latitude +'+' + longitude + '&key=AIzaSyAmltswG-ygaXzheglI-yodGtAoAwUs5c0"></iframe></center>');
		
		injector.process("FormGenerator","storage",function(FormGen,storage){
			var data=storage.get("defaultValue") || {};
			var generator=FormGen.getInstance();
			generator.hasSubmitButton=false;
			generator.generate({
				label: _l("Receiver"),
				type: "input",
				code: "receiver",
				required: "required",
				value: data.receiver,
				onChange: function(){
					data.receiver=$(this).val();
					storage.set("defaultValue",data)
				}
			},
			{
				label: _l("Phone"),
				type: "tel",
				code: "phone",
				required: "required",
				value: data.phone,
				onChange: function(){
					data.phone=$(this).val();
					storage.set("defaultValue",data)
				}
			},
			{
				label: _l("Email"),
				type: "email",
				code: "email",
				required: "required",
				value: data.email,
				onChange: function(){
					data.email=$(this).val();
					storage.set("defaultValue",data)
				}
			}).appendTo($address_form)
		})
	});
}

Cart.prototype.showAddressForm=function(data)
{
	data=data || {};
	injector.process('FormGenerator','AddressBook','notifier',
	function(FormGen,AddressBook,notifier){
		var formGen=FormGen.getInstance();
		var $address_form=$("#address_form");
		$address_form.empty();
		formGen.getSubmitBtnText=function()
		{
			return " <span class='glyphicon glyphicon-floppy-disk myicon'></span> ";
		};
		formGen.onVerified=function(data)
		{
			var that=this;
			injector.process("AddressBook",function(AddressBook){
				var ab=AddressBook.getOnlyInstance();
				ab.put(data);
				that.notifier.success(_l("Saved successfully"));
			})
		};
		formGen.generate({
			label: _l("Address Name(home, work,etc)"),
			type: "input",
			code: "name",
			value: data.name
		},
		{
			label: _l("Receiver"),
			type: "input",
			code: "receiver",
			required: "required",
			value: data.receiver
		},
		{
			label: _l("Phone"),
			type: "tel",
			code: "phone",
			required: "required",
			value: data.phone
		},
		{
			label: _l("Email"),
			type: "email",
			code: "email",
			required: "required",
			value: data.email
		},
		{
			label: _l("Steet Line 1"),
			type: "input",
			code: "addressline1",
			required: "required",
			value: data.addressline1
		},{
			label: _l("Steet Line 2"),
			type: "input",
			code: "addressline2",
			value: data.addressline2
		},
		{
			label: _l("City"),
			type: "input",
			code: "city",
			required: "required",
			value: data.city
		},
		{
			label: _l("Province"),
			type: "input",
			code: "province",
			required: "required",
			value: data.province
		},
		{
			label: _l("Postalcode"),
			type: "input",
			code: "postalcode",
			required: "required",
			value: data.postalcode	
		},
		{
			label: ' <span class="glyphicon glyphicon-trash myicon"></span> ',
			type: "button",
			onclick:function(){
				var index=$("#locationType").val();
				if(index === "new" || index === "auto")
				{
					return;//do nothing
				}else
				{
					notifier.confirm(_l("Are you sure to delete the item?"),function(){
						AddressBook.getOnlyInstance().removeByIndex(index);
						window.location.reload();
					});
				}
			}
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
	.reduce(function(a,b){return a+b});
	$("#total_price").text(total);
}
exports.getInstance=function(){
	return new Cart();
}