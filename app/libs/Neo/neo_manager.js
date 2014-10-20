//The restful client for NEO4J
var mergeOptions=require('./libs/option_helper').mergeOptionsWithDefault;

var HttpClient;

//dependencies
injector.process("HttpClient",function(Client,NeoNode,NeoRelation){
	HttpClient=Client;
})

var NeoManager=function(attrs)
{
	mergeOptions.call(this,attrs);
}

injector.process("TraitsObjectStatusSupport",function(traits){
	mixin(NeoManager,traits);
})

NeoManager.prototype._options={
	connectionStr : "http://localhost:7474",
	modelPath: "./models/"
}

NeoManager.prototype.exec=function(q)
{
	var that=this;
	this._setStatusReady();
	var httpClient=new HttpClient(this.options.connectionStr + "/db/data/cypher");
	httpClient.post(q).then(function(data){
		that._setStatusSuccess(data);
	}).catch(function(error){
		that._setStatusFailed(error);
	})
	return this;
}

NeoManager.prototype.cypher=function(query,params)
{
	var that=this;
	this._setStatusPending();
	var q={};
	q.query=query;
	if(typeof params === "object")
	{
		q.params = params;
	}
	this._setStatusReady();
	var httpClient=new HttpClient(this.options.connectionStr + "/db/data/cypher");
	httpClient.post(q).then(function(data){
		that._setStatusSuccess(data);
	}).catch(function(error){
		that._setStatusFailed(error);
	})
	return this;
}

NeoManager.prototype.loadModel=function(name,data,id)
{
	try{
		return require(this.options.modelPath + name).getInstance(data,id);
	}catch(e){//if this model is not defined
		var ret=null;
		injector.process("BaseModel",function(Model){
			ret=new Model(name.toUpperCase(),data,id);
		})
		return ret;
	}
}

exports.getInstance=function(attrs){
	return new NeoManager(attrs);
}
