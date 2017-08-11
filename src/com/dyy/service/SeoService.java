package com.dyy.service;

import java.util.Map;

public interface SeoService {
	
	/**
	 * 根据条件获取seo配置
	 * @param param
	 * @param areaId
	 * @return
	 */
	public Object getSeoByParam(Map<String,Object> param,Long areaId);

}
