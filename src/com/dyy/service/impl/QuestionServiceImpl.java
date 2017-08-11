package com.dyy.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.dyy.service.QuestionService;
import com.dyy.utils.ApiUrlConstant;
import com.dyy.utils.Connection;

@Service
public class QuestionServiceImpl implements QuestionService {
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getQuestionNewList(Long rows, Long areaId) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.QUESTION_NEW+"/"+areaId+"/"+rows);
			return (List<Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getQuestionByParamList(Long rows, Long areaId, String type) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.QUESTION_YJJDJJGXS+"/"+areaId+"/"+type+"/"+rows);
			return (List<Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@Override
	public Object getQuestionCount() {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.QUESTION_COUNT);
			return (Object) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getAskRecommendListByParam(Long rows,Map<String,Object> param) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.ASKRECOMMEND_LISTBYPARAM+"/"+rows,param);
			return (List<Object> ) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getQuestionGundongList(Long rows, Long areaId) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.QUESTION_GUNDONGLIST+"/"+areaId+"/"+rows);
			return (List<Object> ) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getAllquestionByparam(Long areaId, String typeCode, String type, Map<String, Object> param) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.QUESTION_WTKBYPARAM+"/"+areaId+"/"+typeCode+"/"+type,param);
			map = (Map<Object, Object>) map.get("values");
			Map<String,Object> rtdata = new HashMap<String, Object>();
			rtdata.put("currentPage", map.get("page"));
			rtdata.put("solveTotalPages", map.get("total"));
			rtdata.put("data", map.get("rows"));
			return rtdata;
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String,Object> getQuestionTypeByCode(String code) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.QUESTION_QTYPEBYCODE+"/"+code);
			return (Map<String,Object>)map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getAllQuestionType() {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.QUESTION_ALLQTYPE);
			return (List<Object>)map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getQuestionUserCount(Long userId) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.QUESTION_USERCOUNT+"/"+userId);
			return (Map<String, Object>)map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getQestionById(Long id) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.QUESTION_DETAIL+"/"+id);
			return (Map<String, Object>)map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getHotQuestion(Long areaId, Long rows) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.QUESTION_QHOT+"/"+areaId+"/"+rows);
			return (List<Object>)map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getQuestionListByParam(Map<String, Object> param, Long areaId) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.QUESTION_LISTBYPARAM+"/"+areaId,param);
			return (Map<String, Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> savePraiseStep(Long answerId, String type) {
		try {
			Map<Object, Object> map = Connection.getInstance().postApi(ApiUrlConstant.QUESTION_PRAISESTEP+"/"+answerId+"/"+type);
			return (Map<String, Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getAskrecommentaccountInfo(Long id) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.ASKRECOMMEND_BYID+"/"+id);
			return (Map<String, Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getAnswerByAskremmentaccountId(Long id,Map<String,Object> param) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.ASKRECOMMEND_ANSWERINFOBYID+"/"+id,param);
			return (Map<String, Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getNewQuestionByCustomerId(Long cusid, Integer type) {
		try {
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("userId", cusid);
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.QUESTIONUSER_NEWINFOBYID+"/"+type,param);
			return (List<Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getQuestionByCustomerId(Integer type, Map<String, Object> param) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.QUESTIONUSER_QUESTIONBYID+"/"+type,param);
			return (Map<String, Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getCustomerInfoById(Long id) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.QUESTIONUSER_BYID+"/"+id);
			return (Map<String, Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> getAnswerByCustomerId(Long customerId, Map<String, Object> param) {
		try {
			Map<Object, Object> map = Connection.getInstance().getApi(ApiUrlConstant.QUESTIONUSER_ANSWERBYID+"/"+customerId,param);
			return (Map<String, Object>) map.get("values");
		} catch (Exception e) {
			return null;
		}
	}
}
