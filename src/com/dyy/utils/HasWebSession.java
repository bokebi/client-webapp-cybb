package com.dyy.utils;

import javax.servlet.http.HttpServletRequest;

import org.beetl.core.Context;
import org.beetl.core.Function;

public class HasWebSession implements Function {

	@Override
	public Object call(Object[] arg0, Context ctx) {
		HttpServletRequest requet = (HttpServletRequest) ctx.getGlobal("request");
	    return requet.getSession(false) != null;
	}

}
