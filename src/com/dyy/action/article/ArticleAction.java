package com.dyy.action.article;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.service.ArticleService;
import com.dyy.service.SeoService;
import com.dyy.utils.AreaUtils;

/**
 * 文字相关action
 * 
 */
@RestController
public class ArticleAction extends TopAction {
	
	@Autowired
	private ArticleService articleService;
	
	@Autowired
	private SeoService seoService;

	/**
	 * 全部文章
	 * @param request
	 * @param view
	 * @return
	 */
	@RequestMapping(value="/wz/all")
	public ModelAndView AllArticle(HttpServletRequest request,ModelAndView view){
		Map<String,Object> map = new HashMap<String, Object>();
		String searchValue = request.getParameter("searchValue");
		if (StringUtils.isNotEmpty(searchValue)){
	        try
	        {
	         // 判断当前字符串的编码格式
	            if (searchValue.equals(new String(searchValue.getBytes("ISO8859-1"), "ISO8859-1")))
	            {
	                searchValue = new String(searchValue.getBytes("ISO8859-1"), "UTF-8");
	            }
	            map.put("searchValue",searchValue);
	        }
	        catch (Exception e)
	        {
	            
	        }
		}
		buidArticle(map,view,AreaUtils.currentAreaId(request));
		return view;
	}
	
	/**
	 * 全部文章-点击页数
	 * @param request
	 * @param view
	 * @return
	 */
	@RequestMapping(value="/wz/all/page_{page}")
	public ModelAndView AllArticlePage(HttpServletRequest request,ModelAndView view,@PathVariable Long page){
		Map<String,Object> map = new HashMap<String, Object>();
		String searchValue = request.getParameter("searchValue");
		if (StringUtils.isNotEmpty(searchValue)){
	        try
	        {
	         // 判断当前字符串的编码格式
	            if (searchValue.equals(new String(searchValue.getBytes("ISO8859-1"), "ISO8859-1")))
	            {
	                searchValue = new String(searchValue.getBytes("ISO8859-1"), "UTF-8");
	            }
	            map.put("searchValue",searchValue);
	        }
	        catch (Exception e)
	        {
	            
	        }
		}
		map.put("page", page);
		buidArticle(map,view,AreaUtils.currentAreaId(request));
		return view;
	}
	
	/**
	 * 按文章类型搜索
	 * @param request
	 * @param view
	 * @param code
	 * @return
	 */
	@RequestMapping(value="/wz/type/{code}")
	public ModelAndView ArticleBytype(HttpServletRequest request,ModelAndView view,@PathVariable String code){
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("code", code);
		buidArticle(map,view,AreaUtils.currentAreaId(request));
		//seo
		Map<String,Object> param2 = new HashMap<String, Object>();
		param2.put("code",code+".html");
		Object obj = seoService.getSeoByParam(param2,AreaUtils.currentAreaId(request));
		view.addObject("articleSeo",obj);
		return view;
	}
	
	/**
	 * 按文章类型搜索-点击页数
	 * @param request
	 * @param view
	 * @param code
	 * @param page
	 * @return
	 */
	@RequestMapping(value="/wz/type/{code}/page_{page}")
	public ModelAndView ArticleBytypePage(HttpServletRequest request,ModelAndView view,@PathVariable String code,@PathVariable Long page){
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("code", code);
		map.put("page", page);
		buidArticle(map,view,AreaUtils.currentAreaId(request));
		return view;
	}
	
	/**
	 * 按文章关键词搜索
	 * @param request
	 * @param view
	 * @param key
	 * @return
	 */
	@RequestMapping(value="/wz/key/{key}")
	public ModelAndView ArticleBykey(HttpServletRequest request,ModelAndView view,@PathVariable String key){
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("key", key);
		buidArticle(map,view,AreaUtils.currentAreaId(request));
		return view;
	}
	
	/**
	 * 按文章关键词搜索-点击页数
	 * @param request
	 * @param view
	 * @param key
	 * @return
	 */
	@RequestMapping(value="/wz/key/{key}/page_{page}")
	public ModelAndView ArticleBykeyPage(HttpServletRequest request,ModelAndView view,@PathVariable String key,@PathVariable Long page){
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("key", key);
		map.put("page", page);
		buidArticle(map,view,AreaUtils.currentAreaId(request));
		return view;
	}
	
	
	@RequestMapping(value="/wz/{id}")
	public ModelAndView ArticleDetail(HttpServletRequest request,ModelAndView view,@PathVariable Long id){
		view.setViewName("/subject/subjectDetail");
		view.addObject("detail",articleService.getArticleDetail(null,AreaUtils.currentAreaId(request), id));
		//文章分类
		List<Object> list = articleService.getArticleAlltype();
		view.addObject("alltype",list);
		
		Map<Object,Object> mapkey = articleService.getArticleKeyWordByParam(null,AreaUtils.currentAreaId(request));
		view.addObject("articleKeys",mapkey);
		return view;
	}
	
