package com.dyy.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * 左侧选中拦截器
 * @author weihongjun
 *
 */
public class LeftSelectInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
		String leftNav = request.getParameter("leftNav");
		if(leftNav!=null&&!"".equals(leftNav)){
			request.getSession().setAttribute("leftNav", leftNav);
		}
		return super.preHandle(request, response, handler);
	}
}
