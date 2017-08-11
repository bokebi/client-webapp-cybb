package com.dyy.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;
import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.ByteArrayBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultConnectionKeepAliveStrategy;
import org.apache.http.impl.client.DefaultHttpRequestRetryHandler;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.CharsetUtils;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;



public class Connection {
	
	private static final Logger logger = LoggerFactory.getLogger(Connection.class);
	
//	private RestTemplate template = new RestTemplate();
	
//	private String tonken;
	
	private static Connection conn;
	
    private RestTemplate template = null;
    
    
	
	private Connection() {
		// 长连接保持30秒
        PoolingHttpClientConnectionManager pollingConnectionManager = new PoolingHttpClientConnectionManager(30, TimeUnit.SECONDS);
        // 总连接数
        pollingConnectionManager.setMaxTotal(1000);
        // 同路由的并发数
        pollingConnectionManager.setDefaultMaxPerRoute(1000);
 
        HttpClientBuilder httpClientBuilder = HttpClients.custom();
        httpClientBuilder.setConnectionManager(pollingConnectionManager);
        // 重试次数，默认是3次，没有开启
        httpClientBuilder.setRetryHandler(new DefaultHttpRequestRetryHandler(2, true));
        // 保持长连接配置，需要在头添加Keep-Alive
        httpClientBuilder.setKeepAliveStrategy(new DefaultConnectionKeepAliveStrategy());
 
//        RequestConfig.Builder builder = RequestConfig.custom();
//        builder.setConnectionRequestTimeout(200);
//        builder.setConnectTimeout(5000);
//        builder.setSocketTimeout(5000);
//
//        RequestConfig requestConfig = builder.build();
//        httpClientBuilder.setDefaultRequestConfig(requestConfig);
 
//        List<Header> headers = new ArrayList<Header>();
        /*headers.add(new BasicHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.16 Safari/537.36"));
        headers.add(new BasicHeader("Accept-Encoding", "gzip,deflate"));
        headers.add(new BasicHeader("Accept-Language", "zh-CN"));
        headers.add(new BasicHeader("Connection", "Keep-Alive"));*/
 
//        httpClientBuilder.setDefaultHeaders(headers);
 
        HttpClient httpClient = httpClientBuilder.build();
 
        // httpClient连接配置，底层是配置RequestConfig
        HttpComponentsClientHttpRequestFactory clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory(httpClient);
        // 连接超时
        clientHttpRequestFactory.setConnectTimeout(5000);
        // 数据读取超时时间，即SocketTimeout
        clientHttpRequestFactory.setReadTimeout(5000);
        // 连接不够用的等待时间，不宜过长，必须设置，比如连接不够用时，时间过长将是灾难性的
        clientHttpRequestFactory.setConnectTimeout(200);
        // 缓冲请求数据，默认值是true。通过POST或者PUT大量发送数据时，建议将此属性更改为false，以免耗尽内存。
        // clientHttpRequestFactory.setBufferRequestBody(false);
 
        // 添加内容转换器
//        List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();
//        messageConverters.add(new StringHttpMessageConverter(Charset.forName("UTF-8")));
//        messageConverters.add(new FormHttpMessageConverter());
//        messageConverters.add(new MappingJackson2XmlHttpMessageConverter());
//        messageConverters.add(new MappingJackson2HttpMessageConverter());
 
        template = new RestTemplate();
        template.setRequestFactory(clientHttpRequestFactory);
        template.setErrorHandler(new DefaultResponseErrorHandler());
 
        logger.info("RestClient初始化完成");
	}
	
	public static synchronized Connection getInstance() {
		if(conn == null) {
			conn = new Connection();
		}
		return conn;
	}
	
	public Map<Object, Object> getApi(String url) {
		return this.getApi(url, null);
	}
	
	public Map<Object, Object> getApi(String url, Map<String, Object> param) {
		Map<Object, Object> result = new HashMap<Object, Object>();
		try {
			this.getToken();
			result = Util.JsonToMap(requestGet(url, param));
			if("1".equals(String.valueOf(result.get("executeStatus")))) {
				if("token001".equals(String.valueOf(result.get("errorCode"))) || "token002".equals(String.valueOf(result.get("errorCode")))) {
					this.getTokenTrue();
					this.requestGet(url, param);
				}
			}
		} catch (ClientProtocolException e) {
			result.put("executeStatus", 1);
			result.put("errorMsg", "GET调用失败！" + e.getMessage());
		} catch (IOException e) {
			result.put("executeStatus", 1);
			result.put("errorMsg", "GET调用失败！" + e.getMessage());
		}
		
		return result;
	}
	
