package com.dyy.service.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.dyy.service.ServiceProductComboService;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;
@Service
public class ServiceProductComboServiceImpl implements
		ServiceProductComboService {

	@Override
	public Map<Object, Object> findProductComboVoList(Long size, Long areaId) {

		return Connection.getInstance().getApi(ApiUrlConstant.PRODUCT_COMBOVO_LIST+"/"+size+"/"+areaId);
	}

	@Override
	public Map<Object, Object> findProductComboVoById(Long id) {

		return Connection.getInstance().getApi(ApiUrlConstant.PRODUCT_COMBOVO_BYID+"/"+id);
	}

}
