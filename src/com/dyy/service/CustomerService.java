package com.dyy.service;

import java.util.List;

/**
 * 用户业务类
 *
 */
public interface CustomerService {
	
	/**
	 * 查询核名数据
	 * @return
	 */
	public List<Object> getCustomerListByCheckName();
	
	/**
	 * 查询我的意见反馈数据
	 * @return
	 */
	public List<Object> getMyAdviseList();

}
