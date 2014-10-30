var Index=function(){

}

injector.process("BaseController",function(BaseController)
{
	Index.prototype=new BaseController();
})

Index.prototype.render=function(){
	var that=this;
	var $body=this.getBody();
	$body.empty();
	injector.process("@featuresBusiness","@categoriesBusiness","widgetManager",function(featuresBusiness,categoriesBusiness,widgetManager){
		featuresBusiness.appendTo($body);
		// widgetManager.append($body,"board",{
		// 	content : _l("Welcome to visit foodpacker.ca!"),
		// 	width: "100%"
		// });
		widgetManager.append($body,"quickLaunch",{
			items: [
				{name: "Cook", url: "/#!/products/categories/1",bgColorClass: 'orange'},
				{name: "Promotion", url: "/#!/products/promotion",bgColorClass: 'green'},
				{name: "View",url: "/#!/products/categories/",bgColorClass: 'blue'},
				{name: "Contact",url: "/#!/about",bgColorClass: 'grey'}
			]
		});
		widgetManager.append($body,"clearBar");
		categoriesBusiness.list().then(function(data){
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
	})
}


exports.getInstance=function(){
	return new Index();
}