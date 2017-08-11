package com.dyy.service;

import java.util.Map;

public interface ExternalService {
	
	public Object getExternalByParam(Map<String,Object> param,Long areaId);

}
