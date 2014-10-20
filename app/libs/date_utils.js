var TIME_OF_DAY=1000 * 60 * 60 *24;

exports.getLastBizDate=function(today)
{
	today=today || new Date();
	var lastBizDate=new Date();
	var offset=1;
	var todayDay=today.getDay();
	if(todayDay === 0)
	{
		offset=2;
	}else if(todayDay === 1)
	{
		offset =3;
	}
	lastBizDate.setTime(today.getTime()-offset*TIME_OF_DAY);
	return lastBizDate;
}