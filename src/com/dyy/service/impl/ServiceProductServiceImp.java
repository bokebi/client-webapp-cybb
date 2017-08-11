package com.dyy.service.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.dyy.service.ServiceProductService;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;

@Service
public class ServiceProductServiceImp implements ServiceProductService {

	@Override
	public Map<Object, Object> findProducSkuByProductId(Long productId) {

		return Connection.getInstance().getApi(ApiUrlConstant.PRODUCSKU_PRODUCTID+"/"+productId);
	}
	
	@Override
	public Map<Object, Object> findProducSkuBySkuId(Long skuId) {
		
		return Connection.getInstance().getApi(ApiUrlConstant.PRODUCSKU_SKUID+"/"+skuId);
	}

	@Override
	public Map<Object, Object> queryProductSkuMap(Map<String, Object> map) {
		
		return Connection.getInstance().getApi(ApiUrlConstant.PRODUCSKU_PARAM+"/", map);
	}
	
	@Override
	public Map<Object, Object> queryProductList(Map<String, Object> map) {
		
		return Connection.getInstance().getApi(ApiUrlConstant.PRODUCT_LIST+"/", map);
	}
	
	@Override
	public Map<Object, Object> queryProductSkuList(Long pid) {
		
		return Connection.getInstance().getApi(ApiUrlConstant.PRODUCTSKU_LIST+"/"+pid);
	}
	
	@Override
	public Map<Object, Object> queryProductSkuList() {
		
		return Connection.getInstance().getApi(ApiUrlConstant.PRODUCTSKU_LIST);
	}
	
	@Override
	public Map<Object, Object> loadCategoryTreee(Map<String, Object> map) {
		
		return Connection.getInstance().getApi(ApiUrlConstant.SERVICE_CATEGORY_TREEE+"/",map);
	}
	
	@Override
	public Map<Object, Object> findProductSkuByStatus(String code,Long areaId) {
		
		return Connection.getInstance().getApi(ApiUrlConstant.PRODUCTSKU_BY_STATUS+"/"+code+"/"+areaId);
	}
	@Override
	public Map<Object, Object> findServiceCategorySkuByType(String code,Long areaId,Integer pageSize) {
		
		return Connection.getInstance().getApi(ApiUrlConstant.PRODUCTSKU_BY_TYPE+"/"+code+"/"+areaId+"/"+pageSize);
	}
}
