package com.dyy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.dyy.service.LinkService;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;

@Service
public class LinkServiceImpl implements LinkService {

	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getLinkByParam(Map<String,Object> param) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.WEBSITE_LINK,param);
			return (List<Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}

}
