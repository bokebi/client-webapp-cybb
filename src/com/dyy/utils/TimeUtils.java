package com.dyy.utils;

import java.util.Calendar;
import java.util.GregorianCalendar;

public class TimeUtils {
	
	/*获取今天剩余时间
	 * */
	public static long getTodaySurplusTime(){
		Calendar curDate = Calendar.getInstance();
		Calendar tommorowDate = new GregorianCalendar(curDate.get(Calendar.YEAR), curDate.get(Calendar.MONTH), curDate
				.get(Calendar.DATE) + 1, 0, 0, 0);
		return (tommorowDate.getTimeInMillis() - curDate .getTimeInMillis());
	}


}
