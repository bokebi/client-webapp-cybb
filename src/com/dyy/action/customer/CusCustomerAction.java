package com.dyy.action.customer;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.service.AgreementService;
import com.dyy.utils.AreaUtils;
import com.dyy.utils.Connection;
import com.dyy.utils.CustomerUtils;
import com.dyy.utils.QQLogin;
import com.dyy.utils.WXLogin;
import com.dyy.utils.WebUtils;

@Controller
@RequestMapping("/customer")
public class CusCustomerAction extends TopAction 
{
	@Autowired
	private AgreementService agreementService;

	/**
	 * 登陆UI
	 */
	@RequestMapping("/loginUI")
	public ModelAndView loginUI(HttpServletRequest request) {
		ModelAndView view = new ModelAndView("/login/login");
		return view;
	}
	
	/**
	 * @Description 客户登陆
	 * @author weihongjun
	 * @param registerVo
	 * @return
	 */
	@RequestMapping("/login")
	@ResponseBody
	public  Map<Object,Object> login(HttpServletRequest request) 
	{
		Map<Object, Object> result = Connection.getInstance().postApi("/customer/login",WebUtils.getRequestMap());
		if(0 ==(Integer)result.get("executeStatus")){
			CustomerUtils.saveCurrentCutomer(result.get("values"));
		}
		return result;
	}
	
	
	@RequestMapping("/wxLogin")
	@ResponseBody
	public void wxLogin(HttpServletResponse response,HttpServletRequest request) {
		try {
			//https://open.weixin.qq.com/connect/qrconnect?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
			String redirectURL = WXLogin.GET_CODE + "?appid=" + WXLogin.APP_ID + "&redirect_uri=" + WXLogin.REDIRECT_URI + "&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect";
			response.sendRedirect(redirectURL);
		} catch (Exception e) {
			throw new RuntimeException("跳转微信页面异常", e);
		}
	}
	
