package com.dyy.utils;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.Consts;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * web工具类
 * @author weihongjun
 */
public class WebUtils 
{

	/**
	 * 从spring获取请求的request
	 * 
	 * @author weihongjun
	 * @return
	 */
	public static HttpServletRequest getHttpServletRequest() {
		return ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest();
	}

	/**
	 * 从spring获取请求的response
	 * 
	 * @author weihongjun
	 * @return
	 */
	public static HttpServletResponse getHttpServletResponse() 
	{
		return ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getResponse();
	}
	/**
	 * 从spring获取当前会话
	 * 
	 * @author weihongjun
	 * @return
	 */
	public static HttpSession getHttpSession() {
		return getHttpServletRequest().getSession();
	}
	/**
	 * 从spring获取当前会话
	 * 
	 * @author weihongjun
	 * @return
	 */
	public static HttpSession getHttpSession(boolean createSession) 
	{
		return getHttpServletRequest().getSession(createSession);
	}
	
	
	@SuppressWarnings("unchecked")
	public static Map<String,Object> getRequestMap()
	{
		HttpServletRequest request=getHttpServletRequest();
		Map<String,Object> param=new HashMap<String, Object>();
		Enumeration<String> e = request.getParameterNames();
		while(e.hasMoreElements()) {
			String key = e.nextElement();
			String value = request.getParameter(key);
			if (value.equals(new String(value.getBytes(Consts.ISO_8859_1), Consts.ISO_8859_1)))
            {
				value=new String(value.getBytes(Consts.ISO_8859_1), Consts.UTF_8);
            }
			param.put(key, value);
			
		}
		return param;
	}
}
