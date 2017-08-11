package com.dyy.service.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.dyy.service.AboutUsService;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;

@Service
public class AboutUsServiceImpl implements AboutUsService {

	@SuppressWarnings("unchecked")
	@Override
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
