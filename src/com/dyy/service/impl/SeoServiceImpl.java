package com.dyy.service.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.dyy.service.SeoService;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;

@Service
public class SeoServiceImpl implements SeoService {

	@Override
	public Object getSeoByParam(Map<String, Object> param, Long areaId) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.WEBSITE_SEO+"/"+areaId,param);
			return (Object) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}

}
