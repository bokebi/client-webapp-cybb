package com.dyy.utils;

import javax.servlet.http.Cookie;

import org.apache.commons.lang.StringUtils;


public class CookieUtils {
	
	/**
	 * 判断是否存在这个cookie
	 * @param cookieName
	 * @param cookies
	 * @return
	 */
	public static Cookie isHaveCookie(String cookieName,Cookie[] cookies){
		for(Cookie cookie : cookies){
	    	   if(cookie.getName().equals(cookieName)){
	    		  return cookie;
	    	   }
	    }
		return null;
	}
	
	/**
	 * 创建cookie
	 * @param cookies
	 * @param cookieName
	 * @param cookieValue
	 * @param maxage
	 * @param path
	 * @return
	 */
	public static Cookie addCookie(Cookie[] cookies,String cookieName,String cookieValue,int maxage,String path){
		Cookie c  = new Cookie(cookieName,cookieValue);
	    c.setMaxAge(maxage);
	    c.setPath(path);	    	
		return c;
	}
	
	/**
	 * 添加cookie值
	 * @param cookie
	 * @param addcookieValue
	 * @param maxage
	 * @param path
	 * @param Separator
	 * @return
	 */
	public static Cookie addCookieValue(Cookie cookie,String addcookieValue,int maxage,String path,String Separator){
		cookie.setMaxAge((int)TimeUtils.getTodaySurplusTime()/1000);
		cookie.setPath("/");
		String value = cookie.getValue();
		if(StringUtils.isNotBlank(value)){
			cookie.setValue(value+Separator+addcookieValue);
		}else{
			cookie.setValue(addcookieValue);
		}		
		return cookie;
	}

}
