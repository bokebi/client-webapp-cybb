package com.dyy.service.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.dyy.service.AgreementService;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;

@Service
public class AgreementServiceImpl implements AgreementService {

	@Override
	public Object getAgreementByParam(Long areaId) {
		try {
			Map<Object,Object> map =  Connection.getInstance().getApi(ApiUrlConstant.WEBSITE_AGREEMENT+"/"+areaId);
			return (Object)map.get("values");
		} catch (Exception e) {
			return null;
		}
	}

}
