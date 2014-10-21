var Index=function(){

}

injector.process("BaseController",function(BaseController)
{
	Index.prototype=new BaseController();
})

Index.prototype.render=function(){
	var that=this;
	that.getBody().empty();
	
}


exports.getInstance=function(){
	return new Index();
}