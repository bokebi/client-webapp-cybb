package com.dyy.service;

import java.util.List;
import java.util.Map;

public interface ArticleService {
	
	/**
	 * 获取文章分类
	 * @return
	 */
	public List<Object> getArticleAlltype();
	
	/**
	 * 根据查询条件获取文章分类
	 * @param param
	 * @return
	 */
	public Map<String, Object> getArticleTypeByParam(Map<String,Object> param);
	
	/**
	 * 根据查询条件获取文章
	 * @return
	 */
	public Map<Object,Object> getArticleByParam(Map<String, Object> param,Long areaId);
	
	/**
	 * 根据查询条件获取文字关键词
	 * @param param
	 * @param areaId
	 * @return
	 */
	public Map<Object, Object> getArticleKeyWordByParam(Map<String, Object> param,Long areaId);

	/**
	 * 查询文章详情页面相关数据
	 * @param param
	 * @param areaId
	 * @return
	 */
	public Map<Object, Object> getArticleDetail(Map<String, Object> param,Long areaId,Long id);
	
	/**
	 * 获取所有文章
	 * @param areaId
	 * @return
	 */
	public List<Object> getArticleAll(Long areaId);
	
	/**
	 * 根据标签获取文章
	 * @param id
	 * @return
	 */
	public Map<Object, Object> getArticleByLabel(Long id);
	
	/**
	 * 获取所有标签
	 * @param areaId
	 * @return
	 */
	public List<Object> getAllArticleLabel(Long areaId);

		/**
	 * 获取全部文章分类
	 * @return
	 */
	public List<Object> getArticleAlltype(Map<String,Object> param);
}
