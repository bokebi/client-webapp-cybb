package com.dyy.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Constant {
	
	public static int MAX_FILE_SIZE = 1024*1024*100;
	
	public static String SITE = "app_site";
	
	public static String SESSION_KEY="user";
	
	public static String SESSION_TOKEN = "session_token";
	
	public static Integer CONNECTTIMEOUT = null;
	public static Integer SOCKETTIMEOUT = null;
	
	
	public static String apiUrl;
	public static String apiAppId;
	public static String apiKey;
	
	@Value("${api_url}")
	public void setApiUrl(String apiUrl) {
		Constant.apiUrl = apiUrl;
	}
	@Value("${api_tonken}")
	public void setApiTonken(String apiTonken) {
		Constant.apiAppId = apiTonken;
	}
	@Value("${api_key}")
	public void setApiKey(String apiKey) {
		Constant.apiKey = apiKey;
	}
	@Value("${connectTimeout}")
	public void setConnectTimeout(Integer connectTimeout) {
		Constant.CONNECTTIMEOUT = connectTimeout;
	}
	@Value("${socketTimeout}")
	public void setSocketTimeout(Integer socketTimeout) {
		Constant.SOCKETTIMEOUT = socketTimeout;
	}
	
	
	 /** 保存帐套信息session属性名称 */
    public final static String ACCOUNT_BOOK_SESSION = "ACCOUNT_BOOK_SESSION";
    
    /** 账期id */
    public final static String PERIOD_ID_SESSION = "PERIOD_ID_SESSION";
    
    /** 账期所属年 */
    public final static String PERIOD_YEAR_SESSION = "PERIOD_YEAR_SESSION";
    
    /** 账期所属期间数 */
    public final static String PERIOD_NUMBER_SESSION = "PERIOD_NUMBER_SESSION";
    
    /** 账套当前期间 */
    public final static String ACCOUNT_PERIOD_SESSION = "ACCOUNT_PERIOD_SESSION";
    
    public final static String ACCOUNT_PERIOD_LIST_SESSION = "ACCOUNT_PERIOD_LIST_SESSION";
}
