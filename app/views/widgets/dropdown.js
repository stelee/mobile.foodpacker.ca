var Dropdown=function(attrs){
	var $button=$('<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\
    <span id="label">Please select</span> <span class="caret"></span>\
  </button>');

	var $ul=$('<ul class="dropdown-menu" role="menu">');
	var defaultLink=null;
	var defaultValue;
	if('string' === typeof attrs.default){
		defaultValue=attrs.default;
	}else if('function' === typeof attrs.default)
	{
		defaultValue=attrs.default();
	}else
	{
		defaultValue=attrs.items[0].code;
	}

	attrs.items.forEach(function(item){
		var $li=$('<li>');
		var $link=$('<a href="#">' + item.name + '</a>');
		$li.append($link);
		$ul.append($li);
		$link.on("click",function(){
			$button.find("#label").text(item.name);
			if(typeof attrs.onSelect === 'function')
			{
				attrs.onSelect(item.code);
			}
		})
		if(defaultValue ===  item.code)
		{
			defaultLink=$link;
		}
	})

  	this.$comp=$("<div>");
  	this.$comp.append($button).append($ul);
  	defaultLink.trigger('click');
}
injector.process("@baseWidget",function(base){
	Dropdown.prototype=base;
})

exports.render=function(attrs)
{
	return new Dropdown(attrs).getComp();
}