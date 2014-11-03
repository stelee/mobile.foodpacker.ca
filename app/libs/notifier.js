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
Notifier.prototype.confirm=function(message,onOK,onCancel)
{
	new PNotify({
	    title: _l('Confirm'),
	    text: message,
	    icon: 'glyphicon glyphicon-question-sign',
	    hide: false,
	    confirm: {
	        confirm: true
	    },
	    buttons: {
	        closer: false,
	        sticker: false
	    },
	    history: {
	        history: false
	    }
	}).get().on('pnotify.confirm', function() {
	    onOK()
	}).on('pnotify.cancel', function() {
	    onCancel();
	});
}

exports.getInstance=function()
{
	return new Notifier();
}