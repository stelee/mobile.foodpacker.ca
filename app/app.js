(function(global)
{	//initialize the context
	script("../bower_components/jquery/dist/jquery");
	script("../bower_components/jquery-ui/jquery-ui");
	script("../bower_components/datatables/media/js/jquery.dataTables");
	
	script("../bower_components/bootstrap/dist/js/bootstrap");

	require("../bower_components/d3/d3");
	require("../bower_components/nvd3/nv.d3");

	require("./libs/pnotify.custom.min");
	require("./libs/context");

	require("./libs/date.format");

	PNotify.prototype.options.styling = "fontawesome";

	global.Hogan=require('./libs/hogan-3.0.2');
	global.templates={};
	if('undefined' === typeof Promise)
	{
		script("./libs/rsvp-latest");
		Promise = RSVP.Promise;
	}
	require("./dependencies");
	require("./libs/core");
})(this)