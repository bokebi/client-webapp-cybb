package com.dyy.utils;

import java.util.Map;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message.RecipientType;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendMainUtil {
	public static boolean sendMsg(Map<String, String> map){
		boolean flag =true;
		try {
			// 配置发送邮件的环境属性
	        final Properties props = new Properties();
	        // 表示SMTP发送邮件，需要进行身份验证
	        props.put("mail.smtp.auth", "true");
	        props.put("mail.smtp.host", "smtp.163.com");
	        // 发件人的账号
	        props.put("mail.user", "18664323686@163.com");
	        // 访问SMTP服务时需要提供的密码
	        props.put("mail.password", "8247568zzq123");

	        // 构建授权信息，用于进行SMTP进行身份验证
	        Authenticator authenticator = new Authenticator() {
	            @Override
	            protected PasswordAuthentication getPasswordAuthentication() {
	                // 用户名、密码
	                String userName = props.getProperty("mail.user");
	                String password = props.getProperty("mail.password");
	                return new PasswordAuthentication(userName, password);
	            }
	        };
	        // 使用环境属性和授权信息，创建邮件会话
	        Session mailSession = Session.getInstance(props, authenticator);
	        // 创建邮件消息
	        MimeMessage message = new MimeMessage(mailSession);
	        // 设置发件人
	        InternetAddress form = new InternetAddress(
	                props.getProperty("mail.user"));
	        message.setFrom(form);

	        // 设置收件人2222091419
	        InternetAddress to = new InternetAddress("8210469@163.com");
	        message.setRecipient(RecipientType.TO, to);

	        // 设置邮件标题
	        message.setSubject("加盟申请");
	        StringBuffer sb = new StringBuffer();
	        if(null != map){
	        	sb.append("<h5>"+map.get("joinType")+"加盟申请</h5>").append("<br/>");
	        	sb.append("加盟加盟商城市:").append(map.get("area")).append("<br/>");
	        	sb.append("加盟商公司名称:").append(map.get("companyName")).append("<br/>");
	        	sb.append("加盟商姓名:").append(map.get("userName")).append("<br/>");
	        	sb.append("加盟商手机号:").append(map.get("phone")).append("<br/>");
	        	sb.append("加盟商邮箱:").append(map.get("email")).append("<br/>");
	        	sb.append("加盟商办公地址:").append(map.get("adress")).append("<br/>");
	        	sb.append("加盟商主营业务:").append(map.get("mainBusiness")).append("<br/>");
	        	sb.append("加盟商公司优势:").append(map.get("advantage")).append("<br/>");
	        }
	        // 设置邮件的内容体
	        message.setContent(sb.toString(), "text/html;charset=UTF-8");

	        // 发送邮件
	        Transport.send(message);
	        
		} catch (Exception e) {
			flag = false;
		}
		return flag;
		
	}
}
