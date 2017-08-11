package com.dyy.action.product;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.entity.ServiceProductSkuVo;
import com.dyy.service.ArticleService;
import com.dyy.service.SeoService;
import com.dyy.service.ServiceProductService;
import com.dyy.utils.AreaUtils;
import com.dyy.utils.MapUtil;

/**
 * 产品详情
  * 描述:<p></p>
  * @ClassName: ServiceProductModelAction
  * @author pengwei
  * @date 2017年2月16日 下午5:27:18
  *
 */
@RequestMapping("/productModel")
@RestController
public class ServiceProductModelAction extends TopAction{

	@Autowired
	private ArticleService articleService;
	@Autowired
	private ServiceProductService productService;
	@Autowired
	private SeoService seoService;
	
	/**
	 * 
	  * 描述:<p>产品详情页面</P>
	  *
	  * @author pengwei
	  * @param @param id 产品id
	  * @param @return
	  * @return ModelAndView
	  * @throws
	 */
	/*@RequestMapping("/{id}")
	public ModelAndView showDetail(@PathVariable Long id){
		ModelAndView view = new ModelAndView("/product/productModel");
		//最新文章
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("page", 1L);
		param.put("rows", 6L);
		view.addObject("newArticle",articleService.getArticleByParam(param,1537L).get("rows"));
		view.addObject("skuInfos",productService.findProducSkuByProductId(id).get("values"));
		return view;
	}*/
	/**
	 * 
	  * 描述:<p>进入详情</P>
	  *
	  * @author pengwei
	  * @param @param id sku_id 为商品  id 为产品 
	  * @param @return
	  * @return ModelAndView
	  * @throws
	 */
	@RequestMapping("/{id}")
	public ModelAndView displayDetail(@PathVariable String id,HttpServletRequest request){
		ModelAndView view = new ModelAndView("/product/productModel");
		String[] ids=id.split("_");
		//最新文章
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("page", 1L);
		param.put("rows", 6L);
		view.addObject("newArticle",articleService.getArticleByParam(param,AreaUtils.currentAreaId(request)).get("rows"));
		if(ids.length>1){
			view.addObject("skuInfos",productService.findProducSkuBySkuId(Long.valueOf(ids[1])).get("values"));
		}else{
			view.addObject("skuInfos",productService.findProducSkuByProductId(Long.valueOf(id)).get("values"));
		}
		//seo
		Map<String,Object> param2 = new HashMap<String, Object>();
		param2.put("code",id+".html");
		Object obj = seoService.getSeoByParam(param2,AreaUtils.currentAreaId(request));
		view.addObject("productSeo",obj);
		return view;
	}
	
	@RequestMapping("/queryProductSku")
	public Map<Object, Object> queryProductSku(ServiceProductSkuVo productSkuVo){
		Map<String, Object> map=MapUtil.beanToMap(productSkuVo);
		return productService.queryProductSkuMap(map);
	}
	@RequestMapping("/sku/{id}")
	public ModelAndView queryProductSkuById(@PathVariable Long id,HttpServletRequest request){
		ModelAndView view = new ModelAndView("/product/productModel");
		//最新文章
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("page", 1L);
		param.put("rows", 6L);
		view.addObject("newArticle",articleService.getArticleByParam(param,AreaUtils.currentAreaId(request)).get("rows"));
		view.addObject("skuInfos",productService.findProducSkuBySkuId(id).get("values"));
		return view;
	}
	
}
