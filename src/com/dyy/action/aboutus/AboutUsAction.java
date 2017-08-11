package com.dyy.action.aboutus;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.service.AboutUsService;
import com.dyy.utils.AreaUtils;
import com.dyy.utils.SendMainUtil;

import javax.mail.Authenticator;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


/**
 * 关于我们
 *
 */
@RestController
public class AboutUsAction extends TopAction {
	
	@Autowired
	private AboutUsService aboutUsService;
	
	@RequestMapping(value="/aboutus")
	public ModelAndView initialize(HttpServletRequest request){
		ModelAndView view = new ModelAndView("/abouts/about");
		view.addObject("content",aboutUsService.getAboutUsContentByAreaId(AreaUtils.currentAreaId(request)));
		return view;
	}

	
    @RequestMapping("/cydk")
    public ModelAndView showCydkView(HttpServletRequest request)
    {
        ModelAndView view = new ModelAndView("/abouts/cydk");
        return view;
    }
    
    @RequestMapping("/sbdj")
    public ModelAndView showSbdkView(HttpServletRequest request)
    {
        ModelAndView view = new ModelAndView("/abouts/sbdj");
        return view;
    }
    @RequestMapping("/fws")
    public ModelAndView showFws(HttpServletRequest request)
    {
        ModelAndView view = new ModelAndView("/abouts/fws");
        return view;
    }
    
    @RequestMapping("/addFws")
	@ResponseBody
    public int addFws(HttpServletRequest request)
    {
    	Map<String, String> map = new HashMap<String, String>();
    	map.put("area", request.getParameter("s_province")+request.getParameter("s_city")+request.getParameter("s_county"));
    	map.put("companyName", request.getParameter("companyName"));
    	map.put("userName", request.getParameter("userName"));
    	map.put("phone", request.getParameter("phone"));
    	map.put("email", request.getParameter("email"));
    	map.put("adress", request.getParameter("adress"));
    	map.put("mainBusiness", request.getParameter("mainBusiness"));
    	map.put("advantage", request.getParameter("advantage"));
    	map.put("joinType", request.getParameter("joinType")=="1"?"代帐企业":"个人会计");
    	if(SendMainUtil.sendMsg(map)){
    		return 1;
    	}
        return 0;
    }
}
