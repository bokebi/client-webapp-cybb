package com.dyy.action.customer;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.annotation.AuthLoginAnnotation;
import com.dyy.utils.Connection;

@Controller
@RequestMapping("/alipay")
public class AlipayRequestAction 
{
	/**
	 * 支付包同步成功页面
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/returnAlipay")
	@AuthLoginAnnotation(validate=false)
	public ModelAndView returnAlipay(){
		ModelAndView view=new ModelAndView("/payment/paymentSuccess");
		Map<Object, Object> order = Connection.getInstance().getApi("/ordPaymentOrder/returnAlipay");
		if(0 ==(Integer)order.get("executeStatus")){
			Map<String, String> params =(Map<String,String>)order.get("values");
			view.addObject("values", params);
		}
		return view;
	}

}
