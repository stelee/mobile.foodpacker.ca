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
		widgetManager.append($body,"quickLaunch",{
			items: [
				{name: "Cook", url: "/#!/products/categories/1"},
				{name: "Promotion", url: "/#!/products/promotion"},
				{name: "View",url: "/#!/products/categories"},
				{name: "Contact",url: "/#!/about"}
			],
			x: 2
		})
	})
}


exports.getInstance=function(){
	return new Index();
}