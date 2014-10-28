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
	injector.process("@featuresBusiness","widgetManager",function(featuresBusiness,widgetManager){
		featuresBusiness.appendTo($body);
		widgetManager.append($body,"board",{
			content : _l("Welcome to visit foodpacker.ca!"),
			width: $(".main").width() - 180
		});
		widgetManager.append($body,"quickLaunch",{
			items: [
				{name: "Cook", url: "/#!/products/categories/1",bgColorClass: 'orange'},
				{name: "Promotion", url: "/#!/products/promotion",bgColorClass: 'green'},
				{name: "View",url: "/#!/products/categories",bgColorClass: 'blue'},
				{name: "Contact",url: "/#!/about",bgColorClass: 'grey'}
			]
		});
		widgetManager.append($body,"clearBar");
		widgetManager.append($body,"listGroup",{
			items: [
			{name: "Cook It Yourself", code: "88",description: "Donec id elit non mi paort agrandd at engie mebuwe. MNegsnegu dfdi bankc agent",icon: "star-empty"},
			{name : "Sea food",code: "25",description: "Donec id elit non mi paort agrandd at engie mebuwe. MNegsnegu dfdi bankc agent",icon: "heart"},
			{name : "Meat", code: "27",description: "Donec id elit non mi paort agrandd at engie mebuwe. MNegsnegu dfdi bankc agent",icon: "thumbs-up"},
			{name : "Organic Food", code: "27",description: "Donec id elit non mi paort agrandd at engie mebuwe. MNegsnegu dfdi bankc agent",icon: "flash"},
			{name : "Daily Health", code: "27",description: "Donec id elit non mi paort agrandd at engie mebuwe. MNegsnegu dfdi bankc agent",icon: "send"}
			],
			renderItem: function(item)
			{
				var $ret=$("<a href='/#!/products/categories/" + item.code + "' class='list-group-item'>\
						  <h4 class='list-group-item-heading'><span class='glyphicon glyphicon-" + item.icon + "'></span> " + item.name + "</h4>\
						<p class='list-group-item-text'>" + item.description + "</p>\
					</a>");
				return $ret;
			}
		});
	})
}


exports.getInstance=function(){
	return new Index();
}