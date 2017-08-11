package com.dyy.service;

import java.util.Map;

/**
 * 
  * 描述:<p></p>
  * @ClassName: 购物车
  * @author pengwei
  * @date 2017年2月23日 下午2:50:11
  *
 */
public interface OrdCartService {

	/**
	 * 
	  * 描述:<p>删除购物项</P>
	  *
	  * @author pengwei
	  * @param @param param
	  * @param @return
	  * @return Map<Object,Object>
	  * @throws
	 */
	public Map<Object, Object> delCartItem(Map<String, Object> param);
	
	/**
	 * 
	  * 描述:<p>加入购物车</P>
	  *
	  * @author pengwei
	  * @param @param param
	  * @param @return
	  * @return Map<Object,Object>
	  * @throws
	 */
	public Map<Object, Object> appendOrdCart(Map<String, Object> param);
	
	/**
	 * 
	  * 描述:<p>获取购物车</P>
	  *
	  * @author pengwei
	  * @param @return
	  * @return Map<Object,Object>
	  * @throws
	 */
	public Map<Object, Object> getOrdCart();
	
	public Map<Object, Object> getOrdCartNum();
	
	/**
	 * 
	  * 描述:<p>购物车确认页面</P>
	  *
	  * @author pengwei
	  * @param @return
	  * @return Map<Object,Object>
	  * @throws
	 */
	public Map<Object, Object> ordCartItemsConfirm();
	
	/**
	 * 
	  * 描述:<p>提交订单</P>
	  *
	  * @author pengwei
	  * @param @return
	  * @return Map<Object,Object>
	  * @throws
	 */
	public Map<Object, Object> submitOrder();
	
}
