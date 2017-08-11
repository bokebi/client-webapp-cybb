
/**
* 立即登陆
*/
function login(){
	var customerMobile = $("input[name='loginName']").val();
	var customerPwd = $("input[name='loginPwd']").val();
	
	if(customerMobile == "" || customerMobile == null || customerMobile == "undefined"){
		showError("请输入登录账号！");
		return;
	}
	
	if(customerPwd == "" || customerPwd == null){
		showError("请输入密码！");
		return;
	}
	
	// 校验手机号码和密码的有效性
	if(verifyMobile(customerMobile) && verifyPassword(customerPwd)){
		dum.common.ajax({
			type : "post",
			url : "/customer/login.html",
			data : $('#loginForm').serialize(),
			dataType : "json",
			success : function(data) {
				var status=data["executeStatus"];
				if('0'==status){
					window.location.href = dum.appName+"/ordPaymentOrder/index.html?leftNav=orderCenter";
				}else{
					showError(data["errorMsg"]);
				}
			}
		});
	}
}

/**
 * 校验手机号码
 * @returns
 */
function verifyMobile(mobile){ 
    var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;  
    // 验证手机号码  
    if (!isMobile.exec(mobile) && mobile.length != 11) {  
    	showError("请正确填写手机号码!");
        return false;  
    }  
    return true;  
}

/**
 * 校验客户密码
 * @returns
 */
function verifyPassword(customerPwd){
	return true;
}

/**
 * 显示异常提示信息
 * @param msg
 */
function showError(msg){
	if(msg == "" || msg == null || msg == "undefined"){
		return;
	}
	var error = $(".error");
	var p_html = "<p class='promptLogin'>"
		       + 	"<span>-</span>" + msg
			   + "</p>";
	error.html("").append(p_html);
}

//登录二维码
$(function(){
	$(".sJversion").mouseover(function(){
		$(".loginEwm").show();
	});
	$(".sJversion").mouseleave(function(){
		$(".loginEwm").hide();
	})
})



