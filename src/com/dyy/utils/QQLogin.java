package com.dyy.utils;

import java.io.IOException;
import java.net.URLEncoder;

import org.apache.http.HttpEntity;
import org.apache.http.util.EntityUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

/**
 * QQ登录
 * @author William Huang
 * @since 2016/1/19
 */
public class QQLogin {
	// 获取code的地址：
	public static final String URL_GET_OAUTH_CODE = "https://graph.qq.com/oauth2.0/authorize";
	// 获取token的地址：
	public static final String URL_TOKEN = "https://graph.qq.com/oauth2.0/token";
	// 获取open id的地址：
	public static final String URL_OPENID = "https://graph.qq.com/oauth2.0/me";
	// app ID:
	public static final String APP_ID = "101408869";
	// app Key:
	public static final String APP_KEY = "e2dc47b81c87055cf4c745b7a92530ba";
	// 回调地址：
	public static final String URL_RETURN_MOBILE = "http://www.chuangyebaba.com/customer/qqFinalLogin.html";
	public static final String URL_RETURN_PC     = "http://www.chuangyebaba.com/customer/qqFinalLogin.html";
	
	/**
	 * 获取第一步的请求地址：
	 * @param type 0=mobile页，1=PC端页
	 * @return
	 */
	public static String getOAuthURL(int type) {
		String strMoile = (type == 0) ? "&display=mobile" : "&display=pc";
		String url = URL_GET_OAUTH_CODE + "?client_id=" + APP_ID + "&redirect_uri=" + getRedirectUri(type) 
		+ "&response_type=code&scope=get_user_info&state=test" + strMoile;
		return url;
	}
	
	/**
	 * 获取token
	 * @param code
	 * @param type 0=mobile页，1=PC端页
	 * @return
	 * @throws Exception 
	 */
	public static String getAccessToken(String code, int type) throws Exception 
	{
		String qqToken = null;
		String returnMsg = null;
		String url = URL_TOKEN + "?grant_type=authorization_code"+ "&client_id=" + APP_ID + "&client_secret=" + APP_KEY + "&code=" + code +  "&redirect_uri=" + getRedirectUri(type);
		
		try {
			HttpEntity entity = HttpUtil.httpGet(url);
			returnMsg = EntityUtils.toString(entity);
			if (returnMsg == null) {
				throw new RuntimeException("跳转QQ登陆页面异常");
			}
			
			String[] params = returnMsg.split("\\&");
			if (params != null) {
				for (String p : params) {
					String[] item = p.split("=");
					if ("access_token".equals(item[0])) {
						qqToken = item[1];
						break;
					}
				}
			}
			
		} catch (IOException e) {
			throw new RuntimeException("跳转QQ登陆页面异常", e);
		}
		
		if (qqToken == null) {
			throw new RuntimeException("跳转QQ登陆页面异常" + returnMsg);
		}
		return qqToken;
	}
	
	/**
	 * 获取openID
	 * @param qqToken
	 * @return
	 * @throws Exception 
	 */
	public static String getOpenID(String qqToken) throws Exception 
	{
		String openid = null;
		String strResult = null;
		String url = URL_OPENID + "?access_token=" + qqToken;
		
		try {
			HttpEntity entity = HttpUtil.httpGet(url);
			strResult = EntityUtils.toString(entity);
			strResult = strResult.replace("callback(", "");
			strResult = strResult.replace(");", "");
			strResult = strResult.trim();
			if (strResult == null) {
				throw new RuntimeException("跳转QQ登陆页面异常");
			}
			JSONObject obj = JSON.parseObject(strResult);
			openid = obj.getString("openid");
			
		} catch (IOException e) {
			throw new RuntimeException("跳转QQ登陆页面异常", e);
		}
		
		if (openid == null) {
			throw new RuntimeException("跳转QQ登陆页面异常" + strResult);
		}
		return openid;
	}

	public static String getRedirectUri(int type) {
		String uri = (type == 0) ? URL_RETURN_MOBILE +"?type="+type : URL_RETURN_PC + "?type="+type;
		try {
			uri = URLEncoder.encode(uri,"UTF-8");
		} catch (Exception e) {
			throw new RuntimeException("跳转QQ登陆页面异常", e);
		}
		return uri;
	}
}
