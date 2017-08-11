package com.dyy.service.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.dyy.service.CusVoucherService;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;

@Service
public class CusVoucherServiceImpl implements CusVoucherService {

	@Override
	public Map<Object, Object> findMySysVoucherInfo(Map<String, Object> map) {

		return Connection.getInstance().getApi(ApiUrlConstant.FIND_MY_SYSVOUCHER_INFO_LIST+"/",map);
	}

	@Override
	public Map<Object, Object> donationSysVoucher(Map<String, Object> map) {

		return Connection.getInstance().getApi(ApiUrlConstant.DONATION_SYSVOUCHER+"/", map);
	}

}
