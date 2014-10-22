var Index=function(){

}

injector.process("BaseController",function(BaseController)
{
	Index.prototype=new BaseController();
})

Index.prototype.render=function(){
	var that=this;
	that.getBody().empty();
	injector.process("@featuresBusiness",function(featuresBusiness){
		featuresBusiness.appendTo(that.getBody());
	})

}


exports.getInstance=function(){
	return new Index();
}