package com.dyy.service;

import java.util.List;
import java.util.Map;

public interface QuestionService {
	
	/**
	 * 获取最新问答信息
	 * @param rows
	 * @param areaId
	 * @return
	 */
	public List<Object> getQuestionNewList(Long rows,Long areaId);
	
	/**
	 * 获取已解决，待解决，高悬赏问题
	 * @param rows
	 * @param areaId
	 * @param type
	 * @return
	 */
	public List<Object> getQuestionByParamList(Long rows,Long areaId,String type);

	/**
	 * 获取问答统计数据
	 * @return
	 */
	public Object getQuestionCount();
	
	/**
	 * 查询推荐会计列表
	 * @param rows
	 * @param param
	 * @return
	 */
	public List<Object> getAskRecommendListByParam(Long rows,Map<String,Object> param);
	
	/**
	 * 获取问答首页滚动列表
	 * @param rows
	 * @param areaId
	 * @return
	 */
	public List<Object> getQuestionGundongList(Long rows,Long areaId);
	
	/**
	 * 问题库-根据条件获取数据
	 * @param areaId
	 * @param typeCode
	 * @param type
	 * @param param
	 * @return
	 */
	public Map<String,Object> getAllquestionByparam(Long areaId,String typeCode,String type,Map<String,Object> param);
	
	/**
	 * 根据code获取问题类型
	 * @param code
	 * @return
	 */
	public Map<String,Object> getQuestionTypeByCode(String code);
	
	/**
	 * 获取所有的问题类型
	 * @return
	 */
	public List<Object> getAllQuestionType();
	
	/**
	 * 获取用户问答相关统计信息
	 * @param userId
	 * @return
	 */
	public Map<String,Object> getQuestionUserCount(Long userId);
	
	/**
	 * 根据id获取问题详信息
	 * @param id
	 * @return
	 */
	public Map<String,Object> getQestionById(Long id);
	
	/**
	 * 查找热门问题
	 * @param areaId
	 * @param rows
	 * @return
	 */
	public List<Object> getHotQuestion(Long areaId,Long rows);
	
	/**
	 * 根据查询条件获取问答列表
	 * @param param
	 * @param areaId
	 * @return
	 */
	public Map<String,Object> getQuestionListByParam(Map<String,Object> param,Long areaId);
	
	/**
	 * 赞踩操作
	 * @param answerId
	 * @param type
	 * @return
	 */
	public Map<String,Object> savePraiseStep(Long answerId,String type);
	
	/**
	 * 根据id获取会计信息
	 * @param id
	 * @return
	 */
	public Map<String,Object> getAskrecommentaccountInfo(Long id);
	
	/**
	 * 根据会计id获取回复信息
	 * @param id
	 * @return
	 */
	public Map<String,Object> getAnswerByAskremmentaccountId(Long id,Map<String,Object> param);
	
	/**
	 * 根据条件获取用户问答最新信息
	 * @param cusid
	 * @param type
	 * @return
	 */
	public List<Object> getNewQuestionByCustomerId(Long cusid,Integer type);
	
	/**
	 * 根据条件获取用户的所有提问信息
	 * @param type
	 * @param param
	 * @return
	 */
	public Map<String,Object> getQuestionByCustomerId(Integer type,Map<String,Object> param);
	
	/**
	 * 根据id获取用户信息
	 * @param id
	 * @return
	 */
	public Map<String,Object> getCustomerInfoById(Long id);
	
	/**
	 * 根据id获取用户回复信息
	 * @param customerId
	 * @param param
	 * @return
	 */
	public Map<String,Object> getAnswerByCustomerId(Long customerId,Map<String,Object> param);
 }
