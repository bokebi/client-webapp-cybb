package com.dyy.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.dyy.service.AdConfigureService;
import com.dyy.service.ExternalService;
import com.dyy.service.LinkService;
import com.dyy.service.OrdCartService;
import com.dyy.service.SeoService;
import com.dyy.service.ServiceProductService;
import com.dyy.utils.AreaUtils;
import com.dyy.utils.Connection;
import com.dyy.utils.Constant;

public class TopAction 
{
	@Autowired
	private AdConfigureService adConfigureService;
	
	@Autowired
	private ServiceProductService productService;
	
	@Autowired
	private LinkService linkService;
	
	@Autowired
	private SeoService seoService;
	
	@Autowired
	private ExternalService externalService;
	
	@Autowired
	public OrdCartService ordCartService;
	
    @ModelAttribute("sysCompanyResult")
    public Map<Object,Object> sysCompanyResult(HttpServletRequest request)
    {
    	return Connection.getInstance().getApi("/sysCompany/getSysCompany");
    }
    
    @ModelAttribute("areaList")
    public Map<Object,Object> areaList(HttpServletRequest request)
    {
    	return Connection.getInstance().getApi("/area/areaList/2");
    }
    
    /**
	 * 
	  * 描述:<p>全部服务 ,主营服务</P>
	  *
	  * @author pengwei
	  * @param @param request
	  * @param @return
	  * @return Map<Object,Object>
	  * @throws
	 */
    @ModelAttribute("categoryTreee")
	public Object allCategory(HttpServletRequest request){
    	Map<String,Object> param = new HashMap<String, Object>();
		param.put("areaId", AreaUtils.currentAreaId(request));
		 return productService.loadCategoryTreee(param).get("values");
    }
    
    /**
     * 首页广告
     * @param request
     * @return
     */
    @ModelAttribute("adinfo")
    public Object adInfo(HttpServletRequest request){
    	Map<String,Object> param = new HashMap<String, Object>();
		param.put("identifier", "index_top");
		return adConfigureService.getAdByParam(param,AreaUtils.currentAreaId(request));
    }
    
	/**
	 * 友情链接
	 * @param request
	 * @return
	 */
	@ModelAttribute("friendshipLinkList")
    public List<Object> friendshipLinkList(HttpServletRequest request){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("areaId", AreaUtils.currentAreaId(request));		
		param.put("linkType","0");
		return linkService.getLinkByParam(param);
    }
	
	/**
	 * seo信息
	 * @param request
	 * @return
	 */
	@ModelAttribute("seoinfo")
    public Object seoinfo(HttpServletRequest request){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("code","index");
		return seoService.getSeoByParam(param,AreaUtils.currentAreaId(request));
    }
	
	/**
	 * qq外部代码信息
	 * @param request
	 * @return
	 */
	@ModelAttribute("qqexternalinfo")
    public Object qqexternalinfo(HttpServletRequest request){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("identifier","qq_code");
		return externalService.getExternalByParam(param,AreaUtils.currentAreaId(request));
    }
	
	/**
	 * baidu商桥外部代码信息
	 * @param request
	 * @return
	 */
	@ModelAttribute("baiduexternalinfo")
    public Object baiduexternalinfo(HttpServletRequest request){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("identifier","qiao_code");
		return externalService.getExternalByParam(param,AreaUtils.currentAreaId(request));
    }
	
	/**
	 * 备案号信息
	 * @param request
	 * @return
	 */
	@ModelAttribute("recordnoexternalinfo")
    public Object recordnoexternalinfo(HttpServletRequest request){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("identifier","record_no");
		return externalService.getExternalByParam(param,AreaUtils.currentAreaId(request));
    }
	
	/**
	 * 当前地区id
	 * @param request
	 * @return
	 */
	@ModelAttribute("currentareaid")
	public Long currentareaid(HttpServletRequest request){
		return AreaUtils.currentAreaId(request);
	} 
	
	/**
	 * 热门产品
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@ModelAttribute("hotSkuList")
	public List<Object> hotSkuList(HttpServletRequest request){
		return (List<Object>) productService.findProductSkuByStatus("hot",AreaUtils.currentAreaId(request)).get("values");
	}
	/**
	 * 推荐产品
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@ModelAttribute("commendList")
	public List<Object> commendList(HttpServletRequest request){
		return (List<Object>) productService.findProductSkuByStatus("commend",AreaUtils.currentAreaId(request)).get("values");
	}
	/**
	 * 推荐产品
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@ModelAttribute("topList")
	public List<Object> topList(HttpServletRequest request){
		return (List<Object>) productService.findProductSkuByStatus("top",AreaUtils.currentAreaId(request)).get("values");
	}
	
	@ModelAttribute("ordCartNum")
	public Object getOrdCartNum(HttpServletRequest request){
		return ordCartService.getOrdCartNum().get("values");
	}
    
   //获取所有子站点信息
	@ModelAttribute("allZZDList")
	public Map<Object, Object> allZZDList(HttpServletRequest request){
    	Map<String,Object> param = new HashMap<String, Object>();
		return Connection.getInstance().getApi("/website/getWebsiteListByParam", param);
    }
	
	@SuppressWarnings("unchecked")
	@ModelAttribute("currZd")
	public Object currZd(HttpServletRequest request){
    	Map<String,Object> map = (Map<String, Object>) request.getSession().getAttribute(Constant.SITE);
		return map;
    }
	
	/**
	 * seo信息
	 * @param request
	 * @return
	 */
	@ModelAttribute("currPhone")
    public Object currPhone(HttpServletRequest request){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("code","phone");
		return seoService.getSeoByParam(param,AreaUtils.currentAreaId(request));
    }
	
	@ModelAttribute("kfinfo")
	public Object kfinfo(HttpServletRequest request) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("code","kfinfo");
		return seoService.getSeoByParam(param,AreaUtils.currentAreaId(request));
	}
}