	@RequestMapping("/qqLogin")
	@ResponseBody
	public void qqLogin(HttpServletResponse response) {
		String oauthURL = QQLogin.getOAuthURL(1);
		try {
			response.sendRedirect(oauthURL);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 第三方登录：QQ登陆
	 * 
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("/qqFinalLogin")
	@ResponseBody
	public ModelAndView qqFinalLogin(String code) throws Exception{
		ModelAndView view = new ModelAndView();
		
		//根据code获取tocak
		String qqToken = QQLogin.getAccessToken(code, 1);
		//根据tocak获得apenId
		String openid = QQLogin.getOpenID(qqToken);
		//根据openid查询cus_customer用户是否存在
		 Map<String,Object> map = new HashMap<String, Object>();
		 map.put("openId", openid);
		Map<Object, Object> result = Connection.getInstance().postApi("/customer/login",map);
		if(0 ==(Integer)result.get("executeStatus")){
			CustomerUtils.saveCurrentCutomer(result.get("values"));
		}else{
			//否则添加用户 取qq邮箱、手机 openId 存入用户表 
			
			//把用户信息保存到session
			
			//跳转用户中心
			view.setViewName("customer/loginUI");
		}
	
		view.setViewName("/ordPaymentOrder/index.html?leftNav=orderCenter");
		return view;
	}

		 
	
	
	
	/**
	  * 描述:<p>获取忘记密码验证码</P>
	  *
	  * @author zhongyang
	  * @param customerMobile
	  * @param session
	  * @return
	  * @return Map<String,Object>
	  * @throws
	*/
	@RequestMapping("/getForgetMsg")
	@ResponseBody
    public Map<String, Object> getForgetMsg(String customerMobile, HttpSession session)
    {
        Map<String, Object> result = new HashMap<String, Object>();
        if (customerMobile == null || "".equals(customerMobile.trim()))
        {
            result.put("code", "1");
            result.put("error", "手机号码为空");
            return result;
        }
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("customerMobile", customerMobile);
        Map<Object, Object> map = Connection.getInstance().postApi("/customer/forgetPwdGetSendCode", param);
        if (map != null && "0".equals(map.get("executeStatus").toString()))
        {
            session.setAttribute("ForgetCode", map.get("values"));
            result.put("code", "0");
            return result;
        }
        result.put("error", "该客户不存在");
        result.put("code", "1");
        return result;
    }
	
	
	/**
	  * 描述:<p>校验验证码</P>
	  *
	  * @author zhongyang
	  * @param msgCode
	  * @param session
	  * @return
	  * @return Map<String,Object>
	  * @throws
	*/
	@RequestMapping("/validateMsgCode")
    @ResponseBody
    public Map<String, Object> validateMsgCode(String msgCode, HttpSession session)
    {
        Map<String, Object> result = new HashMap<String, Object>();
        String oldMsgCode = (String)session.getAttribute("ForgetCode");
        if (msgCode == null || "".equals(msgCode.trim()))
        {
            result.put("code", "1");
            result.put("msg", "请您填写短信验证码");
            return result;
        }
        if (!msgCode.equals(oldMsgCode))
        {
            result.put("code", "1");
            result.put("msg", "短信验证码填写错误");
            return result;
        }
        result.put("code", "0");
        return result;
    }
	
	
	/**
	  * 描述:<p>校验手机号码</P>
	  *
	  * @author zhongyang
	  * @param customerMobile
	  * @return
	  * @return String
	  * @throws
	*/
	@RequestMapping("/validateMobile")
    @ResponseBody
    public String validateMobile(String customerMobile)
    {
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("customerMobile", customerMobile);
        Map<Object, Object> map = Connection.getInstance().getApi("/customer/validateMobile", param);
        return (String)map.get("values");
    }
	
	
	/**
	  * 描述:<p>保存密码</P>
	  *
	  * @author zhongyang
	  * @param customerMobile
	  * @param newPwd
	  * @param reNewPwd
	  * @param msgCode
	  * @param session
	  * @return
	  * @throws Exception
	  * @return Map<String,Object>
	  * @throws
	*/
	@RequestMapping("/editPwd")
    @ResponseBody
    public Map<String, Object> editPwd(String customerMobile, String newPwd, String reNewPwd, String msgCode, HttpSession session)
        throws Exception
    {
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("customerMobile", customerMobile);
        param.put("loginPwd", newPwd);
        param.put("confirmPwd", reNewPwd);
        param.put("messageCode", msgCode);
        Map<Object, Object> map = Connection.getInstance().postApi("/customer/forgetPwd", param);
        Map<String, Object> result = new HashMap<String, Object>();
        if ("0".equals(map.get("executeStatus").toString()))
        {
            result.put("code", "0");
        }
        return result;
    }
	
	
	@RequestMapping("/forgetPwd")
    public ModelAndView forgotPwd() {
        ModelAndView view = new ModelAndView("/login/forgetPwd");
        return view;
    }

	/**
	 * @Description 客户注册
	 * @author weihongjun
	 * @param registerVo
	 * @return
	 */
	@RequestMapping("/register")
	@ResponseBody
	public  Map<Object,Object> register(HttpServletRequest request) 
	{
		Map<Object, Object> result = Connection.getInstance().postApi("/customer/register",WebUtils.getRequestMap());
		if(0 ==(Integer)result.get("executeStatus")){
			CustomerUtils.saveCurrentCutomer(result.get("values"));
		}
		return result;
	}
	/**
	 * 注册UI
	 */
	@RequestMapping("/registerUI")
	public ModelAndView registerUI() {
		ModelAndView view = new ModelAndView("/register/register");
		return view;
	}
	
	/**
	 * 注册协议
	 * @param request
	 * @return
	 */
	@RequestMapping("/agreement")
	public ModelAndView agreement(HttpServletRequest request) {
		ModelAndView view = new ModelAndView("/foots/contract_terms");
		view.addObject("result",agreementService.getAgreementByParam(AreaUtils.currentAreaId(request)));
		return view;
	}
	
	/**
	 * @Description 用户注销功能
	 * @author weihongjun
	 * @param session
	 */
	@RequestMapping("/loginOut")
	public String loginOut(HttpServletRequest request, HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}
	
	@RequestMapping("/checkCustomer")
	public @ResponseBody String checkCustomer(HttpServletRequest request) {
		String status = "1";
		if (request.getSession().getAttribute(CustomerUtils.SESSION_KEY)==null) {
			status = "0";
		}
		return status;
	}
	

	@SuppressWarnings("unchecked")
	@RequestMapping("/updateCustomerPhoto")
	@ResponseBody
	public Map<Object, Object> updateCustomerPhoto(Long photoId, String path) {
		Map<Object, Object> curCus = (Map<Object, Object>)CustomerUtils.getCurrentCustomer();
		Map<Object, Object> attr = (Map<Object, Object>)curCus.get("attachment");
		if(attr == null) {
			attr = new HashMap<Object, Object>();
		}
		attr.put("id", photoId);
		attr.put("fillFilePath", path);
		curCus.put("attachment", attr);
		CustomerUtils.saveCurrentCutomer(curCus);
		
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("photoId", photoId);
		Connection.getInstance().postApi("/customer/updateCustomerPhoto.api", param);
		return curCus;
	}
}