	public Map<Object, Object> postApi(String url) {
		return this.postApi(url, null);
	}

	public Map<Object, Object> postApi(String url, Map<String, Object> param) {
		
		Map<Object, Object> result = new HashMap<Object, Object>();
		try {
			this.getToken();
			result = Util.JsonToMap(requestPost(url, param));
			if("1".equals(String.valueOf(result.get("executeStatus")))) {
				if("token001".equals(String.valueOf(result.get("errorCode"))) || "token002".equals(String.valueOf(result.get("errorCode")))) {
					this.getTokenTrue();
					this.requestGet(url, param);
				}
			}
		} catch (ClientProtocolException e) {
			result.put("executeStatus", 1);
			result.put("errorMsg", "POST调用失败！" + e.getMessage());
		} catch (IOException e) {
			result.put("executeStatus", 1);
			result.put("errorMsg", "POST调用失败！" + e.getMessage());
		}
		
		return result;
	}
	
	
	
//	private Map<Object, Object> request(String url, HttpMethod method, Map<String, Object> params) throws IOException{
//		
//		JSONObject json = null;
//        this.getToken();
//		if(HttpMethod.GET.equals(method)) {
//			json = this.requestGet(url, params);
//		} else {
//			json = this.requestPost(url, params);
//		}
//		if(json != null) {
//			return JsonUtil.parseJsonToMap(json);
//		} else {
//			return null;
//		}
//	}
//	
	private void getToken() {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		if(request.getSession().getAttribute(Constant.SESSION_TOKEN) == null) {
			this.getTokenTrue();
		}
	}
	
