package com.dyy.action.customer;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.annotation.AuthLoginAnnotation;
import com.dyy.utils.AreaUtils;
import com.dyy.utils.Connection;
import com.dyy.utils.WebUtils;
@RestController
@AuthLoginAnnotation
@RequestMapping("/ordPaymentOrder")
public class OrdPaymentOrderAction  extends TopAction
{
	@RequestMapping("/index")
	public ModelAndView index()
	{
		ModelAndView view =new ModelAndView("/userClient/myOrder");
		return view;
	}
	
	@RequestMapping("/orderList")
	public @ResponseBody Map<Object,Object> orderList()
	{
		//Map<Object, Object> result = Connection.getInstance().getApi("/ordPaymentOrder/cusOrderList",null,Map.class);
		return null;
	}
	
	@RequestMapping("/contract/{orderid}")
	public ModelAndView contract(HttpServletRequest request,@PathVariable Long orderid){
		ModelAndView view = new ModelAndView("/userClient/contract");
		Map<Object, Object> sysContract = Connection.getInstance().getApi("/website/getSysContract/"+AreaUtils.currentAreaId(request)+"/"+orderid);
		view.addObject("sysContract",sysContract.get("values"));
		return view;
	}
	
	
	/**
	 * 立即支付
	 * @param request
	 * @param response
	 * @param id
	 * @return
	 * @throws IOException
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/orderChoPayOpt")
    public ModelAndView orderChoPayOpt(HttpServletRequest request,HttpServletResponse response,Long id) throws IOException
    {
        ModelAndView view = new ModelAndView("/payment/choPayOpt");
        view.addObject("paymentOrderId", id);
        Map<Object, Object> order = Connection.getInstance().getApi("/ordPaymentOrder/cusOrderbyId/"+id);
        view.addObject("order", buildpayment((Map<Object, Object>) order.get("values")));
        return view;
    }
	
	@SuppressWarnings("unchecked")
	public Map<String,Object> buildpayment(Map<Object, Object> order){
		Map<String,Object> map = new HashMap<String, Object>();
		if(null != order && order.containsKey("orderStatus")){
			String orderStatus = order.get("orderStatus").toString();
			if(!orderStatus.equals("0")){
				List<Map<String,Object>> orderitem = (List<Map<String, Object>>) order.get("orderItemList");
				StringBuffer ordername = new StringBuffer();
				for(Map<String,Object> item : orderitem){
					Map<String,Object> nameobj = (Map<String, Object>) item.get("serviceProductSkuEntity");
					if(nameobj!=null){
						ordername.append(nameobj.get("name")).append(" + ");
					}
				}
				if(null != ordername && ordername.length() > 2){
					ordername.delete(ordername.length()-2, ordername.length());
				}
				Double orderPrice = (Double) order.get("orderPrice");
				Double couponPrice = (Double) order.get("couponPrice");
				if(couponPrice!=null){
					orderPrice=orderPrice-couponPrice;
					orderPrice=orderPrice>0?orderPrice:0;
				}
				map.put("serviceDesc", ordername);
				map.put("price", order.get("orderPrice"));
				map.put("couponPrice", order.get("couponPrice"));
				map.put("payPrice", orderPrice);
				map.put("paymentCode", order.get("orderCode"));
				map.put("orderId", order.get("id"));
			}
		}
		return map;
	}
	
	
	@RequestMapping("/goAlipayPayment")
	public Map<Object,Object> goAlipayPayment(HttpServletRequest request){
		Map<String, Object> requestMap = WebUtils.getRequestMap();
		String return_url="http://" + request.getServerName() + ":"+ request.getLocalPort() + request.getContextPath()+"/alipay/returnAlipay.html";
		requestMap.put("return_url",return_url);
		requestMap.remove("paymentType");
		Map<Object, Object> order = Connection.getInstance().postApi("/ordPaymentOrder/goAlipayPayment",requestMap);
		return order;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("/payNext")
	public ModelAndView payNext(){
		ModelAndView view=new ModelAndView("/payment/wechatPayment");
		Map<Object, Object> order = Connection.getInstance().postApi("/ordPaymentOrder/goWechatPayment");
		if(0 ==(Integer)order.get("executeStatus")){
			Map<String, String> params =(Map<String,String>)order.get("values");
			view.addObject("values", params);
		}
		return view;
	}
	
	/**
	 * 支付成功页面
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/paySuccess")
	public ModelAndView paySuccess(String paymentCode){
		ModelAndView view=new ModelAndView("/payment/paymentSuccess");
		Map<Object, Object> order = Connection.getInstance().getApi("/ordPaymentOrder/cusPaymentInfo");
		if(0 ==(Integer)order.get("executeStatus")){
			Map<String, String> params =(Map<String,String>)order.get("values");
			view.addObject("values", params);
		}
		return view;
	}
	
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
