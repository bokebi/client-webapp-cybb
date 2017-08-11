package com.dyy.service;

import java.util.List;
import java.util.Map;

/**
 * 友情链接
 */
public interface LinkService {

	public List<Object> getLinkByParam(Map<String,Object> param);
	
}
