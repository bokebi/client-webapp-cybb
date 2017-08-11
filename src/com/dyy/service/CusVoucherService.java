package com.dyy.service;

import java.util.Map;

public interface CusVoucherService {

	/**
	 * 
	  * 描述:<p>获取用户优惠券</P>
	  *
	  * @author pengwei
	  * @param @param map
	  * @param @return
	  * @return Map<Object,Object>
	  * @throws
	 */
	public Map<Object, Object> findMySysVoucherInfo(Map<String, Object> map);
	
	/**
	 * 
	  * 描述:<p>转赠优惠券</P>
	  *
	  * @author pengwei
	  * @param @param map
	  * @param @return
	  * @return Map<Object,Object>
	  * @throws
	 */
	public Map<Object, Object> donationSysVoucher(Map<String, Object> map);
	
}
