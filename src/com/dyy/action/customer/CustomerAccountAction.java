package com.dyy.action.customer;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.annotation.AuthLoginAnnotation;
import com.dyy.utils.Connection;
import com.dyy.utils.Constant;

@RestController
@RequestMapping("/account")
@AuthLoginAnnotation
public class CustomerAccountAction extends TopAction
{
    
    /**
      * 描述:<p>个人中心我的账户页面跳转</P>
      *
      * @author zhongyang
      * @return
      * @return ModelAndView
      * @throws
    */
    @RequestMapping("/index")
    public ModelAndView index()
    {
        ModelAndView view = new ModelAndView("/userClient/myAccount");
        return view;
    }
    
    
    /**
      * 描述:<p>修改客户信息</P>
      *
      * @author zhongyang
      * @param cusName
      * @param cusSex
      * @param cusQq
      * @param birthday
      * @return
      * @return Map<String,Object>
      * @throws
    */
    @RequestMapping("/updateCustomerInfo")
    @ResponseBody
    public Map<Object, Object> updateCustomerInfo(HttpServletRequest request, Long customerId, String customerName, String customerSex, String customerQQ,
        String customerBirthday)
    {
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("id", customerId);
        if (customerName != null)
        {
            param.put("customerName", customerName);
        }
        if (customerSex != null)
        {
            param.put("customerSex", customerSex);
        }
        param.put("customerQq", customerQQ);
        if (customerBirthday != null)
        {
            param.put("birthday", customerBirthday);
        }
        Map<Object, Object> result = Connection.getInstance().postApi("/customer/updateCustomer", param);
        if (result != null && 0 ==(Integer)result.get("executeStatus"))
        {
            request.getSession().setAttribute(Constant.SESSION_KEY, result.get("values"));
        }
        return result;
    }
    
    /**
      * 描述:<p>修改客户登录密码</P>
      *
      * @author zhongyang
      * @param cusId
      * @param oldPwd
      * @param newPwd
      * @return
      * @return Map<String,Object>
      * @throws
    */
    @RequestMapping("/updatePassWord")
    @ResponseBody
    public Map<String, Object> updatePassWord(Long cusId, String oldPwd, String newPwd)
    {
        return null;
    }
    
    /**
      * 描述:<p>获取手机验证码</P>
      *
      * @author zhongyang
      * @param cusId
      * @return
      * @return Map<String,Object>
      * @throws
    */
    @RequestMapping("/sendUpdCode")
    @ResponseBody
    public Map<String, Object> sendUpdCode(Long cusId)
    {
        return null;
    }
}
