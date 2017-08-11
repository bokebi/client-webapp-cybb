package com.dyy.service;

public interface AboutUsService {
	
	/**
	 * 根据地区id获取关于我们信息
	 * @param areaId
	 * @return
	 */
	public String getAboutUsContentByAreaId(Long areaId);

}
