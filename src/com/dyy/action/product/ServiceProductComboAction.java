package com.dyy.action.product;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.service.ArticleService;
import com.dyy.service.ServiceProductComboService;
import com.dyy.utils.AreaUtils;

/**
 * 
  * 描述:<p></p>
  * @ClassName: 套餐
  * @author pengwei
  * @date 2017年3月13日 下午6:43:53
  *
 */
@RequestMapping("/productCombo")
@Controller
public class ServiceProductComboAction extends TopAction {

	@Autowired
	private ArticleService articleService;
	
	@Autowired
	private ServiceProductComboService comboService;
	
	@RequestMapping("/{id}")
	public ModelAndView comboInfo(@PathVariable Long id,HttpServletRequest request){
		ModelAndView view = new ModelAndView("/productCombo/productComboInfo");
		view.addObject("comboInfo", comboService.findProductComboVoById(id).get("values"));
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("page", 1L);
		param.put("rows", 6L);
		view.addObject("newArticle",articleService.getArticleByParam(param,AreaUtils.currentAreaId(request)).get("rows"));
		return view;
	}
	
	
}
