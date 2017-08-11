package com.dyy.action.customer;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.annotation.AuthLoginAnnotation;

/**
 * 客户中心action
 * @author weihongjun
 */
@RestController
@AuthLoginAnnotation
@RequestMapping("/customerCenter")
public class CustomerCenterAction   extends TopAction
{
	@RequestMapping("/index")
	public ModelAndView index()
	{
		ModelAndView view =new ModelAndView("/userClient/myOrder");
		return view;
	}
}
