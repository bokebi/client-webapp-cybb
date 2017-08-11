
var isCommit=true;
//提交登录
function getValidateCode() {
	var customerMobile=$("#customerMobile").val();
	if(customerMobile=="")
	{
		$("#msg").html("* 请填写的手机号码!");
		return ;
	}else if(!/^1[34578]\d{9}$/.test(customerMobile))
	{
		$("#msg").html("* 手机号码格式不正确!");
		return ;
	}else{
		$("#msg").html("");
	}
	if(isCommit){
		// 获取验证马时需要填写手机号码
		isCommit=false;
		dum.common.ajax({
			type : "post",
			url : "/customer/getSendCode.api",
			data : $('#registerForm').serialize(), 
			dataType : "json",
			success : function(data) {
				if (data["executeStatus"]=="0") {
					tt = 60;
					iv = setInterval("myInterval()", 1000);
					$("#validateCode").attr("disabled", true);
				}else{
					$("#msg").html("* "+data["errorMsg"]+"!");
					isCommit = true;
				}
			}
		});
	}
}
var iv;
var tt;
function myInterval() {
	tt--;
	if (tt <= 0) {
		clearInterval(iv);
		$("#validateCode").html('免费获取验证码');
		$("#validateCode").removeAttr("disabled");
		isCommit=true;
	} else {
		$("#validateCode").html(tt + "秒后可操作");
	}
}

//提交注册
function registerSubmit(callback) {
	//密码校验
	var strPass = $('#loginPwd').val(),strlen = strPass.length,n = /^(\d)*$/,f = /^[A-Za-z]+$/;
	var customerMobile=$("#customerMobile").val();
	var flag = true;
	if (!$(".protocolBox").prop('checked')) {
		return;
	}else if(customerMobile==""){
		$("#msg").html("* 请填写的手机号码!");
		return;
	}else if(!/^1[34578]\d{9}$/.test(customerMobile)){
		$("#msg").html("* 手机号码格式不正确!");
		return;
	}else if(!$('#loginPwd').val()){
		$("#msg").html("* 请输入密码!");
		return;
	}else if(n.test(strPass)||f.test(strPass)){
		$("#msg").html("* 密码必须是7到16位中英文混合字符!");
		return;
	}else if($('#loginPwd').val() != $('#confirmPwd').val()){
		$("#msg").html("* 两次输入密码不一致!");
		return;
	}else{
		$("#msg").html("");
	}
	if(flag){
		flag = false;
		// 获取验证马时需要填写手机号码
		dum.common.ajax({
			type : "post",
			url : "/customer/register.html",
			data : $('#registerForm').serialize(),
			dataType : "json",
			success : function(data) 
			{
				if (data["executeStatus"]=="0") {
					window.location.href = dum.appName+ "/ordPaymentOrder/index.html?leftNav=orderCenter";
				}else{
					$("#msg").html("* "+data["errorMsg"]+"!");
					flag = true;
				}
			}
		});
	}
}
function loadPic(){
	dum.common.ajax({
		type : "get",
		url : "/customer/vcode.api",
		dataType:'json',
		success : function(ms) {
			var status=ms.executeStatus;
			if('0'==status){
				$("#vcodeImg").attr("src",ms["values"]);
			}else{
				showError(ms["errorMsg"]);
			}
		}
	});
}
$(function(){
	loadPic();
	$('#registerForm').submit(function(){
		registerSubmit('');
	});
	$('#confirmPwd,#loginPwd').keyup(function(){
		verPass(this);
	});
	$('#loginPwd').blur(function(){
		verPass(this);
	});
	//勾选服务协议
	$(".protocolBox").click(function(){
		if($(this).prop('checked')){
			$(".submit").removeClass("submit").addClass("submit1");
		}else{
			$(".submit1").removeClass("submit1").addClass("submit");
		}
	})
	$("#loginName").blur(function(){
		$(".error_customerMobile").html("");
		var data={customerMobile:$("#loginName").val()};
		dum.common.ajax({
			type : "get",
			url : "/customer/validateMobile.api",
			data:data,
			dataType : "json",
			success : function(data) {
				var status=data["executeStatus"];
				if('0'==status){
					if(data["values"]>0){
						$(".error_customerMobile").html("<span class='icon'></span>该号码已经被注册！").css({'display':'inline-block'});
					}
				}
			}
		});
	})
	$("#validateVcode").blur(function(){
		$(".error_vcode").html("");
		var data={picCode:$("#validateVcode").val()};
		dum.common.ajax({
			type : "get",
			url : "/customer/validatePicCode.api",
			data:data,
			dataType : "json",
			success : function(data) {
				var status=data["executeStatus"];
				if('0'!=status){
					$(".error_vcode").html("<span class='icon'></span>"+data["errorMsg"]).css({'display':'inline-block'});
				}
			}
		});
	})
	$("#messageCode").blur(function(){
		$(".error_msgCode").html("");
		var data={messageCode:$("#messageCode").val()};
		dum.common.ajax({
			type : "get",
			url : "/customer/validateMessageCode.api",
			data:data,
			dataType : "json",
			success : function(data) {
				var status=data["executeStatus"];
				if('0'!=status){
					$(".error_msgCode").html("<span class='icon'></span>"+data["errorMsg"]).css({'display':'inline-block'});
				}
			}
		});
	})
	
	$('#confirmPwd').blur(function(){
		$(".error_repeatPwd").html("");
		var rePass=this.value;
		var pass=$("#pass").val();
		if(pass&&pass!=rePass){
			$(".error_repeatPwd").html("<span class='icon'></span>两次密码不一致。").css({'display':'inline-block'});
		}else{
			verPass(this);
		}
	})
	//密码强度校验
	function verPass(ele){
		var strPass = $(ele).val(),strlen = strPass.length,n = /^(\d)*$/,f = /^[A-Za-z]+$/;
		if(!(n.test(strPass)||f.test(strPass))){
			if(strlen < 7 || strlen > 16){
				$(ele).parents('li').find('.tips').html('<span class="icon"></span>7到16位英文和数字的组合。').css({'display':'inline-block'});
				$(ele).parents('li').find('.tips').css({'display':'inline-block'});
			}else{
				$(ele).parents('li').find('.tips').hide();
				if(strlen>=7&&strlen<=10){
					//$('.level1').removeClass('none');
					$('.level2,.level3').addClass('none');
				}else if(strlen > 10 && strlen <= 14){
					$('.level1,.level2').removeClass('none');
					$('.level3').addClass('none');
				}else if(strlen >=15){
					$('.level1,.level2,.level3').removeClass('none');
				}
			}
		}else{
			$(ele).parents('li').find('.tips').html('<span class="icon"></span>7到16位英文和数字的组合。').css({'display':'inline-block'});
			$(ele).parents('li').find('label').addClass('none');
		}
	}
})

