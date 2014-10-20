//The base model that is going to use the neo4j rest service
//use cypher to interactive with the database
var BaseModel=function(label,data,id)
{
	this.label=label || "Base";
	this.data= data || {};
	this.id=null;
	if(typeof id != 'undefined')
		this.id=id;
	var that=this;
	injector.process("Neo",function(Neo){
		that.neo=Neo.getInstance();
	})
}
//with Traits
injector.process("TraitsObjectStatusSupport",function(traits){
	mixin(BaseModel,traits);
})

//private
var buildWhereStr=function(wherestr)
{
	var whereStrArr=wherestr.split(/(\w*)\s?=/mg);
	var ret="";
	for(var i=1;i<whereStrArr.length;)
	{
		if(whereStrArr[i] === "_id")
		{
			ret += "id(n)=" + whereStrArr[i+1];
		}else
		{
			ret += "n." + whereStrArr[i] + "=" + whereStrArr[i+1];
		}

		i=i+2;
	}
	return ret;
}

var buildSetStr=function(set)
{
	var setStrArr=[];
	for(var prop in set)
	{
		if(set.hasOwnProperty(prop))
		{
			var value=set[prop];
			if(typeof value === "string")
			{
				value='"' + value.replace(/\"/g,"\\\"") + '"';
			}

			setStrArr.push("n." + prop + "=" + value);
		}
	}
	return setStrArr.join(" ");
}

BaseModel.prototype.save=function()
{
	var q={};
	var that=this;
	q.query="CREATE (n:" + this.label + " {props}) RETURN id(n),n";
	q.params = {
		props: this.data
	};
	this.neo.exec(q)
	.success(function(data){
		//there should be only one result
		var result=data.data[0];
		that.id=result[0];
		that.data=result[1].data;
		that._setStatusSuccess(that);
	})
	.failed(function(error){that._setStatusFailed(error)});
	return this;
}

BaseModel.prototype.get=function(id)
{
	if(typeof id === 'undefined')
	{
		id=this.id;
	}
	var q={};
	var that=this;
	q.query="MATCH (n:" + this.label + ")WHERE id(n)=" + id + " return id(n),n";
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
				that._setStatusSuccess(that);
			}

		})
		.failed(function(error){that._setStatusFailed(error)});
	return this;
}
BaseModel.prototype.update=function(newData)
{
	if(this.id === null)
	{
		this._setStatusFailed("ID IS NOT SPECIFIED");
		return this;
	}
	var that=this;
	var q={};
	q.query="MATCH(n:" + this.label + ") "+
	"WHERE id(n)=" +  this.id  + " " +
	"SET "+ buildSetStr(newData) + " " +
	"RETURN id(n),n";
	this.neo.exec(q)
		.success(function(data){
			if(data.data.length === 0)
			{
				that._setStatusSuccess(null);
			}else if(data.data.length === 1)
			{
				var result=data.data[0];
				that.id=result[0];
				that.data=result[1].data;
				that._setStatusSuccess(that);
			}
		}).failed(function(error){that._setStatusFailed(error)});
	return this;
}
BaseModel.prototype.drop=function()
{
	var that=this;
	var q={};
	if(this.id === null)
	{
		this._setStatusFailed("ID IS NOT SPECIFIED");
		return this;
	}
	q.query="MATCH (n:" + this.label + ") \
	WHERE id(n) = " + this.id + " \
	OPTIONAL MATCH (n)-[r]-() \
	DELETE n,r";
	this.neo.exec(q).success(function(data)
	{
		that._setStatusSuccess(that);
	}).failed(function(error){that._setStatusFailed(error)});
	return this;
}

BaseModel.prototype.findFirstBy=function(wherestr)
{
	var that=this;
	var q={};
	q.query="MATCH(n:" + this.label + ") "+
	"WHERE " + buildWhereStr(wherestr) + " " +
	"RETURN id(n),n LIMIT 1";
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
				that._setStatusSuccess(that);
			}
		}).failed(function(error){that._setStatusFailed(error)})
	return this;
}

BaseModel.prototype.findBy=function(wherestr,limit)
{
	var that=this;
	var q={};
	limit = limit || 500;
	q.query="MATCH(n:" + this.label + ") "+
	"WHERE " + buildWhereStr(wherestr) + " LIMIT " + limit + " " +
	"RETURN id(n),n";
	this.neo.exec(q)
		.success(function(data){
			if(data.data.length === 0)
			{
				that._setStatusSuccess(null);
			}else
			{
				var results=data.data;
				var models=[];
				for(var i=0;i<results.length;i++)
				{
					var result=results[i];
					var model=new BaseModel(that.label);
					model.id=result[0];
					model.data=result[1].data;
					models.push(model);
				}
				that._setStatusSuccess(models);
			}
		}).failed(function(error){that._setStatusFailed(error)})
	return this;
}

/**
the where has to be a cypher clause.
for more complex updating, please use the neo.exec() or neo.cypher() directly.
*/
BaseModel.prototype.updateBy=function(newData,wherestr)
{
	var that=this;
	var q={};
	q.query="MATCH(n:" + this.label + ") "+
	"WHERE " + buildWhereStr(wherestr) + " " +
	"SET "+ buildSetStr(newData) + " " +
	"RETURN id(n),n";
	this.neo.exec(q)
		.success(function(data){
			if(data.data.length === 0)
			{
				that._setStatusSuccess(null);
			}else if(data.data.length === 1)
			{
				var result=data.data[0];
				that.id=result[0];
				that.data=result[1].data;
				that._setStatusSuccess(that);
			}else
			{
				var results=data.data;
				var models=[];
				for(var i=0;i<results.length;i++)
				{
					var result=results[i];
					var model=new BaseModel(that.label);
					model.id=result[0];
					model.data=result[1].data;
					models.push(model);
				}
				that._setStatusSuccess(models);
			}
		}).failed(function(error){that._setStatusFailed(error)})
	return this;
}

exports.BaseModel=BaseModel;
