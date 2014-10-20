var BaseModel;
injector.process("BaseModel",function(Model)
{
  BaseModel=Model;
})
var Client=function(data,id)
{
  BaseModel.apply(this,["CLIENT",data,id]);
}

Client.prototype=new BaseModel();

Client.prototype.searchClientsByTermAndUserid=function(term,userId)
{
  var that=this;
  term=term.replace(/\\/g,"\\\\");

  var query="match (client:CLIENT)-[:CLIENT_OF]->(user:USER)\
where id(user)=" + userId + " and client.clientCode  =~ '.*" + term + ".*'\
return id(client),client";
  that.neo.cypher(query).success(function(data){
  	var results=data.data;
  	var clients=[];
    for(var i=0;i<results.length;i++)
    {
    	var clientId=results[i][0];
    	var result=results[i][1].data;
    	var client=new Client(result,clientId);
    	clients.push(client);
    }
    that._setStatusSuccess(clients);
  }).failed(function(err){
    that._setStatusFailed(err);
  })
  return this;
}

exports.getInstance=function(data,id)
{
  return new Client(data,id);
}
