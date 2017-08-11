package com.dyy.interceptor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.dyy.utils.Connection;
import com.dyy.utils.Constant;

public class SiteInterceptor extends HandlerInterceptorAdapter {
	
	
	@SuppressWarnings({"unchecked"})
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		// 站点
		Map<String, Object> site = null;
		//根据域名获取站点
	/*	String url  =request.getRequestURL().toString();
		if(url.length() > 15){
        	String dq = url.substring(url.indexOf("http://")+7, url.indexOf("."));
        	Map<String, String> map = new HashMap<String, String>();
        	  map.put("sh", "1691");
              map.put("bj", "1710");
              map.put("hz", "1626");
              map.put("km", "1717");
              map.put("hf", "1715");
              map.put("gz", "1549");
              map.put("yl", "1720");
              map.put("dw", "1567");
              map.put("tj", "1652");
              map.put("qz", "1725");
              map.put("nj", "1727");
              map.put("www", "1537");
              map.put("chuangyebaba", "1537");
        	
    		// 根据地区获取站点
    		if(null != map.get(dq)){
    			Map<String, Object> param3 = new HashMap<String, Object>();
	    		param3.put("areaId", map.get(dq));
	    		Map<Object, Object> all = Connection.getInstance().getApi("/website/getWebsiteListByParam", param3);
	    		List<Map<String, Object>> list = (List<Map<String, Object>>)all.get("values");
	    		if(list != null && list.size() > 0) {
	    			site = list.get(0);
	    		}
    		}
		}*/
		// 获取当前主站点
		if(site == null) {
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("level", 0);
			Map<Object, Object> all = Connection.getInstance().getApi("/website/getWebsiteListByParam", param);
			List<Map<String, Object>> list = (List<Map<String, Object>>)all.get("values");
			if(list != null && list.size() > 0) {
				site = list.get(0);
			}
		} 
		request.getSession().setAttribute(Constant.SITE, site);
		return super.preHandle(request, response, handler);
	}
	
	public String getRemoteHost(javax.servlet.http.HttpServletRequest request){
	    String ip = request.getHeader("x-forwarded-for");
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
	        ip = request.getHeader("Proxy-Client-IP");
	    }
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
	        ip = request.getHeader("WL-Proxy-Client-IP");
	    }
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
	        ip = request.getRemoteAddr();
	    }
	    return ip.equals("0:0:0:0:0:0:0:1")?"127.0.0.1":ip;
	}
}
