package com.dyy.action.question;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.service.ArticleService;
import com.dyy.service.QuestionService;
import com.dyy.utils.AreaUtils;
import com.dyy.utils.CookieUtils;
import com.dyy.utils.CustomerUtils;
import com.dyy.utils.TimeUtils;

@RestController
@RequestMapping("/ask")
public class CusQuestionsAction extends TopAction {
	
	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private ArticleService articleService;

	/**
	 * 问答首页
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/index")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView view = new ModelAndView("/question/index");
		// 最新问答列表
		view.addObject("newlist",questionService.getQuestionNewList(5L, AreaUtils.currentAreaId(request)));
		//已解决
		view.addObject("jiejuelist",questionService.getQuestionByParamList(5L, AreaUtils.currentAreaId(request),"yjj"));
		//待解决
		view.addObject("djiejuelist",questionService.getQuestionByParamList(5L, AreaUtils.currentAreaId(request),"djj"));
		//高悬赏
		view.addObject("zgpricelist",questionService.getQuestionByParamList(5L, AreaUtils.currentAreaId(request),"gxs"));

		//问答统计
		view.addObject("tjojb", questionService.getQuestionCount());

		// 推荐会计列表
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("orderType", "wealthDesc");
		view.addObject("kjlist", questionService.getAskRecommendListByParam(10L, param));
		
		//热门文章
		param.clear();
		param.put("rows", 2L);
		param.put("page", 1L);
		param.put("type", "hot");
		view.addObject("articleTotalPage", 10L);
        view.addObject("articleCurrentPage", 2L);
		view.addObject("hotArticle", articleService.getArticleByParam(param, AreaUtils.currentAreaId(request)));
		
		//问答滚动列表
		view.addObject("showQuestion", questionService.getQuestionGundongList(3L, AreaUtils.currentAreaId(request)));
		
		//当前登录用户
		@SuppressWarnings("unchecked")
		Map<String,Object> cusCustomer = (Map<String, Object>) CustomerUtils.getCurrentCustomer();		
		// 获取用户财富等信息
		if (null != cusCustomer && cusCustomer.containsKey("id")) {
			try {
				view.addObject("askUserVo", questionService.getQuestionUserCount(Long.parseLong(cusCustomer.get("id").toString())));
				view.addObject("user",cusCustomer);
			} catch (Exception e) {
			}
		}

		return view;
	}
	
	/**
	 * 提问页面
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/addQuestion")
	public ModelAndView addQuestionPage(HttpServletRequest request,Long cusid,String content){
		ModelAndView view = new ModelAndView("/question/addQuestion");
		try{
            if (content.equals(new String(content.getBytes("ISO8859-1"), "ISO8859-1"))){
            	content = new String(content.getBytes("ISO8859-1"), "UTF-8");
            }
            view.addObject("content",content);
        }catch (Exception e){
        }
		view.addObject("recommendAccount",questionService.getAskrecommentaccountInfo(cusid));
		return view;
	}

	/**
	 * 问题库-按条件查找
	 * @param request
	 * @param typeCode
	 * @param type
	 * @return
	 */
	@RequestMapping(value="/wtk/{typeCode}/{type}")
	public ModelAndView allquestionByParam(HttpServletRequest request,@PathVariable String typeCode,@PathVariable String type,String likeContent){
		ModelAndView view = new ModelAndView("/question/problemHouse");
		buildquestion(view,typeCode,type,1L,request,likeContent);
		return view;
	}
	
	/**
	 * 问题库-分页
	 * @param request
	 * @param typeCode
	 * @param type
	 * @return
	 */
	@RequestMapping(value="/wtk/{typeCode}/{type}/page_{page}")
	public ModelAndView allquestionByParamPage(HttpServletRequest request,@PathVariable String typeCode,@PathVariable String type,@PathVariable Long page,String likeContent){
		ModelAndView view = new ModelAndView("/question/problemHouse");
		buildquestion(view,typeCode,type,page,request,likeContent);
		return view;
	}
	
