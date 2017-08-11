package com.dyy.utils;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;


/**
 * HTTP请求相关处理工具类
 * 
 * @author zzq
 * @since
 */
public class HttpUtil {

	// 禁止构造实例
	private HttpUtil() {
	}

	private static String ROOT = null;
	private static String ROOT_URL = null;
	private static int TEST_FLAG = 0;

	/**
	 * 获取站点的相对根路径<br>
	 * 如果当前项目名称为"test",则获取到的根路径为"/test"
	 * 
	 * @param request
	 * @return
	 */
	public static final String getRoot(HttpServletRequest request) {
		if (ROOT == null) {
			ROOT = request.getContextPath();
		}
		return ROOT;
	}

	/**
	 * 获取站点的绝对根路径<br>
	 * 如果当前站点域名为"domain.com"，项目名称为"test",则获取到的根路径为"{@code protocal}://domain.com/test"
	 * 
	 * @param request 请求对象
	 * @return
	 */
	public static final String getRootURL(HttpServletRequest request) {
		if (ROOT_URL == null) {
			StringBuilder url = new StringBuilder(24).append(request.getScheme()).append("://");
			url.append(request.getServerName());
			int port = request.getServerPort();
			if (port != 80) { // 非80端口，添加端口号
				url.append(':').append(port);
			}
			url.append(request.getContextPath());
			ROOT_URL = url.toString();
		}
		return ROOT_URL;
	}

	/**
	 * 是否是内网环境访问
	 * 
	 * @param request
	 * @return
	 */
	public static final boolean isInnerEnv(HttpServletRequest request) {
		if (TEST_FLAG == 0) {
			String host = request.getServerName();
			if (host.startsWith("192.") || "localhost".equals(host) || host.startsWith("127.") || host.startsWith("10.")) {
				TEST_FLAG = 1;
			} else {
				TEST_FLAG = -1;
			}
		}
		return TEST_FLAG == 1;
	}

	/**
	 * 获取当前请求的来源路径，即获取HTTP Referer字段，如果没有则返回null
	 * 
	 * @param request
	 * @return
	 */
	public static final String getReferer(HttpServletRequest request) {
		return request.getHeader("Referer");
	}
	
	/**
	 * 获取当前请求的来源路径，即获取HTTP Host字段，如果没有则返回null
	 * 
	 * @param request
	 * @return
	 */
	public static final String getHost(HttpServletRequest request) {
		return request.getHeader("Host");
	}
	/** 
	 * getScheme:获取协议. <br/> 
	 * @author asa 
	 * @param request
	 * @return 
	 */  
	public static final String getScheme(HttpServletRequest request) {
		return request.getScheme();
	}
	/** 
	 * getPort:获取端口. <br/> 
	 * @author asa 
	 * @param request
	 * @return 
	 */  
	public static final int getPort(HttpServletRequest request) {
		return request.getServerPort();
	}
	
	
	
	/**
	 * 获取客户端来源 目前只区分手机端和电脑端
	 * @param request
	 * @return
	 */
	public static final String getClientSource(HttpServletRequest request) {
		return request != null && request.getHeader("user-agent").indexOf("Mobile")!=-1?"MOBILE":"PC";
	}
	

	/**
	 * 获取当前请求的URI<br>
	 * 该方法在Controller forward到JSP后，仍能够正确获取用户请求的URI
	 * 
	 * @param request
	 * @return
	 */
	public static final String getRequestURI(HttpServletRequest request) {
		String uri = (String) request.getAttribute("javax.servlet.forward.request_uri");
		if (uri == null) {
			uri = request.getRequestURI();
		}
		return uri;
	}

	/**
	 * 判断是否是jQuery提交过来的Ajax请求
	 * 
	 * @since
	 * @param request
	 * @return
	 */
	public static final boolean isAjaxRequest(HttpServletRequest request) {
		return "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
	}

	/**
	 * 发送httpGet请求
	 * 
	 * @param send 发送的url和参数，类似于http://www.baidu.com?name=name&age=18
	 * @return
	 * @throws Exception 
	 * @since 6.0
	 */
	public static HttpEntity httpGet(String send) throws Exception {
		HttpClient client = HttpClients.createDefault();
		HttpGet get = new HttpGet(send);
		HttpResponse res;
		try {
			res = client.execute(get);
			return res.getEntity();
		} catch (Exception e) {
			throw new Exception(e);
		}
	}
	
	/**
	 * 发送httpPost请求
	 * 
	 * @param url 发送的地址
	 * @param values 发送的数据 List BasicNameValuePair("username", "vip")
	 * @return
	 * @author zzq
	 * @throws Exception 
	 * @since 2016/05/13
	 */
	public static HttpEntity httpPost(String url, List<NameValuePair> values) throws Exception {
		HttpClient httpClient = HttpClients.createDefault();
		HttpPost httpPost = new HttpPost(url);
		HttpResponse res;
		try {
			httpPost.setEntity(new UrlEncodedFormEntity(values));
			res = httpClient.execute(httpPost);
			return res.getEntity();
		} catch (Exception e) {
			throw new Exception(e);
		}
	}
	public static void write(HttpServletResponse response, String string) {
		response.setContentType("text/html; charset=UTF-8"); // 转码
		PrintWriter out = null;
		try {
			out = response.getWriter();
			out.write("<script language='javascript'>alert('"+string+"');window.history.back();</script>");
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			out.flush();
			out.close();
		}
		
	}
}
