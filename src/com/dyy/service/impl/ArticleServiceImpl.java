package com.dyy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.dyy.service.ArticleService;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;

@Service
public class ArticleServiceImpl implements ArticleService {

	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getArticleAlltype() {
		try {
			Map<Object,Object> map = Connection.getInstance().getApi(ApiUrlConstant.ARTICLE_ALLTYPE);
			return (List<Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getArticleTypeByParam(Map<String, Object> param) {
		try {
			Map<Object,Object> map = Connection.getInstance().getApi(ApiUrlConstant.ARTICLE_ALLTYPE,param);
			List<Map<String, Object>> list = (List<Map<String, Object>>) map.get("values");
			return list.get(0);
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<Object,Object> getArticleByParam(Map<String, Object> param,Long areaId) {
		try {
			Map<Object,Object> map = Connection.getInstance().getApi(ApiUrlConstant.ARTICLE_PARAM+"/"+areaId,param);
			return (Map<Object, Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public Map<Object, Object> getArticleKeyWordByParam(Map<String, Object> param, Long areaId) {
		try {
			return Connection.getInstance().getApi(ApiUrlConstant.ARTICLE_KEYCODE+"/"+areaId,param);
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<Object, Object> getArticleDetail(Map<String, Object> param, Long areaId,Long id) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.ARTICLE_DETAIL+"/"+areaId+"/"+id,param);
			return (Map<Object, Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getArticleAll(Long areaId) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.ARTICLE_ALL+"/"+areaId);
			return (List<Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<Object, Object> getArticleByLabel(Long id) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.ARTICLE_LABEL+"/"+id);
			return (Map<Object, Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getAllArticleLabel(Long areaId) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.ARTICLE_ALLLABEL+"/"+areaId);
			return (List<Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getArticleAlltype(Map<String,Object> param) {
		try {
			Map<Object,Object> map = Connection.getInstance().getApi(ApiUrlConstant.ARTICLE_ALLTYPE_DETAIL+"/"+param.get("rows")+"/"+param.get("articlerows"));
			return (List<Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
}
