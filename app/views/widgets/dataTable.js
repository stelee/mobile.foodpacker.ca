var path;
injector.process("path",function(m){
	path=m;
})
var DataTable=function(attrs)
{
	this.attrs=attrs;
	var columns=path.getValue(this,"attrs.columns",[]);
	var values=path.getValue(this,"attrs.values",[]);
	var lineDataRender=path.getValue(this,"attrs.lineDataRender");
	var options=path.getValue(this,"attrs.options",{});


	

	var $comp=$("<div class='form-group left'>");
	var $table=$("<table  width='100%'>");
	$comp.append($table);

	var $thead=$("<thead>");
	var $tr=$("<tr>");
	for(var i=0;i<columns.length;i++)
	{
		$tr.append("<th>" +  columns[i] + "</th>")
	}
	$tr.appendTo($thead);
	$thead.appendTo($table);

	var $tbody=$("<tbody>");
	for(var i=0;i<values.length;i++)
	{
		var linedata=values[i];
		var $row=$("<tr>");
		for(var j=0;j<columns.length;j++)
		{
			var data;
			if(lineDataRender === null)
			{
				data=linedata[j];
			}else
			{
				data=lineDataRender(j,linedata);
			}
			$row.append("<td>" + data + "</td>");
		}
		$row.appendTo($tbody);
	}
	$tbody.appendTo($table);
	$table.DataTable(options);
	this.$comp=$comp;
}
injector.process("@baseWidget",function(base){
	DataTable.prototype=base;
})

exports.render=function(attrs)
{
	return new DataTable(attrs).getComp();
}