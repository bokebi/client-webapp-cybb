var iv;
var tt;
function myInterval() {
	tt--;
	if (tt <= 0) {
		clearInterval(iv);
		$("#verificationCode").html('获取验证码');
		$("#verificationCode").removeAttr("disabled");
		isCommit=true;
	} else {
		$("#verificationCode").html(tt + "秒后可操作");
	}
}
var isCommit=true;

function getVerificationCode() {
	$("#forgetPwdForm .tips").html("");
	if(isCommit){
		isCommit=false;
		dum.common.ajax({
			type : "post",
			url : "/customer/getForgetMsg.html",
			data : $('#forgetPwdForm').serialize(),
			dataType : "json",
			success : function(data) {
				if (data.code=="0") {
					tt = 60;
					iv = setInterval("myInterval()", 1000);
					$("#verificationCode").attr("disabled", true);
				}else{
					$(".error_customerMobile").html("<span class='icon'></span>"+data.error);
					isCommit = true;
				}
			}
		});
	}
}
function editPwd(callback){
	var flag = true;
	if(!dum.verifiy('forgetPwdForm')){
		return false;
	}else{
		$("#forgetPwdForm .tips").html("");
		if($('#pass').val() != $('#pass_confirm').val()){
			$('#pass_confirm').parents('li').find('.tips').html('<span class="icon"></span>两次输入密码不一致').css({'display':'inline-block'});
			flag = false;
		}
		var strPass = $('#pass_confirm').val(),strlen = strPass.length,n = /^(\d)*$/,f = /^[A-Za-z]+$/;
		if(strlen<7||strlen>16){
			$('#pass_confirm,#pass').parents('li').find('.tips').html('<span class="icon"></span>密码是7到16位英文和数字的组合').css({'display':'inline-block'});
			$('#pass_confirm,#pass').css({'border-color':'red'});
			flag = false;
		}
		if(n.test(strPass)||f.test(strPass)){
			$('#pass_confirm,#pass').parents('li').find('.tips').html('<span class="icon"></span>密码是7到16位英文和数字的组合').css({'display':'inline-block'});
			$('#pass_confirm,#pass').css({'border-color':'red'});
			flag = false;
		}
		if(!flag){
			return false;
		}
		dum.common.ajax({
			type : "post",
			url : "/customer/editPwd.html",
			data : $('#forgetPwdForm').serialize(),
			dataType : "json",
			success : function(data) {
				if (data.code=="0") {
					window.location=dum.appName+ "/customer/loginUI.html";
				}
			}
		});
	}
}

$(function(){
	// 手机号码输入框，失去焦点事件
	$("#customerMobile").focus().on("blur",function(){
		var customerMobile = $(this).val();
		// 失去焦点先隐藏提示信息
		showError(this,"");
		// 为空判断
		if(customerMobile == "" || customerMobile == null || customerMobile == "undefined"){
			showError(this,"请输入手机号码");
			return;
		}
		
		// 验证手机号码  
		var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;  
	    if (!isMobile.exec(customerMobile) && customerMobile.length != 11) {  
	    	showError(this,"请正确填写手机号码");
	        return;  
	    }
	    // 校验手机是否存在
		dum.common.ajax({
			type : "post",
			url : "/customer/validateMobile.html?customerMobile=" + customerMobile,
			dataType : "json",
			success : function(data) {
				if (data=='0') {
					showError($("#customerMobile"),"手机号码不存在");
			        return;
				}
			}
		});

	});
	
	// 密码输入框，失去焦点事件
	$("#pass,#pass_confirm").on("blur",function(){
		showError(this,"");
		var pass = $(this).val();
		var n = /^(\d)*$/,f = /^[A-Za-z]+$/;
		
		if(pass.length < 7 || pass.length > 16 || n.test(pass) || f.test(pass)){
			showError(this,"密码是7到16位英文和数字的组合");
			return;
		}
		
		if($(this).attr("id") == "pass_confirm"){
			var pwd = $("#pass").val();
			if(pass != pwd){
				showError(this,"两次输入密码不一致");
				return;
			}
		}
	});
	
	$("#msgCode").blur(function(){
		$(".error_msgCode").html("");
		dum.common.ajax({
			type : "post",
			url : "/customer/validateMsgCode.html?msgCode="+$("#msgCode").val(),
			dataType : "json",
			success : function(data) {
				if (data.code!='0') {
					$(".error_msgCode").html("<span class='icon'></span>"+data.msg).css({'display':'inline-block'});
				}
			}
		});
	})
	
	$('#pass_confirm').keyup(function(){
		var strPass = $('#pass_confirm').val(),strlen = strPass.length,n = /^(\d)*$/,f = /^[A-Za-z]+$/;
		if(!(n.test(strPass)||f.test(strPass))){
			if(strlen < 7 || strlen > 16){
				$(this).parent().find('label').addClass('none');
				$(this).parents('li').find('.tips').show();
			}else{
				$(this).parents('li').find('.tips').hide();
				if(strlen>7&&strlen<=10){
					$('.level1').removeClass('none');
					$('.level2,.level3').addClass('none');
				}else if(strlen > 10 && strlen <= 14){
					$('.level1,.level2').removeClass('none');
					$('.level3').addClass('none');
				}else if(strlen >15){
					$('.level1,.level2,.level3').removeClass('none');
				}
			}
		}else{
			$(this).parents('li').find('.tips').css({'display':'inline-block'});
			console.log('test');
		}
	});
})

/**
 * 异常信息提示
 */
function showError(inputObj,msgText){
	// 如果对应的输入框信息为空则直接返回
	if(inputObj == null){
		return;
	}
	if(msgText == "" || msgText == null || msgText == "undefined"){
		$(inputObj).parents('li').find('.tips').html("");
		return;
	}
	$(inputObj).parents('li').find('.tips').html('<span class="icon"></span>'+ msgText).css({'display':'inline-block'});
}
