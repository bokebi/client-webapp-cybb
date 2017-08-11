package com.dyy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.dyy.service.CustomerService;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;

@Service
public class CustomerServiceImpl implements CustomerService {

	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getCustomerListByCheckName() {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.CUSTOMER_CHECKNAMELIST);
			return (List<Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getMyAdviseList() {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.CUSTOMER_MYADVISELIST);
			return (List<Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
}
