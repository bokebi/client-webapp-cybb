package com.dyy.interceptor;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.dyy.annotation.AuthLoginAnnotation;
import com.dyy.utils.CustomerUtils;

/**
 * 异步请求时检测是否需要登录才能访问的请求
 * @author weihongjun
 */
public class AjaxActionInterceptor extends HandlerInterceptorAdapter 
{

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		String isAjax = request.getHeader("x-requested-with");
		if(isAjax!=null&&!"".equals(isAjax)){ //同步请求
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
		                ServletOutputStream outputStream = response.getOutputStream();
		                String mesage = new String("登录失效或者未登录，请登录后再操作".getBytes("utf-8"), "iso-8859-1");
		                JSONObject responseMessage=new JSONObject();
		                responseMessage.put("message", mesage);
		                responseMessage.put("value", "login001");
		                outputStream.print(responseMessage.toString());
		                outputStream.close();
		                return false;
		            }
		        }
		}
		return super.preHandle(request, response, handler);
	}
}
