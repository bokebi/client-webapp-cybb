$(function() {
	// loadCompanyInfo();
	/* 我的帐号 */
	$(".change_Password").click(function() {
		$(".changePassword1").show();
	})
	userClient.getMinHight();

	$('#customerQQ,#customerIndustry,#customerProfessional').focus(function() {
		$(this).next('span.tips').html('').hide();
	});

	$('#sel_year,#sel_month,#sel_day').focus(function() {
		$('#customerP span.tips').html('').hide();
	});

	$('#updatePwdForm :password,#updatePwdForm :text').focus(function() {
		$(this).nextAll('span.tips').first().html('').hide();
		$('#errmsg span.tips').html('').hide();
	});
})

/**
 * 加载公司信息
 */
function loadCompanyInfo() {
	dum.common.ajax({
		url : "/account/loadCompany.do",
		type : "post",
		dataType : "json",
		success : function(msg) {
			$("#companyInfo").html(getCompanyHtml(msg));
		}
	})

}

/**
 * 上传头像
 */
function uploadHead(photoId) {
	dum.common.ajax({
		url : "/account/uploadHead.do",
		type : "post",
		data : {
			"photoId" : photoId
		},
		dataType : "json",
		success : function(msg) {
		}
	})

}

function getCompanyHtml(dataList) {
	var html = "";
	for (var i = 0; i < dataList.length; i++) 
	{
		html += '<p class="account_info">公司信息</p>';
		html += '<div class="client_right1 " style="position:relative; z-index:0;">';
		html += '<ul class="account_info_ul">';
		html += '   <li>';
		html += '      <div class="account_infoXq">';
		html += '         <p class="fl commonInfo">公司名字：</p>';
		html += '         <p class="fl commonInfo_right">' + dataList[i].companyName + '</p>';
		html += '      </div>';
		html += '   </li>';
		html += '   <li>';
		html += '      <div class="account_infoXq">';
		html += '         <p class="fl commonInfo">公司简介：</p>';
		html += '         <p class="fl commonInfo_right"  style="width:700px; line-height:25px; letter-spacing:2px;">'
				+ dataList[i].companyAbb + '</p>';
		html += '      </div>';
		html += '   </li>';
		html += '   <li>';
		html += '      <div class="account_infoXq">';
		html += '         <p class="fl commonInfo">公司性质：</p>';
		html += '         <p class="fl commonInfo_right">' + getCompanyNatureName(dataList[i].companyNature) + '</p>';
		html += '      </div>';
		html += '   </li>';
		html += '</ul>';
		html += '</div>';
	}
	return html;

}
function getCompanyNatureName(falg) {
	return falg == '0' ? '一般纳税人' : '小规模';
}

/* 设置用户生日显示 */
function setBirthday() {
	var customerBirthday = $('#customerBirthday').val();
	if (null == customerBirthday || "" == customerBirthday) {
		return;
	}
	var birthDate = new Date(customerBirthday);
	$("#sel_year").attr("rel", birthDate.getFullYear());
	$("#sel_month").attr("rel", birthDate.getMonth() + 1);
	$("#sel_day").attr("rel", birthDate.getDate());
}
/* 保存用户信息 */
function updateInfo() {
	var year = $('#sel_year').val();
	var month = $('#sel_month').val();
	var day = $('#sel_day').val();
	var customerBirthday = "";

	customerBirthday = ('0' != year) ? customerBirthday += year
			: customerBirthday;
	customerBirthday = ('0' != month) ? ('0' != year ? customerBirthday += ("-" + month)
			: customerBirthday += month)
			: customerBirthday;
	customerBirthday = ('0' != day) ? ('0' != month ? customerBirthday += ("-" + day)
			: customerBirthday += day)
			: customerBirthday;
	customerBirthday = '' == customerBirthday ? null : customerBirthday;
	/* 校验 */
	var _customerQQ = $('#customerQQ');
	var _customerIndustry = $('#customerIndustry');
	var _customerProfessional = $('#customerProfessional');

	if (!dum.common.isNull(customerBirthday)) {
		var birthArr = customerBirthday.split('-');
		if (dum.common.isNull(birthArr) || birthArr.length != 3) {
			$('#customerP span.tips')
					.html('<span class="icon"></span>请正确选择生日！').show();
			return;
		} else {
			var today = new Date();
			var t_year = today.getFullYear();
			var t_month = today.getMonth() + 1;
			var t_day = today.getDate();
			if (Date.parse(new Date(customerBirthday)) > Date.parse(new Date(
					t_year + '/' + t_month + '/' + t_day))) {
				$('#customerP span.tips').html(
						'<span class="icon"></span>请正确选择生日！').show();
				return;
			}
		}
	}

	if (!dum.common.isNull(_customerQQ.val())) {
		if (!/^[1-9][0-9]{5,9}$/.test(_customerQQ.val())) {
			_customerQQ.next('span.tips').html(
					'<span class="icon"></span>请填写正确的QQ号码！').show();
			return;
		}
	}

	if (!dum.common.isNull(_customerProfessional.val())) {
		if (_customerProfessional.val().length > 10) {
			_customerProfessional.next('span.tips').html(
					'<span class="icon"></span>职务信息应为10个中文字符内！').show();
			return;
		}
		if (!/^([\u4e00-\u9fa5]|[A-Za-z]|,){0,10}$/.test(_customerProfessional
				.val())) {
			_customerProfessional.next('span.tips').html(
					'<span class="icon"></span>请填写正确的职务信息！').show();
			return;
		}
	}

	if (!dum.common.isNull(_customerIndustry.val())) {
		if (_customerIndustry.val().length > 10) {
			_customerIndustry.next('span.tips').html(
					'<span class="icon"></span>行业信息应为10个中文字符内！').show();
			return;
		}
		if (!/^([\u4e00-\u9fa5]|[A-Za-z]|,){0,10}$/.test(_customerIndustry
				.val())) {
			_customerIndustry.next('span.tips').html(
					'<span class="icon"></span>请填写正确的行业信息！').show();
			return;
		}
	}

	var data = $('#userInfoForm').serialize();
	data = customerBirthday == null ? data : data + "&customerBirthday="
			+ customerBirthday;
	dum.common
			.ajax({
				url : "/account/updateCustomerInfo.html",
				type : "post",
				data : data,
				dataType : "json",
				success : function(data) {
					if (data.executeStatus == "0") {
						$('.savePrompt').show();
						$('.savePrompt_p').text("资料保存成功!");
						setTimeout(function(){
							$(".savePrompt").hide();
						},1000);
						window.location.reload();
					} else {
						$('.savePrompt').show();
						$('.savePrompt_p').text(data.errorMsg);
						setTimeout(function(){
							$(".savePrompt").hide();
						},1000);
					}
				}
			})
}
var isCommit=true;
/* 修改密码-获取验证码 */