	private void buildquestion(ModelAndView view,String typeCode,String type,Long page,HttpServletRequest request,String likeContent){
		Map<String,Object> param = new HashMap<String, Object>();
		if (StringUtils.isNotEmpty(likeContent)){
	        try{
	            if (likeContent.equals(new String(likeContent.getBytes("ISO8859-1"), "ISO8859-1"))){
	            	likeContent = new String(likeContent.getBytes("ISO8859-1"), "UTF-8");
	            }
	            param.put("likeContent",likeContent);
	            view.addObject("likeContent",likeContent);
	        }catch (Exception e){
	        }
		}
		param.put("page", page);
		param.put("rows", 20L);
		view.addObject("solveQuestion",questionService.getAllquestionByparam(AreaUtils.currentAreaId(request), typeCode, type, param));
		if(!typeCode.equalsIgnoreCase("all")){
			try {
				Map<String,Object> data = questionService.getQuestionTypeByCode(typeCode);
				view.addObject("typeCode",data.get("typeCode").toString().toLowerCase());
				view.addObject("typeName",data.get("typeName"));
			} catch (Exception e) {
			}
		}else{
			view.addObject("typeCode","all");
			view.addObject("typeName","全部问题");
		}
		//所有问题分类
		view.addObject("questiontypelist",questionService.getAllQuestionType());
	}
	
	
	 /**
	  * 问题详情页面
	  * @param request
	  * @param response
	  * @param sysQuestionId
	  * @return
	  */
    @SuppressWarnings("unchecked")
	@RequestMapping("/{sysQuestionId}")
    public ModelAndView queryById(HttpServletRequest request,HttpServletResponse response, @PathVariable Long sysQuestionId)
    {    
        ModelAndView view = new ModelAndView("/question/solved");
        try {
        	Cookie[] cookies = request.getCookies();//这样便可以获取一个cookie数组
	    	Cookie cookie = CookieUtils.isHaveCookie("duoyoumi_miask", cookies);
	    	int maxage = ((int)TimeUtils.getTodaySurplusTime()/1000);
	    	if(null == cookie){
	        	cookie = CookieUtils.addCookie(cookies,"duoyoumi_miask", "",maxage,"/");
	        	response.addCookie(cookie);	
	    	}
        	Map<String,Object> map = questionService.getQestionById(sysQuestionId);
        	Map<String,Object> question = (Map<String, Object>) map.get("solvedQuestion");     
            if(null != question){
            	List<Map<String,Object>> answers = (List<Map<String, Object>>) question.get("answers");
            	for(Map<String,Object> item : answers){
    				//判断是否有cookie存在 没有则新增
    				boolean ispraise = getUserIsPraise(cookie,Long.parseLong(item.get("id").toString()),request,response);
        			if(ispraise == true){//赞踩与否
        				String type = getPraiseType(cookie.getValue().split("\\,"),item.get("id").toString());
        				if(StringUtils.isNotBlank(type)){
        					item.put("isPraise",type);
        				}      				
        			}
        			//最佳答案
            		if(question.containsKey("askAnswerId") && question.get("askAnswerId").equals(item.get("id"))){
            			view.addObject("bestSolvedQuestion", item);
            		}
        		}
            }
            view.addObject("solvedQuestion", question); //问题
            view.addObject("notAnswer", map.get("notAnswer")); //是否已回答过
            view.addObject("isMyselft", map.get("isMyselft")); //是否是自己的问题
            view.addObject("myselftId", map.get("myselftId")); //当前用户id
		} catch (Exception e) {
			
		}
        return view;
    }
    
    /**
	 * 热门文章
	 * @param request
	 * @param page
	 * @param rows
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/aboutquestionbycode/{typeCode}/{page}/{rows}")
	public @ResponseBody List<Object> hotarticlelist(HttpServletRequest request,@PathVariable String typeCode,@PathVariable Long page,@PathVariable Long rows){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("page", page);
		param.put("rows", rows);
		param.put("typeCode", typeCode.toLowerCase());
		Map<String,Object> map = questionService.getQuestionListByParam(param,AreaUtils.currentAreaId(request));
		return (List<Object>) map.get("rows");
	}
	
	/**
	 * 赞踩操作
	 * @param request
	 * @param response
	 * @param answerId
	 * @param type
	 * @return
	 */
	@RequestMapping(value="/savePraiseStep/{answerId}/{type}")
	public @ResponseBody Map<String,Object> savePraiseStep(HttpServletRequest request,HttpServletResponse response,@PathVariable Long answerId,@PathVariable String type){
		//获取cookie
		Cookie[] cookies = request.getCookies();//这样便可以获取一个cookie数组
    	Cookie cookie = CookieUtils.isHaveCookie("duoyoumi_miask", cookies);
    	int maxage = ((int)TimeUtils.getTodaySurplusTime()/1000);
    	if(null == cookie){
        	cookie = CookieUtils.addCookie(cookies,"duoyoumi_miask", "",maxage,"/");
    	}
		//判断是否有cookie存在 没有则新增，有则下面代码填充内容
		boolean ispraise = getUserIsPraise(cookie,answerId,request,response);
		
		if(!ispraise){
			response.addCookie(CookieUtils.addCookieValue(cookie, answerId.toString()+":"+type, ((int)TimeUtils.getTodaySurplusTime()/1000), "/", ","));//往cookie里放入数据
			return questionService.savePraiseStep(answerId, type);
		}
		return null;
	}
	
