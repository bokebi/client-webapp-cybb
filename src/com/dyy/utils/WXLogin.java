package com.dyy.utils;


/**
 * 微信登录
 * @author zzq
 * @since 2017/07/06
 */
public class WXLogin {
	/** 获取code */
	public static final String GET_CODE = "https://open.weixin.qq.com/connect/qrconnect";
	
	/** 获取openid */
	public static final String GET_OPENID = "https://api.weixin.qq.com/sns/oauth2/access_token";
	/** wx上传图文消息内的图片获取URL */
	public static final String GET_UPLOAD_IMG = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
	/** wx appID*******/
	public static final String APP_ID = "wx90da3f5f942b1010";
	/** 回调地址**/
	public static final String REDIRECT_URI = "http://i150926z91.iok.la/";
	
	
}
