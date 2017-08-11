package com.dyy.service.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.dyy.service.AdConfigureService;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;

@Service
public class AdConfigureServiceImpl implements AdConfigureService {

	@Override
	public Object getAdByParam(Map<String,Object> param,Long areaId) {
		try {
			Map<Object,Object> map =  Connection.getInstance().getApi(ApiUrlConstant.WEBSITE_AD+"/"+areaId,param);
			return (Object)map.get("values");
		} catch (Exception e) {
			return null;
		}
	}

}
