package com.dyy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.dyy.service.BannerService;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;

@Service
public class BannerServiceImpl implements BannerService {

	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getBannerByParam(Long areaId, String position, String subSystem) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.WEBSITE_BANNER+"/"+position+"/"+areaId+"/"+subSystem);
			return (List<Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}

}
