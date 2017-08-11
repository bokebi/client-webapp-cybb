package com.dyy.service.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.dyy.service.ExternalService;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;

@Service
public class ExternalServiceImpl implements ExternalService {

	@Override
	public Object getExternalByParam(Map<String, Object> param, Long areaId) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.WEBSITE_EXTERNAL+"/"+areaId,param);
			return map.get("values");
		} catch (Exception e) {
			return null;
		}
	}

}
