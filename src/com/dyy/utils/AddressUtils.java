package com.dyy.utils;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.JSONObject;

import com.dyy.entity.Address;  
  
public class AddressUtils {  
	
    /** 
     * 获取地址 
     * @param params
     * @return 
     * @throws Exception 
     */  
    public static Address getAddress(String ip) throws Exception{  
          
        String path = "http://ip.taobao.com/service/getIpInfo.php";  
          
        String returnStr = AddressUtils.getRs(path, "ip=" + ip, "UTF-8");  
          
        JSONObject json=null;  
          
        if(returnStr != null){  
              
            json = new JSONObject(returnStr);  
              
            Address add = new Address();
            if("0".equals(json.get("code").toString())){  
                 
                //buffer.append(decodeUnicode(json.optJSONObject("data").getString("country")));//国家  
                  
                //buffer.append(decodeUnicode(json.optJSONObject("data").getString("area")));//地区  
                  
            	add.setRegion(Util.decodeUnicode(json.optJSONObject("data").getString("region")));//省份  
                  
            	add.setCity(Util.decodeUnicode(json.optJSONObject("data").getString("city")));//市区  
                  
                add.setCounty(Util.decodeUnicode(json.optJSONObject("data").getString("county")));//地区  
                  
                add.setIsp(Util.decodeUnicode(json.optJSONObject("data").getString("isp")));//ISP公司  
                  
                return add;  
            } 
        } 
        return null;  
          
    }  
    /** 
     * 从url获取结果 
     * @param path 
     * @param params 
     * @param encoding 
     * @return 
     */  
    private static String getRs(String path, String params, String encoding){  
          
        URL url = null;  
          
        HttpURLConnection connection = null;  
              
        try {  
              
            url = new URL(path);  
                  
            connection = (HttpURLConnection)url.openConnection();// 新建连接实例  
                  
            connection.setConnectTimeout(2000);// 设置连接超时时间，单位毫 
              
            connection.setReadTimeout(2000);// 设置读取数据超时时间，单位毫 
              
            connection.setDoInput(true);// 是否打开输出 true|false  
              
            connection.setDoOutput(true);// 是否打开输入流true|false  
              
            connection.setRequestMethod("POST");// 提交方法POST|GET  
              
            connection.setUseCaches(false);// 是否缓存true|false  
              
            connection.connect();// 打开连接端口  
              
            DataOutputStream out = new DataOutputStream(connection.getOutputStream());  
              
            out.writeBytes(params);  
              
            out.flush();  
              
            out.close();  
              
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(),encoding));  
              
            StringBuffer buffer = new StringBuffer();  
              
            String line = "";  
              
            while ((line = reader.readLine())!= null) {  
                buffer.append(line); 
            }  
              
            reader.close();  
              
            return buffer.toString();  
              
        } catch (Exception e) {  
              
        }finally{
            connection.disconnect();// 关闭连接  
        }  
          
        return null;  
    }
}  