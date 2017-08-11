package com.dyy.service;

import java.util.Map;

/**
 * 
  * 描述:<p></p>
  * @ClassName: 套餐
  * @author pengwei
  * @date 2017年3月13日 下午6:01:40
  *
 */
public interface ServiceProductComboService {

	/**
	 * 
	  * 描述:<p>套餐列表</P>
	  *
	  * @author pengwei
	  * @param @param size
	  * @param @param areaId
	  * @param @return
	  * @return Map<Object,Object>
	  * @throws
	 */
	public Map<Object, Object> findProductComboVoList(Long size, Long areaId);

	/**
	 * 
	  * 描述:<p>套餐详情</P>
	  *
	  * @author pengwei
	  * @param @param id
	  * @param @return
	  * @return Map<Object,Object>
	  * @throws
	 */
	public Map<Object, Object> findProductComboVoById(Long id);

}
