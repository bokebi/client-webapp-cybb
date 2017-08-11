$(function() {
	var ordServiceId = $("#ordServiceId").val();
	taxAccountInfo.init(ordServiceId);
	taxAccountInfo.eventlinster();

	$("#companyName").focus(function() {
		taxAccountInfo.displayCusCompany();
	});

	$("#cusCompanySel").change(function() {
		taxAccountInfo.chooseCompany();
	});

});
var taxAccountInfo = {
	init : function(ordServiceId) {
		userClient.getMinHight();
		$.ajax({
				type : 'post',
					url : dum.appName + '/perfect/jzbsData.html',
					data : {
						id : ordServiceId
					},
					dataType : 'json',
					async : false,
					success : function(data) {
						if (data) {
							$("#serviceProductId").val(data.ordService.serviceProductId);
							$("#modelId").val(data.ordService.modelId);
							if(data.ordService.serviceProductNature){
								$("#companyNature").val(data.ordService.serviceProductNature.natureCode);
							}
							if (data.ordServiceCompany) {
								if(data.cusServiceContactWay){
									$('#contactWayAreaId').setArea({areaId:data.cusServiceContactWay.areaId})// 公司地址
									$('#contactqq').val(data.cusServiceContactWay.personQq)// 联系人qq
									$('#addressDetail').val(data.cusServiceContactWay.addressDetails);// 详细地址
									$("#cusServiceContactWayId").val(data.cusServiceContactWay.id);
								}
								$("#serviceStatus").val(data.ordServiceCompany.serviceStatus);
								$('#ordServiceCompanyId').val(data.ordServiceCompany.id);
							}
							taxAccountInfo.pullCusCompany(data.cusCompany,data.businessScopeList); //填充公司信息
							taxAccountInfo.pullCusCompanyLegalperson(data.cusCompanyLegalperson); //填充法人
							taxAccountInfo.pullCusCompanyTax(data.cusCompanyTax);
							if($("#serviceStatus").val()&&$("#serviceStatus").val().length>0){
								$(".defineTax").remove();
								$(":input").attr("readonly",true);
								$(".infoPrompt").remove();
							}
						}
						
					}
				});
	},
	pullCusCompany:function(cusCompany,businessScopeList){
		var scopeName='', optionsHtml = '', options =  businessScopeList;// 公司类型
		if(cusCompany){
			$('#companyName').val(cusCompany.companyName);// 公司名称
			$('#companyCode').val(cusCompany.companyCode);// 公司名称
			if (cusCompany.buildDate) {
				var date = new Date(cusCompany.buildDate);
				var mth = date.getMonth() + 1;
				strDate = date.getFullYear() + '-' + mth + '-' + date.getDate();
				$('#buildDate').val(strDate);// 成立日期
			}
			$("#licenseNumber").val(cusCompany.licenseNumber);
			$('#cusCompanyId').val(cusCompany.id);
			$('#scrope').val(cusCompany.scopeDesc);
			scopeName =cusCompany.scopeName;
		}
		$.each(options, function(index, item) {
			if (item.scopeName == scopeName) {
				optionsHtml += '<option selected value="'+ item.scopeName + '"'+ '" scrope = "' + item.scopeDesc+ '">' + item.scopeName+ '</option>';
			} else {
				optionsHtml += '<option value="'+ item.scopeName + '"'+ '" scrope = "' + item.scopeDesc+ '">' + item.scopeName+ '</option>';
			}
		});
		$('#scopeName').html(optionsHtml);
	},
	pullCusCompanyLegalperson:function(cusCompanyLegalperson){
			var documentType = '', documentTypeHtml = '';
			if(cusCompanyLegalperson){
				$('#legalPersonName').val(cusCompanyLegalperson.legalPersonName);// 法人姓名
				$('#documentNo').val(cusCompanyLegalperson.documentNo);// 法人证件号码
				$('#cusCompanyLegalpersonId').val(cusCompanyLegalperson.id);
				documentType =  cusCompanyLegalperson.documentType;
			}
			documentTypeHtml += "<option "+ ('sfz' == documentType ? 'selected' : '')+ " value='sfz'>身份证</option>";
			documentTypeHtml += "<option "+ ('hxz' == documentType ? 'selected' : '')+ " value='hxz'>回乡证</option>";
			documentTypeHtml += "<option "+ ('tbz' == documentType ? 'selected' : '')+ " value='tbz'>台胞证</option>";
			documentTypeHtml += "<option "+ ('hz' == documentType ? 'selected' : '')+ " value='hz'>护照</option>";
			$("#documentType").html(documentTypeHtml);
	},
	pullCusCompanyTax:function(cusCompanyTax){
		if (cusCompanyTax) {
			$('#shenzhenTaxCode').val(cusCompanyTax.shenzhenTaxCode);// 深税编码
			$('#cusCompanyTaxId').val(cusCompanyTax.id);
			$('#nationaltaxCode').val(cusCompanyTax.nationaltaxCode);// 国税编码
			$('#nationaltaxPwd').val(cusCompanyTax.nationaltaxPwd);// 国税密码
			$('#farmtaxPwd').val(cusCompanyTax.farmtaxPwd);// 地税密码
			$('#farmtaxCode').val(cusCompanyTax.farmtaxCode);// 地税编码
			$('#farmtaxPhone').val(cusCompanyTax.farmtaxPhone);// 税务绑定手机
			if(cusCompanyTax.nationaltaxPwdForget){
				$("#nationaltaxPwdForget").attr("checked",true);
			}
			if(cusCompanyTax.farmtaxPwdForget){
				$("#farmtaxPwdForget").attr("checked",true);
			}
		}
	},
	eventlinster : function() {
		$('#scopeName').on('change', function() {
			var scrope = '';
			scrope = $(this).find('option:selected').attr('scrope');
			$('#scrope').val(scrope);
		});
		// 完善信息提交
		$(".defineTax").click(function() {
			$('.Infoprompt').show();
			$('.Infoprompt .subSaveA1').click(function() {
				$("#serviceStatus").val('1');
				$('.Infoprompt').hide(taxAccountInfo.submit);
			});
			$('.Infoprompt .subSaveA2').click(function() {
				$('.Infoprompt').hide(taxAccountInfo.submit);
			});
			$('.Infoprompt p.close').click(function() {
				$('.Infoprompt').hide();
			});
		})
	},
	submit : function() {
		checkCustomer(function() { // 检查登陆
			var form = $("#dljzForm");
			dum.common.ajax({
				type : "post",
				url : form.attr("action"),
				data : form.serialize(),
				dataType : "json",
				success : function(data) {
					window.location = dum.appName + "/ordService/index.html";
				}
			});
		});
	},
	displayCusCompany : function() {
		var param={};
		param.companyNature=$("#companyNature").val();
		$.ajax({
			type : 'post',
			url : dum.appName + '/perfect/listByCusId.html',
			dataType : 'json',
			data:param,
			success : function(data) {
				if (data && data.length > 0) {
					var options = '<option value="">--选择已有公司--</option>';
					$.each(data, function(index, item) {
						options += '<option value="' + item.id + '">' + item.companyName + '</option>';
					});
					$("#cusCompanySel").html(options);
					$(".selectCompanyDiv").show();
				}
			}
		});
	},
	chooseCompany : function() {
		var companyId = $("#cusCompanySel").val();
		$.ajax({
			type : 'post',
			url : dum.appName + '/perfect/selectCompany.html',
			dataType : 'json',
			data : {
				"id" : companyId
			},
			success : function(data) {
				taxAccountInfo.pullCusCompany(data.cusCompany,data.businessScopeList); //填充公司信息
				taxAccountInfo.pullCusCompanyLegalperson(data.cusCompanyLegalperson); //填充法人
				taxAccountInfo.pullCusCompanyTax(data.cusCompanyTax);
				$(".selectCompanyDiv").hide();
			}
		});
	}
};