function sendValidateCode() {
	if(isCommit){
		isCommit=false;
		dum.common.ajax({
			type : "get",
			url : "/customer/getUpdateCode.api",
			data : null,
			dataType : "json",
			success : function(data) {
				if (data.executeStatus == 0) {
					tt = 60;
					iv = setInterval("myInterval()", 1000);
					$("#validateBtn").attr("disabled", true);
				}else{
					isCommit = true;
				}
			}
		});
	}
}

/* 修改密码 */
function updatePwd() {
	var flag = true;
	/* 非空验证 */
	$.each($('#updatePwdForm :password,#updatePwdForm :text'), function(i, n) {
		if (dum.common.isNull($(this).val())) {
			$(this).nextAll('span.tips').first().html(
					'<span class="icon"></span>该选项为必填').show();
			flag = false;
		}
	});
	if (!flag) {
		return;
	}
	var _newPwd = $('#newPwd');
	var _reNewPwd = $('#reNewPwd');
	if (!/^[a-zA-Z0-9]{7,16}$/.test(_newPwd.val())) {
		_newPwd.next('span.tips').html(
				'<span class="icon"></span>密码格式为7到16位英文和数字的组合！').show();
		return;
	}
	if (_reNewPwd.val() != _newPwd.val()) {
		_reNewPwd.next('span.tips').html('<span class="icon"></span>新密码填写不一致！')
				.show();
		return;
	}

	dum.common.ajax({
		url : "/customer/updatePwd.api",
		type : "post",
		data : $('#updatePwdForm').serialize(),
		dataType : "json",
		success : function(data) {
			if (data.executeStatus == 0) {
				$('.promptModify_p').show();
				setTimeout(handleReturn, 1000);
			} else {
				$('#errmsg span.tips').html( '<span class="icon"></span>' + data.errorMsg + '').show();
			}
		}
	});
}

var iv;
var tt;
function myInterval() {
	tt--;
	if (tt <= 0) {
		clearInterval(iv);
		$("#validateBtn").val('获得验证码');
		$("#validateBtn").removeAttr("disabled");
		isCommit=true;
	} else {
		$("#validateBtn").val(tt + "秒后可操作");
	}
}
/* 返回按钮处理 */
function handleReturn() {
	$('.infoDiv').show();
	$('.infoPortrait p.passwordRevise').show();
	$('.promptModifyDiv').hide();
	$('.promptModify p.promptModify_p').hide();
	/* 清空修改密码相关输入框 及错误提示 */
	$.each($('#updatePwdForm :password,#updatePwdForm :text'), function(i, n) {
		$(this).val('').nextAll('span.tips').first().html('').hide();
	});
	$('#errmsg span.tips').html('').hide();
}