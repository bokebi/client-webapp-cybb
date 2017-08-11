package com.dyy.action.customer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.annotation.AuthLoginAnnotation;
import com.dyy.service.CusVoucherService;

/**
 * 
  * 描述:<p></p>
  * @ClassName: 优惠券
  * @author pengwei
  * @date 2017年3月14日 下午3:46:49
  *
 */
@RestController
@RequestMapping("/voucher")
@AuthLoginAnnotation
public class CusVoucherAction extends TopAction{

	@Autowired
	private CusVoucherService voucherService;
	
	@RequestMapping("/index")
	public ModelAndView coupon() {
		ModelAndView view = new ModelAndView("/userClient/coupon");
		return view;
	}
	
	@RequestMapping("/findMySysVoucherInfo")
	@SuppressWarnings("unchecked")
	public List<Object> findMySysVoucherInfo(HttpServletRequest request,String voucherStatus,String isOverdue){
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("voucherStatus", voucherStatus==null?"":voucherStatus);
		param.put("isOverdue", isOverdue==null?"":isOverdue);
		return (List<Object>) voucherService.findMySysVoucherInfo(param).get("values");
	}
	
	@RequestMapping("/donationSysVoucher")
	public Map<Object, Object> donationSysVoucher(HttpServletRequest request,String voucherId,String mobileNo){
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("voucherId", voucherId);
		param.put("mobileNo", mobileNo);
		return voucherService.donationSysVoucher(param);
	}
	
}
