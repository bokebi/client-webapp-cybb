$(function(){
	$("#denglu").hide();
	$("#dengluys").hide();
	$(".ui-dialog-close").click(function(){
		$("#denglu").hide();
		$("#dengluys").hide();
	});
	document.onkeydown=function(e){ //回车登录
		  if(e = e || window.event);
		  if(e.keyCode == 13){
			  jumpLogin();
		   }
	};
});
var thisCallBack;
function showLoginWindow(callBack){
	thisCallBack=callBack;
	$(".jumpLogin1").show();
	$("#denglu").show();
	$("#dengluys").show();
}
function  jumpLogin(){
	var customerMobile = $("input[name='loginName']").val();
	var customerPwd = $("input[name='loginPwd']").val();
	
	if(customerMobile == "" || customerMobile == null || customerMobile == "undefined"){
		$("#loginForm .error").html( "<p class='promptLogin'><span>-</span>请输入手机号码！</p>");
		return;
	}
	
	if(customerPwd == "" || customerPwd == null)
	{
		$("#loginForm .error").html( "<p class='promptLogin'><span>-</span>请输入密码！</p>");
		return;
	}
	
	dum.common.ajax({
		   type: "post",
		   url: "/customer/login.html",
		   data:  $('#loginForm').serialize(),
		   dataType : "json",
		   success: function(data)
		   {
			   var status=data["executeStatus"];
				if('0'==status){
					 $(".jumpLogin1").hide();
					   if(thisCallBack) {
						   thisCallBack();
					   }
				}else{
					 $("#loginForm .error").html( "<p class='promptLogin'><span>-</span>"+data.errorMsg+"</p>");
				}
		   }
	});
}
function checkCustomer(callBack){
	dum.common.ajax({
		   type: "post",
		   url: "/customer/checkCustomer.html",
		   dataType : "json",
		   success: function(data)
		   {
			   if (data=="0") 
			   {
				   showLoginWindow(callBack);
			   }else{
				   if(callBack) {
					   callBack();
				   }
			   }
		   }
		});
}


