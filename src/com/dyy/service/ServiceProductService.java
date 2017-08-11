package com.dyy.service;

import java.util.Map;

public interface ServiceProductService {

	/**
	 * 
	  * 描述:<p>根据产品id查询商品</P>
	  *
	  * @author pengwei
	  * @param @param productId
	  * @param @return
	  * @return Map<Object,Object>
	  * @throws
	 */
	public Map<Object, Object> findProducSkuByProductId(Long productId);
	
	/**
	 * 
	  * 描述:<p>根据商品id查询商品</P>
	  *
	  * @author pengwei
	  * @param @param skuId
	  * @param @return
	  * @return Map<Object,Object>
	  * @throws
	 */
	public Map<Object, Object> findProducSkuBySkuId(Long skuId);
	
	
	
	/**
	 * 
	  * 描述:<p>根据服务id、地区、所选服务属性查询商品</P>
	  *
	  * @author pengwei
	  * @param @param map
	  * @param @return
	  * @return Map<Object,Object>
	  * @throws
	 */
	public Map<Object, Object> queryProductSkuMap(Map<String, Object> map);
	
	/**
	 * 
	  * 描述:<p>根据条件查询产品列表</P>
	  *
	  * @author pengwei
	  * @param @param map
	  * @param @return
	  * @return Map<Object,Object>
	  * @throws
	 */
	public Map<Object, Object> queryProductList(Map<String, Object> map);
	
	public Map<Object, Object> queryProductSkuList(Long pid);
	
	public Map<Object, Object> queryProductSkuList();
	
	/**
	 * 
	  * 描述:<p>获取服务分类树</P>
	  *
	  * @author pengwei
	  * @param @param areaId
	  * @param @return
	  * @return Map<Object,Object>
	  * @throws
	 */
	public Map<Object, Object> loadCategoryTreee(Map<String, Object> map);
	
	/**
	 * 
	  * 描述:<p>根据位置查询商品</P>
	  *
	  * @author pengwei
	  * @param @param map
	  * @param @return
	  * @return  code	位置 top 置顶 hot 热门 commend 推荐
	  * @throws
	 */
	public Map<Object, Object> findProductSkuByStatus(String code,Long areaId);
	/**
	 * 
	 * 描述:<p>根据位置数量查询商品</P>
	 *
	 * @author pengwei
	 * @param @param map
	 * @param @return
	 * @return  code	位置 top 置顶 hot 热门 commend 推荐
	 * @throws
	 */
	public Map<Object, Object> findServiceCategorySkuByType(String code,Long areaId,Integer pageSize);
}
