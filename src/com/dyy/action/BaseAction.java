package com.dyy.action;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class BaseAction extends TopAction {
	
	@RequestMapping(value="/base/{url}")
	public ModelAndView base(HttpServletRequest request,@PathVariable String url,ModelAndView view){
		view.setViewName("/foots/"+url);
		return view;
	}

}
