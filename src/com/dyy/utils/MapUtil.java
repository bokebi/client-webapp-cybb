package com.dyy.utils;

import java.beans.PropertyDescriptor;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.beanutils.PropertyUtilsBean;

public class MapUtil {
	//将javabean实体类转为map类型，然后返回一个map类型的值
    public static Map<String, Object> beanToMap(Object obj) { 
            Map<String, Object> params = new HashMap<String, Object>(0); 
            try { 
                PropertyUtilsBean propertyUtilsBean = new PropertyUtilsBean(); 
                PropertyDescriptor[] descriptors = propertyUtilsBean.getPropertyDescriptors(obj); 
                for (int i = 0; i < descriptors.length; i++) { 
                    String name = descriptors[i].getName(); 
                    if (!"class".equals(name)) { 
                        params.put(name, propertyUtilsBean.getNestedProperty(obj, name)); 
                    } 
                } 
            } catch (Exception e) { 
                e.printStackTrace(); 
            } 
            return params; 
    }
    
    public static Map<String, Object> toMap(Object object) {
        Map<String, Object> data = new HashMap<String, Object>();
        // 将json字符串转换成jsonObject
        JSONObject jsonObject = JSONObject.fromObject(object);
        Iterator ite = jsonObject.keys();
        // 遍历jsonObject数据,添加到Map对象
        while (ite.hasNext()) {
            String key = ite.next().toString();
            String value = jsonObject.get(key).toString();
            data.put(key, value);
        }
        // 或者直接将 jsonObject赋值给Map
        // data = jsonObject;
        return data;
    }
}
