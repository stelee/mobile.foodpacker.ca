var mergeOptions=require('./libs/option_helper').mergeOptionsWithDefault;
var HttpClient=function(url,attrs)
{
	this.url=url;
	mergeOptions.call(this,attrs);
}

HttpClient.prototype._options={
	accept : "application/json; charset=UTF-8"
	,contentType : "application/json"
}

HttpClient.prototype._prepareHeader=function(xhr)
{
	xhr.setRequestHeader("Accept",this.options.accept);
	xhr.setRequestHeader("Content-Type",this.options.contentType);
}
HttpClient.prototype.get=function(queries)
{
	var that=this;
	return new Promise(function(resolve,reject)
	{
		var url=that.url;
		if("string" == typeof queries)
		{
			url+="?"+queries
		}else if("object" ==typeof queries)
		{
			var querystring="";
			var sep="";
			for(var key in queries)
			{
				querystring += sep + key + "=" + encodeURIComponent(queries[key]);
				sep = "&"
			}
			url+="?"+querystring;
		}
		$.ajax(url,{
			type: 'GET',
			beforeSend: function(xhr){that._prepareHeader(xhr)},
			success: function(data)
			{
				if("string" ==typeof data)//debug only
				{
					data=JSON.parse(data);
				}
				resolve(data);
			},
			error: function(jqXHR,textStatus,erroThrown)
			{
				reject(jqXHR);
			},
			timeout: 30000
		})
	})
}
HttpClient.prototype.post=function(data,queries)
{
	var that=this;
	return new Promise(function(resolve,reject)
	{
		var url=that.url;
		if(queries)
		{
			url+="?"+queries
		}
		$.ajax(url,{
			type: 'POST',
			data: JSON.stringify(data),
			beforeSend: function(xhr){that._prepareHeader(xhr)},
			success: function(data)
			{
				if("string" ==typeof data)//debug only
				{
					data=JSON.parse(data);
				}
				resolve(data);
			},
			error: function(jqXHR,textStatus,erroThrown)
			{
				reject(jqXHR);
			},
			timeout: 30000
		})
	})
}

exports.HttpClient  = HttpClient;