'use strict'
var isNull=require('./libs/null').isNull;
var getValue=function(target,path,defaultValue)
{
	var pathArr=path.split(".");
	var object=target;
	if(typeof defaultValue === 'undefined')
	{
		defaultValue = null;
	}
	if(isNull(object))
	{
		return defaultValue;
	}
	for(var i=0;i<pathArr.length;i++)
	{
		var objName=pathArr[i];
		object=object[objName];
		if(isNull(object))
		{
			return defaultValue;
		}
	}
	return object;
}

var setValue=function(target, path, value)
{
	var pathArr=path.split(".");
	var object=target;
	if(isNull(object))
	{
		return false;
	}
	var i=0;
	for(;i<pathArr.length-1;i++)
	{
		var objName=pathArr[i];
		if('undefined'==typeof(object[objName])){
			object[objName]=new Object();
		}
		object=object[objName];
	}
	var objName=pathArr[i];
	object[objName]=value;
	return true;
}
var clone=function(source)
{
	var target={};

	for(var prop in source)
	{
		if(!source.hasOwnProperty(prop))
		{
			continue;
		}
		if(typeof source[prop] === 'object')
		{
			target[prop]=clone(source[prop]);
		}else
		{
			target[prop]=source[prop];
		}
	}
	return target;
}
var walk=function(obj,decorator,propertyPath)
{
	if(typeof propertyPath === 'undefined')
	{
		propertyPath="";
	}
	for(var prop in obj)
	{
		var currentPropertyPath
		if(propertyPath === "")
		{
			currentPropertyPath = prop;
		}else
		{
			currentPropertyPath =  propertyPath + "." + prop;
		}
		
		if(!obj.hasOwnProperty(prop))
		{
			continue;
		}
		if(typeof obj[prop] === "object")
		{
			walk(obj[prop],decorator,currentPropertyPath);
		}else
		{
			obj[prop]=decorator(obj[prop],currentPropertyPath);
		}
	}
}
var immutableWalk=function(obj,decorator)
{
	var ret=clone(obj);
	walk(ret,decorator);
	return ret;
}

exports.walk=immutableWalk;
exports.clone=clone;
exports.getValue=getValue;

exports.path=function(target,path, value)
{
	if('undefined' == typeof value)
	{
		return getValue(target,path);
	}else
	{
		return setValue(target,path,value);
	}
}