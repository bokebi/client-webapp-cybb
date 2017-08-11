package com.dyy.action.area;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dyy.utils.Connection;



@RestController
@RequestMapping("/sysarea")
public class AreaAction {
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/areaList/{level}",method=RequestMethod.POST)
	@ResponseBody
	public List<Object> areaList(@PathVariable Long level){
    	Map<Object, Object> result = Connection.getInstance().getApi("/area/areaList/"+level);
    	return (List<Object>) result.get("values");
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/areasListByParent/{parent}", method = RequestMethod.GET)
	public @ResponseBody List<Object> findListByParentId(@PathVariable Long parent) {
		Map<Object, Object> result = Connection.getInstance().getApi("/area/areasListByParent/"+parent);
    	return (List<Object>) result.get("values");
	}

}
