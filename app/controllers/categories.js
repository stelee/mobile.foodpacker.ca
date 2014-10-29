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
	$body.empty();
	
	injector.process("@categoriesBusiness","widgetManager",function(categoriesBusiness,widgetManager){
		//show the all list of the params
		categoriesBusiness.list().then(function(data){
			//TODO: not append to body, append to slide toggle
			widgetManager.append($body,"listGroup",{
				items: data,
				renderItem: function(item)
				{
					var $ret=$("<a href='/#!/products/categories/" + item.code + "' class='list-group-item'>\
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
		})
		//show the product list of special category based on the params
	});
}

exports.getInstance=function(){
	return new Ctrl();
}