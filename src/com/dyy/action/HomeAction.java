package com.dyy.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.service.ArticleService;
import com.dyy.service.BannerService;
import com.dyy.service.CustomerService;
import com.dyy.service.QuestionService;
import com.dyy.service.ServiceProductComboService;
import com.dyy.service.ServiceProductService;
import com.dyy.utils.AreaUtils;
import com.dyy.utils.Connection;

@RestController
public class HomeAction extends TopAction {

	private static final Logger logger = LoggerFactory.getLogger(HomeAction.class);

	@Value("${api_url}")
	private String apiUrl;
	
	@Autowired
	private BannerService bannerService;
	
	@Autowired
	private ServiceProductService productService;
	
	@Autowired
	private ServiceProductComboService comboService;
	
	@Autowired
	private ArticleService articleService;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private QuestionService questionService;
	
	@RequestMapping("/index")
	public ModelAndView index(HttpServletRequest request,ModelAndView view) {
		view.setViewName("/index");
		view.addObject("beel", "本产品为Beel");
		view.addObject("reslut", Connection.getInstance().getApi("/area/areaList/2"));
		//首页banner信息
		view.addObject("bannerlist",bannerService.getBannerByParam(AreaUtils.currentAreaId(request), "index", "pc"));
		
		//首页文章分类信息
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("showIndex","0");
		Map<String,Object> type = articleService.getArticleTypeByParam(param);
		view.addObject("articletype",type);
		
		//根据分类查找文章
		if(null != type){
			param.clear();
			param.put("categoryCode", type.get("categoryCode"));
			param.put("page", 1L);
			param.put("rows", 10L);
			view.addObject("articlebytype",articleService.getArticleByParam(param,AreaUtils.currentAreaId(request)));
		}
		
		Map<String,Object> param2 = new HashMap<String, Object>();
		param2.put("rows","9");
		param2.put("articlerows","4");
		view.addObject("articlebytypes",articleService.getArticleAlltype(param2));
		
		//热门产品
		view.addObject("serviceCategorySku",productService.findServiceCategorySkuByType("hot",AreaUtils.currentAreaId(request),10).get("values"));
		
		//热门套餐
		view.addObject("comboList",comboService.findProductComboVoList(3L,AreaUtils.currentAreaId(request)).get("values"));
		
		//推荐产品
		view.addObject("serviceCommendSku",productService.findServiceCategorySkuByType("commend",AreaUtils.currentAreaId(request),10).get("values"));
		
		//核名数据
		view.addObject("cusQueryCompanyNameList",customerService.getCustomerListByCheckName());
		
		// 最新问答列表
		view.addObject("newlist",questionService.getQuestionNewList(5L, AreaUtils.currentAreaId(request)));
		return view;
	}
	
	@RequestMapping("/siteTransfer/{areaId}")
	public void siteTransfer(Long areaId, HttpServletResponse response) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("areaId", areaId);
		Map<Object, Object> all = Connection.getInstance().getApi("/website/getWebsiteListByParam", param);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> list = (List<Map<String, Object>>)all.get("values");
		if(list != null && list.size() > 0) {
			try {
				response.sendRedirect(list.get(0).get("websiteUrl").toString());
			} catch (IOException e) {
				logger.error(e.getMessage(), e);
			}
		}
		
	}
}