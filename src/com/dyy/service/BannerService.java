package com.dyy.service;

import java.util.List;

public interface BannerService {
	
	public List<Object> getBannerByParam(Long areaId,String position,String subSystem);

}
