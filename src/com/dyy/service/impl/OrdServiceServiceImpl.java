package com.dyy.service.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.dyy.service.OrdServiceService;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;

@Service
public class OrdServiceServiceImpl implements OrdServiceService {

	@Override
	public Map<Object, Object> ordServiceList(Map<String, Object> param) {
		Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.ORD_SERVICE_LIST+"/",param);
		return map;
	}
	@Override
	public Map<Object, Object> enterpriseList(Map<String, Object> param) {
		Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.ENTERPRISE_LIST+"/",param);
		return map;
	}

}
