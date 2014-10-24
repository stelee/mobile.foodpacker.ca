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
		debugger;
		featuresBusiness.appendTo($body);
		widgetManager.append($body,"quickLaunch",{
			items: [
				{name: "Cook", url: "/#!/products/categories/1",bgColorClass: 'orange'},
				{name: "Promotion", url: "/#!/products/promotion",bgColorClass: 'green'},
				{name: "View",url: "/#!/products/categories",bgColorClass: 'blue'},
				{name: "Contact",url: "/#!/about",bgColorClass: 'grey'}
			]
		})
	})
}


exports.getInstance=function(){
	return new Index();
}