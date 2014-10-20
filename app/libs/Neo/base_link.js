var BaseLink=function(type,data,id)
{
	this.type=type || "Base";
	this.data= data || {};
	if(typeof id === undefined)
		this.id=null;
	else
		this.id=id;
	var that=this;
	injector.process("Neo",function(Neo){
		that.neo=Neo.getInstance();
	})
	this.from=null;
	this.to=null;
}
//with Traits
injector.process("TraitsObjectStatusSupport",function(traits){
	mixin(BaseLink,traits);
})

BaseLink.prototype.link=function(from,to,initData)
{
	var that=this;
	var q={}
	initData =initData || this.data;

	q.query="MATCH (s:" + from.label+ "),(t:" + to.label+ ") \
	WHERE id(s)={sourceId} and id(t)={targetId} \
	CREATE UNIQUE (s)-[r:"+this.type+"{props}]->(t) \
	RETURN id(r),r";
	q.params={
		sourceId: from.id,
		targetId: to.id,
		props : initData
	}
	this.neo.exec(q)
		.success(function(data){
			if(data.data.length === 0)
			{
				that._setStatusSuccess(null);
			}else
			{
				var result=data.data[0];
				that.id=result[0];
				that.data=result[1].data;
				that.from=from;
				that.to=to;
				that._setStatusSuccess(that);
			}
		})
		.failed(function(error){that._setStatusFailed(error)});
	return this;
}

exports.BaseLink=BaseLink;
