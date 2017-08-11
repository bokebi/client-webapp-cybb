package com.dyy.action.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dyy.action.TopAction;
import com.dyy.service.OrdServiceService;
import com.dyy.utils.Connection;

@RequestMapping("/ordService")
@RestController
public class OrdServiceAction extends TopAction{
	@Autowired
	private OrdServiceService ordService;
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/ordServiceList")
	public Map<Object, Object> ordServiceList(Long page,Long rows){
		Map<String,Object> param = new HashMap<String, Object>();
		if(null != rows) param.put("rows",rows);
    	if(null != page) param.put("page",page);
    	Map<Object, Object> result = ordService.ordServiceList(param);
    	Map<Object, Object> count=Connection.getInstance().getApi("/ordPaymentOrder/findCountQuantity");
    	Map<Object, Object> m = (Map<Object, Object>)result.get("values");
    	if(null != m && m.containsKey("total")){
    		m.put("total",(m.containsKey("records")) ? m.get("records") : 0);
    	}
    	return m;
	}
	@SuppressWarnings("unchecked")
	@RequestMapping("/enterpriseList")
	public Map<Object, Object> enterpriseList(String name,Long page,Long rows){
		Map<String,Object> param = new HashMap<String, Object>();
		if(null != name) param.put("name",name);
		if(null != rows) param.put("rows",rows);
		if(null != page) param.put("page",page);
		Map<Object, Object> result = ordService.enterpriseList(param);
		Map<Object, Object> m = (Map<Object, Object>)result.get("values");
		if(null != m && m.containsKey("total")){
			m.put("total",(m.containsKey("records")) ? m.get("records") : 0);
		}
		return m;
	}
	
	
	
}
