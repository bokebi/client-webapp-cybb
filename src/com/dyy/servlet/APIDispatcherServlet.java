package com.dyy.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.dyy.utils.Connection;
import com.dyy.utils.Util;

import net.sf.json.JSONObject;

public class APIDispatcherServlet extends HttpServlet {

	private static final long serialVersionUID = -8663906915559529942L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("content-type", "text/html;charset=UTF-8");
		String url = request.getServletPath();
		Map<Object, Object> result = Connection.getInstance().getApi(url.replace(".api", ""));
		this.write(response, result);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("content-type", "text/html;charset=UTF-8");
		String url = request.getServletPath();
		if(ServletFileUpload.isMultipartContent(request)) {
			Map<Object, Object> result = Connection.getInstance().upload(request);
			this.write(response, result);
		} else {
			Map<Object, Object> result = Connection.getInstance().postApi(url.replace(".api", ""));
			this.write(response, result);
		}
	}
	
	
	/*private Map<String, Object> getParam(HttpServletRequest request) {
		@SuppressWarnings("unchecked")
		Enumeration<String> e = request.getParameterNames();
		Map<String, Object> param = null;
		if(e.hasMoreElements()) {
			param = new HashMap<String, Object>();
		}
		while(e.hasMoreElements()) {
			String key = e.nextElement();
			param.put(key, request.getParameter(key));
		}
		return param;
	}*/
	
	private void write(HttpServletResponse response, Map<Object, Object> result) throws IOException {
		PrintWriter pw = null;
		try
        {
            response.setContentType("application/json");
            response.setHeader("Cache-Control", "no-store");
            response.setHeader("Content-type", "text/html;charset=UTF-8");
            pw = response.getWriter();
            if(result != null) {
            	JSONObject json = JSONObject.fromObject(result);
            	pw.write(Util.decodeUnicode(json.toString()));
            }
        } finally {
        	if(pw != null) {
        		pw.flush();
	            pw.close();
        	}
        }
	}
}