package com.dyy.action.website;

import java.util.Map;

import org.springframework.web.bind.annotation.RestController;

import com.dyy.entity.Address;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;

/**
 *  广告配置
 */
@RestController
public class AdAction {
	
	@SuppressWarnings("unchecked")
	public String getAboutUsContentByAreaId(Long areaId) {
		try {
			Map<Object,Object> map =  Connection.getInstance().getApi(ApiUrlConstant.ABOUTUS_CONTENT+areaId);
			map = (Map<Object, Object>) map.get("values");
			return (String) map.get("content");	
		} catch (Exception e) {
			return null;
		}
	}
}
