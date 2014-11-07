var ProgressBar=function()
{

}
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}
ProgressBar.prototype.show=function()
{
	$("div.loading").remove();
	$(document).scrollTop(0)
	var $progress=$("<div class='loading'>\
		<div class='iconcontainer'><div class='fa fa-4x fa-spinner fa-spin'></div></div>\
		</div>");
	$progress.appendTo("body");
	$('body').addClass('stop-scrolling');
	$('body').bind('touchmove', function(e){e.preventDefault()})
	disable_scroll();
}
ProgressBar.prototype.hide=function()
{
	$("div.loading").remove();
	$('body').removeClass('stop-scrolling');
	$('body').unbind('touchmove');
	enable_scroll();
}

exports.getInstance=function()
{
	return new ProgressBar();
}