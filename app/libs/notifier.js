var Notifier=function()
{

}

Notifier.prototype.error=function(message)
{
	new PNotify({
	    title: 'Error!',
	    text: message,
	    type: 'error',
	    delay: 1000
	});
}
Notifier.prototype.info=function(message)
{
	new PNotify({
	    title: 'Info',
	    text: message,
	    type: 'info',
	    delay: 1000
	});
}

Notifier.prototype.success=function(message)
{
	new PNotify({
	    title: 'success',
	    text: message,
	    type: 'success',
	    delay: 1000
	});
}

exports.getInstance=function()
{
	return new Notifier();
}