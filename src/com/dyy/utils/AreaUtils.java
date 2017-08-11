package com.dyy.utils;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public class AreaUtils {
	
	@SuppressWarnings("unchecked")
	public static Long currentAreaId(HttpServletRequest request){
		try {
			Map<String,Object> map = (Map<String, Object>) request.getSession().getAttribute(Constant.SITE);
			return Long.parseLong(map.get("areaId")+"");
		} catch (Exception e) {
			return null;
		}
	}

}
