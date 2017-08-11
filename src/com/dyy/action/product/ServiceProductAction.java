package com.dyy.action.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.service.ServiceProductService;


/**
 * 
  * 描述:<p></p>
  * @ClassName: ServiceProductAction
  * @author pengwei
  * @date 2017年2月25日 下午3:19:47
  *
 */

@RequestMapping("/serviceProduct")
@Controller
public class ServiceProductAction extends TopAction 
{
	@Autowired
	private ServiceProductService productService;
    
    @RequestMapping("/modelList")
    public ModelAndView modelList()
    {
        ModelAndView view = new ModelAndView("/product/productList");
        view.addObject("skuInfos",productService.queryProductSkuList().get("values"));
        return view;
    }
    
    @RequestMapping("/productList/{id}")
    public ModelAndView productList(@PathVariable Long id)
    {
        ModelAndView view = new ModelAndView("/product/productList");
        view.addObject("skuInfos",productService.queryProductSkuList(id).get("values"));
        return view;
    }
}
