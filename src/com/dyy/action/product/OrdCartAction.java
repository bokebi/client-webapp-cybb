package com.dyy.action.product;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.entity.OrdCart;
import com.dyy.entity.OrdCartVo;
import com.dyy.service.OrdCartService;
import com.dyy.service.ServiceProductService;

@RequestMapping("/ordCart")
@RestController
public class OrdCartAction extends TopAction {

	@Autowired
	public OrdCartService ordCartService;

	@Autowired
	private ServiceProductService productService;

	/**
	 * 
	 * 描述:
	 * <p>
	 * 添加购物车
	 * </P>
	 *
	 * @author pengwei
	 * @param @param ordCartVo
	 * @param @return
	 * @return Integer
	 * @throws
	 */
	@RequestMapping("/addCart")
	public Integer addCart(OrdCartVo ordCartVo) {
		Integer count = 0;
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("skuId", ordCartVo.getSkuId());
		map.put("type", ordCartVo.getType());
		map.put("skuCount", ordCartVo.getCount());
		Integer ifSucess = (Integer) ordCartService.appendOrdCart(map).get(
				"executeStatus");
		if (ifSucess == 0) {
			count += 1;
		}
		return count;
	}

	/**
	 * 
	 * 描述:
	 * <p>
	 * 进入购物车详情页面
	 * </P>
	 *
	 * @author pengwei
	 * @param @param request
	 * @param @return
	 * @return ModelAndView
	 * @throws
	 */
	@RequestMapping("/shoppingCart")
	public ModelAndView shoppingCart(HttpServletRequest request) {
		ModelAndView view = new ModelAndView("/product/shoppingCart");
		view.addObject("ordCart", ordCartService.getOrdCart().get("values"));
		return view;
	}

	/**
	 * 
	 * 描述:
	 * <p>
	 * 删除购物车项
	 * </P>
	 *
	 * @author pengwei
	 * @param @param ordCartVo
	 * @param @return
	 * @return ModelAndView
	 * @throws
	 */
	@RequestMapping("/delCartItem")
	public ModelAndView delCartItem(String ordCartItems) {
		ModelAndView view = new ModelAndView("redirect:/ordCart/shoppingCart");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("ordCartItems[0].itemCode", ordCartItems);
		ordCartService.delCartItem(map).get("values");
		return view;
	}

	@RequestMapping("/delCartItems")
	public ModelAndView delCartItems(OrdCart ordCart) {
		ModelAndView view = new ModelAndView();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("ordCart", ordCart);
		ordCartService.delCartItem(map).get("values");
		return view;
	}

	/**
	 * 
	  * 描述:<p>提交确认</P>
	  *
	  * @author pengwei
	  * @param @param ordCart
	  * @param @return
	  * @return ModelAndView
	  * @throws
	 */
	@RequestMapping("/paymentConfirm")
	public ModelAndView paymentConfirm(OrdCart ordCart) {
		ModelAndView view = new ModelAndView("/product/paymentConfirm");
		Map<Object, Object> result = ordCartService.ordCartItemsConfirm();
		if (1 == (Integer) result.get("executeStatus")) {
			view = new ModelAndView("/login/login");
		} else {
			view.addObject("ordCart", result.get("values"));
		}
		return view;
	}

	/**
	 * 
	  * 描述:<p>立即购买</P>
	  *
	  * @author pengwei
	  * @param @param request
	  * @param @param ordCartVo
	  * @param @return
	  * @return ModelAndView
	  * @throws
	 */
	@RequestMapping("/buyNow")
	public ModelAndView buyNow(HttpServletRequest request, OrdCartVo ordCartVo) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("skuId", ordCartVo.getSkuId());
		map.put("type", ordCartVo.getType());
		map.put("skuCount", ordCartVo.getCount());
		Map<Object, Object> ordMap = ordCartService.appendOrdCart(map);
		Integer ifSucess = (Integer) ordMap.get("executeStatus");
		ModelAndView view = new ModelAndView("/product/paymentConfirm");
		if (ifSucess == 0) {
			// request.setAttribute("ordCartVo", ordMap.get("values"));
			view.addObject("ordCart", ordMap.get("values"));
		}
		return view;
	}

	/**
	 * 
	  * 描述:<p>提交订单</P>
	  *
	  * @author pengwei
	  * @param @param ordCart
	  * @param @return
	  * @return ModelAndView
	  * @throws
	 */
	@RequestMapping("/submitOrder")
	public ModelAndView submitOrder(OrdCart ordCart,Long cusAccountVoucherId) {
		Map<Object, Object> result = ordCartService.submitOrder();
		ModelAndView view=null;
		if (1 == (Integer) result.get("executeStatus")) {
			view = new ModelAndView("/login/login");
		} else {
			JSONObject jsonObject = JSONObject.fromObject(result.get("values"));
			int id = (Integer) jsonObject.get("id");
			view = new ModelAndView("redirect:/ordPaymentOrder/orderChoPayOpt.html?id="+id);
		}
		return view;
	}
}
