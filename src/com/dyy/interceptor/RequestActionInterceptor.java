package com.dyy.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.dyy.annotation.AuthLoginAnnotation;
import com.dyy.utils.CustomerUtils;

/**
 * 同步请求时检测是否需要登录才能访问的请求
 * @author weihongjun
 */
public class RequestActionInterceptor extends HandlerInterceptorAdapter 
{

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		String isAjax = request.getHeader("x-requested-with");
		if(isAjax==null||"".equals(isAjax)){ //同步请求
			 boolean isLogin = false;
		        if (handler.getClass().isAssignableFrom(HandlerMethod.class))
		        {
		            AuthLoginAnnotation methodAuth = ((HandlerMethod)handler).getMethodAnnotation(AuthLoginAnnotation.class);
		            Class<?> beanType = ((HandlerMethod)handler).getBeanType();
		            AuthLoginAnnotation classAuth = beanType.getAnnotation(AuthLoginAnnotation.class);
		            if (methodAuth !=null && methodAuth.validate())
		            {
		                isLogin = true;
		            }
		            else if (methodAuth !=null && !methodAuth.validate())
		            {
		                isLogin = false;
		            }
		            else if (methodAuth ==null && classAuth!=null)
		            {
		                if (classAuth.validate())
		                {
		                    isLogin = true;
		                }
		            }
		        }
		        if (isLogin)
		        {
		        	Object currentCustomer = CustomerUtils.getCurrentCustomer();
		            if (currentCustomer==null)
		            {
		            	response.sendRedirect(request.getContextPath()+"/customer/loginUI.html");
		            	return false;
		            }
		        }
		}
		return super.preHandle(request, response, handler);
	}
}
