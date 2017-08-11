package com.dyy.service.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.dyy.service.OrdCartService;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;

@Service
public class OrdCartServiceImpl implements OrdCartService {

	@Override
	public Map<Object, Object> delCartItem(Map<String, Object> param) {

		return Connection.getInstance().postApi(ApiUrlConstant.DEL_CART_ITEM+"/",param);
	}

	@Override
	public Map<Object, Object> appendOrdCart(Map<String, Object> param) {

		return Connection.getInstance().postApi(ApiUrlConstant.APPEND_ORD_CART+"/", param);
	}

	@Override
	public Map<Object, Object> getOrdCart() {

		return Connection.getInstance().getApi(ApiUrlConstant.GET_ORD_CART);
	}
	
	@Override
	public Map<Object, Object> getOrdCartNum() {
		
		return Connection.getInstance().getApi(ApiUrlConstant.GET_ORD_CART_NUM);
	}

	@Override
	public Map<Object, Object> ordCartItemsConfirm() {

		return Connection.getInstance().postApi(ApiUrlConstant.ORD_CART_ITEMS_CONFIRM+"/");
	}

	@Override
	public Map<Object, Object> submitOrder() {
		
		return Connection.getInstance().postApi(ApiUrlConstant.SUBMIT_ORDER+"/");
	}
}