	/**
     * 查看今天是否赞/踩
     * @param ip
     * @return
     */
    private boolean getUserIsPraise(Cookie cookie,Long answerId,HttpServletRequest request,HttpServletResponse response){
    	if(null == cookie){
    		cookie = CookieUtils.addCookie(request.getCookies(), "duoyoumi_miask", "", ((int)TimeUtils.getTodaySurplusTime()/1000), "/");
    		response.addCookie(cookie);
    		return false;
    	}else{
    		String values = cookie.getValue();
    		String[] str = values.split("\\,");
    		for(String item : str){   			
    			if(answerId.toString().trim().equals(item.split("\\:")[0].trim())){
    				return true;
    			}
    		}
    	}
    	return false;
    }
    
    private String getPraiseType(String[] str,String arg){
    	try {
    		for(String item : str){
        		if(arg.trim().equals(item.split("\\:")[0].trim())){
        			return item.split("\\:")[1].trim();
        		}
        	}
		} catch (Exception e) {
			return null;
		}
    	return null;
    }
    
    /**
     * 会计个人信息
     * @param request
     * @param kjid
     * @return
     */
	@RequestMapping(value="/kjzx/{kjid}")
	public ModelAndView kjzx(HttpServletRequest request,@PathVariable Long kjid){
		ModelAndView view = new ModelAndView("/question/accountAskUserInfo");
		view.addObject("accountAskUserInfo",questionService.getAskrecommentaccountInfo(kjid));
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("page", 1L);
		param.put("rows", 10L);
		view.addObject("askRecommendAccountList",questionService.getAnswerByAskremmentaccountId(kjid,param));
		return view;
	}
	
	/**
     * 会计个人信息
     * @param request
     * @param kjid
     * @return
     */
	@RequestMapping(value="/kjzx/{kjid}/{index}")
	public ModelAndView kjzxmore(HttpServletRequest request,@PathVariable Long kjid,@PathVariable Long index,Long page){
		ModelAndView view = new ModelAndView("/question/accountAskUserCenter");
		view.addObject("userinfo",questionService.getAskrecommentaccountInfo(kjid));
		view.addObject("index",index);
		Map<String,Object> param = new HashMap<String, Object>();
		if(null != page){
			param.put("page", page);
		}else{
			param.put("page", 1L);
		}
		param.put("rows", 10L);
		view.addObject("askRecommendAccountList",questionService.getAnswerByAskremmentaccountId(kjid,param));
		return view;
	}
	
	/**
     * 用户个人信息
     * @param request
     * @param kjid
     * @return
     */
	@RequestMapping(value="/yhzx/{yhid}/{index}")
	public ModelAndView yhzx(HttpServletRequest request,@PathVariable Long yhid,@PathVariable Long index,Long page){
		ModelAndView view = new ModelAndView("/question/customerAskUserCenter");
		@SuppressWarnings("unchecked")
		Map<String,Object> customer = (Map<String, Object>) CustomerUtils.getCurrentCustomer();
		if(null != customer && customer.containsKey("id") && customer.get("id").toString().equals(yhid+"")){
			view.addObject("ismyselft","Y");
		}
		view.addObject("userinfo",questionService.getCustomerInfoById(yhid));
		view.addObject("index",index);
		Map<String,Object> param = new HashMap<String, Object>();
		if(null != page){
			param.put("page", page);
		}else{
			param.put("page", 1L);
		}
		param.put("rows", 10L);
		
		if(index == 0){
			view.addObject("allquestionAndAnswerList",questionService.getNewQuestionByCustomerId(yhid,1));
		}else if(index == 1){
			param.put("userId", yhid);
			view.addObject("customerCenterQuestionList",questionService.getQuestionByCustomerId(1,param));
		}else if(index == 2){
			param.put("customerId", yhid);
			view.addObject("customerCenterAnswerList",questionService.getAnswerByCustomerId(yhid, param));
		}
		return view;
	}
}