	/**
	 * 全部文章
	 * @param request
	 * @param view
	 * @return
	 */
	@RequestMapping(value="/wz/more")
	public ModelAndView ArticleMore(HttpServletRequest request,ModelAndView view){
		view.setViewName("/subject/subjectMore");
		view.addObject("more",articleService.getArticleAll(AreaUtils.currentAreaId(request)));		
		//文章分类
		List<Object> list = articleService.getArticleAlltype();
		view.addObject("alltype",list);
		//关键词
		Map<Object,Object> mapkey = articleService.getArticleKeyWordByParam(null,AreaUtils.currentAreaId(request)); 
		view.addObject("articleKeys",mapkey);
		return view;
	}
	
	/**
	 * 根据标签获取文章
	 * @param request
	 * @param view
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/wz/tag/{id}")
	public ModelAndView ArticleLabel(HttpServletRequest request,ModelAndView view,@PathVariable Long id){
		view.setViewName("/subject/labelDetail");
		view.addObject("result",articleService.getArticleByLabel(id));
		return view;
	}
	
	/**
	 * 获取全部标签
	 * @param request
	 * @param view
	 * @return
	 */
	@RequestMapping(value="/wz/tag")
	public ModelAndView AllArticleLabel(HttpServletRequest request,ModelAndView view){
		view.setViewName("/subject/labelCenter");
		view.addObject("result",articleService.getAllArticleLabel(AreaUtils.currentAreaId(request)));
		return view;
	}
	
	/**
	 * 装配页面数据
	 * @param map
	 * @param view
	 */
	@SuppressWarnings("unchecked")
	public void buidArticle(Map<String,Object> map,ModelAndView view,Long areaId){
		view.setViewName("/subject/subject");
		
		//文章分类
		List<Object> list = articleService.getArticleAlltype();
		view.addObject("alltype",list);
		
		//最新文章和最热文章
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("page", 1L);
		param.put("rows", 10L);
		view.addObject("newArticle",articleService.getArticleByParam(param,areaId));
		param.put("type", "hot");
		view.addObject("hotArticle",articleService.getArticleByParam(param,areaId));
		
		//文章关键字
		param.clear();
		Map<Object,Object> mapkey = articleService.getArticleKeyWordByParam(param,areaId);
		List<Object> keylist = (List<Object>) mapkey.get("values");
		view.addObject("articleKeys",mapkey);
		
		//获取所有文章
		param.clear();
		param.put("page", (null != map && map.containsKey("page")) ? map.get("page") : 1L);
		param.put("rows", 12L);		
		if(null != map && map.containsKey("code")){ //文章类型
			param.put("categoryCode", map.get("code"));
			view.addObject("categoryCode", map.get("code")); //当前选择文章类型
			view.addObject("categoryName", getCurrentCategoryCode(list,map.get("code").toString(),"categoryCode","categoryName"));
		}
		if(null != map && map.containsKey("searchValue")){ //搜索
			param.put("searchValue", map.get("searchValue"));
			view.addObject("searchValue", map.get("searchValue"));
		}
		if(null != map && map.containsKey("key")){ //文章关键词
			param.put("keyCode", map.get("key"));
			view.addObject("keyCode", map.get("key"));
			view.addObject("keyName", getCurrentCategoryCode(keylist,map.get("key").toString(),"keyCode","keyText"));
		}
		
		Map<Object,Object> result = articleService.getArticleByParam(param,areaId);
		view.addObject("allArticle",result);
		view.addObject("totalPage",result.get("total"));
		view.addObject("pageNo",result.get("page"));
	}
	
	/**
	 * 当前点击文章类型/关键词名称
	 * @param list 数据
	 * @param categoryCode 点击关键字/文章类型
	 * @param code 
	 * @param name 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String getCurrentCategoryCode(List<Object> list,String categoryCode,String code,String name){
		if(null != list && list.size() > 0){
			for(Object item : list){
				Map<String,Object> map = (Map<String, Object>) item;
				String temp_categoryCode = map.get(code)+"";
				if(temp_categoryCode.equalsIgnoreCase(categoryCode)){
					return map.get(name)+"";
				}
			}
		}
		return null;
	}
	
	/**
	 * 问答首页可切换的文章列表
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/wz/changarticlelist/{page}/{rows}")
	public @ResponseBody List<Object> getArticleChangeList(HttpServletRequest request,@PathVariable Long page,@PathVariable Long rows){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("page", page);
		param.put("rows", rows);
		Map<Object,Object> map = articleService.getArticleByParam(param, AreaUtils.currentAreaId(request));
		return (List<Object>) map.get("rows");
	}
	
	/**
	 * 热门文章
	 * @param request
	 * @param page
	 * @param rows
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/wz/hotarticlelist/{page}/{rows}")
	public @ResponseBody List<Object> hotarticlelist(HttpServletRequest request,@PathVariable Long page,@PathVariable Long rows){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("page", page);
		param.put("rows", rows);
		param.put("type", "hot");
		Map<Object,Object> map = articleService.getArticleByParam(param, AreaUtils.currentAreaId(request));
		return (List<Object>) map.get("rows");
	}
}
