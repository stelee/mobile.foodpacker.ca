//categoriesController
var Ctrl=function(){

}

injector.process("BaseController",function(BaseController)
{
	Ctrl.prototype=new BaseController();
})

Ctrl.prototype.render=function(params)
{
	var that=this;
	var $body=this.getBody();
	var categoryCode=params;
	$body.empty();
	var $categoriesMenu=$("<div style='display:none' id='slideMenu'></div><button id='slideMenuHandler' type='button'  class='btn btn-primary'>"+ _l("Choose the category") + "</button>");

	$body.append($categoriesMenu);
	$body.append("<div id='product_list' style='margin-top:10px'>");
	
	injector.process("@categoriesBusiness","widgetManager","@productsBusiness","templateManager",
		function(categoriesBusiness,widgetManager,productsBusiness,templateManager){
		//show the all list of the params
		categoriesBusiness.list().then(function(data){
			//TODO: not append to body, append to slide toggle

			$("#slideMenuHandler").click(function(){
				$("#slideMenu").slideToggle();
			})
			widgetManager.append($("#slideMenu"),"listGroup",{
				items: data,
				style: 'margin-bottom: 0px',
				renderItem: function(item)
				{
					var active="";
					if(item.code == categoryCode)
					{
						active= "active";
					}
					var $ret=$("<a href='/#!/products/categories/" + item.code + "' class='list-group-item " + active + "'>\
							<div class='pull-left' style='padding-right: 15px;'>\
							<img src='" + item.icon + "' width='64px' height='64px'/>\
	    					</div>\
							 <div class='media-body'>\
							 	<h4 class='list-group-item-heading'>" + item.name + "</h4>\
								<p class='list-group-item-text'>" + item.description + "</p>\
							</div>\
							<div style='clear:both'></div>\
							</a>");
					return $ret;
				}
			});
		});
		productsBusiness.getProductsByCategory(categoryCode).then(function(products){
			var data={
				products : products
			};
			$("#product_list").append(templateManager.render("product_list",data));
		})
		//show the product list of special category based on the params
	});
}

exports.getInstance=function(){
	return new Ctrl();
}