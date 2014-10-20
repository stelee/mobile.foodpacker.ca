exports.Bools=function(val)
{
	if(typeof val === 'undefined' 
		|| val === null
		|| val === false
		|| val === "false"
		|| val === "False"
		|| val === "FALSE")
		return false;
	else
		return true;
}