	private void getTokenTrue() {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		String api = "/appidValidate/getToken";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("appId", Constant.apiAppId);
		 params.put("appKey", MD5Utils.encryptMD5(Constant.apiKey));
		JSONObject json = null;
		try {
			json = this.requestPost(api, params);
			request.getSession().setAttribute(Constant.SESSION_TOKEN, (String)json.get("values"));
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	public JSONObject requestGet(String url, Map<String, Object> params) throws ClientProtocolException, IOException {
		CloseableHttpClient client = HttpClients.createDefault();
		CloseableHttpResponse response = null;
		JSONObject json = null;
		try {
			//获取parameter信息
			if(params == null) {
				params = WebUtils.getRequestMap();
			}
			HttpGet httpGet = new HttpGet(Constant.apiUrl + this.formatUrl(url, params));
			RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(Constant.SOCKETTIMEOUT).setConnectTimeout(Constant.CONNECTTIMEOUT).build();//设置请求和传输超时时间  
			httpGet.setConfig(requestConfig);
			response = client.execute(httpGet);
			org.apache.http.HttpEntity entity = response.getEntity();
			String str1 = EntityUtils.toString(entity, Consts.UTF_8);
			if(null == str1 || "".equals(str1.trim())) {
				return null;
			} else {
				json = JSONObject.fromObject(str1);
			}
			
		} catch(JSONException e) {
			e.printStackTrace();
		} finally {
			if(null != response) {
				response.close();
			}
			if(null != client) {
				client.close();
			}
		}
		return json;
	}
	
	
    public byte[] getBetyArray(String url, Map<String, Object> params)
    {
        Object result = null;
        String requestApi = Constant.apiUrl + this.formatUrl(url, params);
        try
        {
            RestTemplate client = new RestTemplate();
            result = client.getForObject(requestApi, byte[].class);
        }
        catch (ResourceAccessException e)
        {
            logger.error("[********************远程调用：" + requestApi + "服务连接异常****************]", e.getMessage());
            return null;
        }
        catch (Exception e)
        {
            logger.error("********************远程调用[apiUrl=" + requestApi + "]：********************", e);
            return null;
        }
        return (byte[])result;
    }
	
	
	@SuppressWarnings("unchecked")
	public Map<Object, Object> upload(HttpServletRequest request) {
		ServletFileUpload fileUpload = new ServletFileUpload();
		Map<Object, Object> result = new HashMap<Object, Object>();
		ByteArrayOutputStream out = null;
		InputStream is = null;
		CloseableHttpClient client = HttpClients.createDefault();
		CloseableHttpResponse response = null;
		try {
			FileItemIterator iter = fileUpload.getItemIterator(request);
			//迭代取出
            while (iter.hasNext()){
                FileItemStream item = iter.next();//获取文件流
            	if(item.getName() != null) {
            	
//	                param.put("fileName", item.getName());
	                is = item.openStream();
	                out = new ByteArrayOutputStream();
	                byte [] bytes = new byte[1024];
	                int len = -1;
	                while((len = is.read(bytes)) != -1) {
	                	out.write(bytes, 0, len);
	                }
	               	if(out.size() > Constant.MAX_FILE_SIZE) {
						result.put("executeStatus", 1);
						result.put("errorMsg", "上传文件超出100M已被限制！");
	               	} else {
	               		this.getToken();
	               		ByteArrayBody body = new ByteArrayBody(out.toByteArray(), item.getName()); 
	                    MultipartEntityBuilder setCharset = MultipartEntityBuilder.create();  
                		setCharset.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);  
                        setCharset.addPart("jarFile", body);
                        setCharset.addTextBody("token", (String)request.getSession().getAttribute(Constant.SESSION_TOKEN));
	                    setCharset.setCharset(CharsetUtils.get("UTF-8"));
	            		HttpPost httppost = new HttpPost(Constant.apiUrl + this.formatUrl(request.getServletPath().replace(".api", ""), null));
	            		httppost.setEntity(setCharset.build());
	            		response = client.execute(httppost);
	            		String str1 = EntityUtils.toString(response.getEntity(), Consts.UTF_8);
	        			if(str1 == null 
	        					|| "".equals(str1.trim())) {
	        				return null;
	        			} else {
	        				return JSONObject.fromObject(str1);
	        			}
	               	}
            	}
            }
		} catch (FileUploadException e) {
			result.put("executeStatus", 1);
			result.put("errorMsg", "上传文件失败！" + e.getMessage());
		} catch (IOException e) {
			result.put("executeStatus", 1);
			result.put("errorMsg", "上传文件失败！" + e.getMessage());
		} finally {
			if(out != null) {			
	        	try {out.close();} catch (IOException e) {}
	        }
	        if(is != null) {
				try {is.close();} catch (IOException e) {}
			}
	        if(null != response) {
	        	try {response.close();} catch (IOException e) {}
			}
			if(null != client) {
				try {client.close();} catch (IOException e) {}
			}
		}
		return result;
	}
	/*public void img(HttpServletResponse resp) {
	
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		
		
		this.getToken();
		CloseableHttpClient httpclient = HttpClients.createDefault();  
        try {  
            HttpPost httppost = new HttpPost(Constant.apiUrl + this.formatUrl(request.getServletPath().replace(".api", ""), null));  
            CloseableHttpResponse response = httpclient.execute(httppost);  
            org.apache.http.HttpEntity resEntity = response.getEntity();  
            if (resEntity != null) {  
                // 响应长度  
                        + resEntity.getContentLength());  
                InputStream in = resEntity.getContent();  
                IOUtils.copy(in, resp.getOutputStream());
            }  
        } catch (ClientProtocolException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        } finally {  
            try {  
                httpclient.close();  
            } catch (IOException e) {  
                e.printStackTrace();  
            }  
        }  
	}*/
	
	/*public void download(HttpServletResponse resp) {
	
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		
		
		this.getToken();
		CloseableHttpClient httpclient = HttpClients.createDefault();  
        try {  
            HttpPost httppost = new HttpPost(Constant.apiUrl + this.formatUrl(request.getServletPath().replace(".api", ""), null));  
            CloseableHttpResponse response = httpclient.execute(httppost);  
            org.apache.http.HttpEntity resEntity = response.getEntity();  
            if (resEntity != null) {  
                // 响应长度  
                System.out.println("Response content length: "  
                        + resEntity.getContentLength());  
                InputStream in = resEntity.getContent();  
                IOUtils.copy(in, resp.getOutputStream());
            }  
        } catch (ClientProtocolException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        } finally {  
            try {  
                httpclient.close();  
            } catch (IOException e) {  
                e.printStackTrace();  
            }  
        }  
	}*/
	
	public JSONObject requestPost(String url, Map<String, Object> params) throws ClientProtocolException, IOException {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		
		CloseableHttpClient client = HttpClients.createDefault();
		CloseableHttpResponse response = null;
		JSONObject json = null;
		try {
			//获取parameter信息
			if(params == null) {
				params = WebUtils.getRequestMap();
			}
			HttpPost httpPost = new HttpPost(Constant.apiUrl + url);
		
			RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(Constant.SOCKETTIMEOUT).setConnectTimeout(Constant.CONNECTTIMEOUT).build();//设置请求和传输超时时间  
			httpPost.setConfig(requestConfig);
			
			List<NameValuePair> formparams = new ArrayList<NameValuePair>();  
			if(request.getSession().getAttribute(Constant.SESSION_TOKEN) != null) {
				formparams.add(new BasicNameValuePair("token", (String)request.getSession().getAttribute(Constant.SESSION_TOKEN)));
			}
			if(params != null) {
				for(String key : params.keySet()) {
					if(params.get(key) instanceof String) {
						formparams.add(new BasicNameValuePair(key, (String)params.get(key)));	
					} else {
						formparams.add(new BasicNameValuePair(key, String.valueOf(params.get(key))));
					}
				}
			} else {
				params = WebUtils.getRequestMap();
			}
			UrlEncodedFormEntity uefEntity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);  
			httpPost.setEntity(uefEntity);
			response = client.execute(httpPost);
			org.apache.http.HttpEntity entity = response.getEntity();
			String str1 = EntityUtils.toString(entity, Consts.UTF_8);
			if(str1 == null 
					|| "".equals(str1.trim())) {
				return null;
			} else {
				json = JSONObject.fromObject(str1);
			}
		} catch(JSONException e) {
			e.printStackTrace();
		} finally {
			if(null != response) {
				response.close();
			}
			if(null != client) {
				client.close();
			}
		}
		return json;
	}

//	@SuppressWarnings({ "unchecked", "rawtypes" })
//	private Map<Object, Object> request(String url, HttpMethod method, Map<String, Object> params) {
//		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
//        //获取header信息
//        HttpHeaders requestHeaders = new HttpHeaders();
//        Enumeration<String> headerNames = request.getHeaderNames();
//        while (headerNames.hasMoreElements()) {
//          String key = (String) headerNames.nextElement();
//          String value = request.getHeader(key);
//          requestHeaders.add(key, value);
//        }
//        //获取parameter信息
//        if(params == null) {
//        	params = new HashMap<String, Object>();
//        	Enumeration<String> e = request.getParameterNames();
//    		while(e.hasMoreElements()) {
//    			String key = e.nextElement();
//    			params.put(key, request.getParameter(key));
//    		}
//        }
//        
//        HttpEntity<?> entity = new HttpEntity<Map<String, Object>>(requestHeaders);  
//        this.getToken();
////        params.put("token", this.tonken);
//        ResponseEntity<Map> rss = template.exchange(Constant.apiUrl + this.formatUrl(url, params), method, entity, Map.class);
//        return rss.getBody();
//    }
/*	 	
	@SuppressWarnings("unchecked")
	private String getTonken() throws Exception {
		
		if(tonken == null) {
			String api = "/appidValidate/getToken";
			api += "?appId=" + Constant.apiTonken;
			api += "&appKey=" + Constant.apiKey;
			try {
				Map<Object, Object> result = template.postForObject(Constant.apiUrl + api, null, Map.class);
				if(0 != (Integer)result.get("executeStatus")) {
					throw new Exception(result.get("errorMsg") + api);
				} 
				this.tonken = (String)result.get("values");
			} catch(Exception e) {
				throw e;
			}
		}
		return tonken;
	}*/
	private String formatUrl(String url, Map<String, Object> param) {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		url += "?token=" + (String)request.getSession().getAttribute(Constant.SESSION_TOKEN);
		if(param != null) {
			for(String key : param.keySet()) {
				url += String.format("&%s=%s", key, URLEncoder.encode(String.valueOf(param.get(key))));  
			}
		}
		return url;
	}
	
	
}
