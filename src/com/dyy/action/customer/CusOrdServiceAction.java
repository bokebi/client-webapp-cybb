package com.dyy.action.customer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;

@Controller
@RequestMapping("/ordService")
public class CusOrdServiceAction extends TopAction {

	 @RequestMapping("/index")
	    public ModelAndView index()
	    {
	        ModelAndView view = new ModelAndView("/userClient/ordService");
	        return view;
	    }
	    
}
