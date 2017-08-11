$(function() {
	var ordServiceId = $("#ordServiceId").val();
	registerCompany.init(ordServiceId);
});
var registerCompany = {
	init : function(ordServiceId) {
		userClient.getMinHight();
		this.eventLins();
		dum.common.ajax({
			type : 'post',
			url : '/perfect/industryTypes.html',
			dataType : 'json',
			async : false,
			success : function(data) {
				if (data) {
					registerCompany.industryTypes = data;
				}
			}
		});
		dum.common.ajax({
			type : 'post',
			url : '/perfect/findAddress.html',
			dataType : 'json',
			async : false,
			success : function(data) {
				registerCompany.citys = data;
			}
		});
		registerCompany.yhgsHtml();
		dum.common
				.ajax({
					type : 'post',
					url : '/perfect/zcgsData.html',
					data : {
						id : ordServiceId
					},
					dataType : 'json',
					async : false,
					success : function(data) {
						if (data) {
							$("#serviceProductId").val(data.ordService.serviceProductId);
							$("#modelId").val(data.ordService.modelId);
							registerCompany.shareholderList = data.shareholderList;
							if(data.ordServiceCompany){ //修改
								$("#ordServiceCompanyId").val(data.ordServiceCompany.id);
								$("#serviceStatus").val(data.ordServiceCompany.serviceStatus);
								registerCompany.cusCompanySupervisor = data.cusCompanySupervisor;
								if (data.cusCompanyLegalperson) {
									registerCompany.cusCompanyLegalperson = data.cusCompanyLegalperson;
								}
								if(data.cusCompany){
									registerCompany.cusCompany = data.cusCompany;
									$("#js_registeredCapital").val(data.cusCompany.registeredCapital);
									$("#companyAddress").val(data.cusCompany.companyAddress);
									$("#companyId").val(data.cusCompany.id);
									$("#companyAreaId").setArea({areaId:data.cusCompany.areaId});
									if (registerCompany.cusCompany.companyType== '0') {
										registerCompany.yhgsHtml();
									} else {
										registerCompany.yxhhgsHtml();
										$("#merged").attr("checked", true);
									}
								}
								if(data.cusServiceContactWay){
									$("#cusServiceContactWayId").val(data.cusServiceContactWay.id);
									$("#contactAreaId").setArea({areaId:data.cusServiceContactWay.areaId});
									$("#addressDetails").val(data.cusServiceContactWay.addressDetails);
								}
							}
							if(data.ordPerfectRegister){
								registerCompany.ordPerfectRegister = data.ordPerfectRegister;
								$("#ordPerfectRegisterId").val(data.ordPerfectRegister.id);
							}
							registerCompany.businessScopeList = data.businessScopeList;
							$(".js_gd").find(".cancelPartner").first().remove();
						}
					}
				});
		$(".companyMsg").html(this.cusCompanyHtml(this.cusCompany));

		if (this.ordPerfectRegister && this.ordPerfectRegister.id) {
			var html = '';
			html += '<table>';
			if (this.ordPerfectRegister.companyNameOne) {
				html += '<tr><td>公司名称：</td><td><input style="width:300px;" name="ordPerfectRegister.companyNameOne" value="'+ this.ordPerfectRegister.companyNameOne	+ '" /></td></tr>';
			}
			if (this.ordPerfectRegister.companyNameTwo) {
				html += '<tr><td>备选名称1：</td><td><input style="width:300px;" name="ordPerfectRegister.companyNameTwo" value="'+ this.ordPerfectRegister.companyNameTwo+ '" /></td></tr>';
			}
			if (this.ordPerfectRegister.companyNameThree) {
				html += '<tr><td>备选名称2：</td><td><input style="width:300px;" name="ordPerfectRegister.companyNameThree" value="'+ this.ordPerfectRegister.companyNameThree + '" /></td></tr>';
			}
			html += '</table>';
			$("#companyNameHtml").html(html);
		} else {
			$("#companyNameHtml").html(this.cusCompanyNameHtml(1) + this.cusCompanyNameHtml(2)+ this.cusCompanyNameHtml(3));
		}
	    if($("#serviceStatus").val()&&$("#serviceStatus").val().length>0){
			$(".defineTax").remove();
			$(":input").attr("disabled",true);
			$(".addPartner").remove();
			$(".infoPrompt").remove();
		} 
	},
	ordPerfectRegister : {},
	industryTypes : {},
	cusOrderCompany : {},
	cusCompany : {},// 公司信息
	cusCompanyLegalperson : {},// 法人信息
	cusCompanySupervisor : {},// 监事人信息
	shareholderList : {},// 股东列表
	index : 0,//股东人数索引
	businessScopeList : {},
	citys : {},
	resetBtnAndIndex:function(){
		//重置按钮及股东人数索引
		var arrBtn = $('table.js_gd');
		var arrIndex = $('table.js_gd span.index');
		for (var i = 1; i <= arrBtn.length; i++) {
			arrIndex.eq(i - 1).html(i);
			if (1 == i && arrBtn.length == 1) {
				arrBtn.eq(i - 1).find('.addPartner').show();
				arrBtn.eq(i - 1).find('.cancelPartner').hide();
			} else if (i == arrBtn.length) {
				arrBtn.eq(i - 1).find('.addPartner').show();
				arrBtn.eq(i - 1).find('.cancelPartner').show();
			} else if (1 == i) {
				arrBtn.eq(i - 1).find('.addPartner').hide();
				arrBtn.eq(i - 1).find('.cancelPartner').hide();
			} else {
				arrBtn.eq(i - 1).find('.addPartner').hide();
				// $('table.js_gd').eq(i - 1).find('.cancelPartner').hide();
			}
		}
	},
	eventLins : function() {
		// 提交数据
		$('.defineTax').click(function() {
			$('.Infoprompt').show();
			$('.Infoprompt .subSaveA1').click(function() {
				$("#serviceStatus").val('1');
				$('.Infoprompt').hide(registerCompany.submit);
			});
			$('.Infoprompt .subSaveA2').click(function() {
				$('.Infoprompt').hide(registerCompany.submit);
			});
			$('.Infoprompt p.close').click(function() {
				$('.Infoprompt').hide();
			});
		});
		$("#shareholder").on("click",".addPartner",
						function() {
							var html = '';
							var companyType = $("input[name='cusCompany.companyType']:checked").val();
							html += registerCompany.shareholderHtml('',companyType);
							$("#shareholder").append(html);
							registerCompany.resetName();
							
							registerCompany.resetBtnAndIndex();
						});
		$("#shareholder").on("click", ".cancelPartner", function() {
			var js_gd = $(this).parents(".js_gd");
			var preObj = js_gd.prev();
			js_gd.remove();
			preObj.find(".addPartner").show();
			registerCompany.resetName();
			
			registerCompany.index--;
			registerCompany.resetBtnAndIndex();
		});

		$(".companyMsg").on("click", '.scopeSelect', function() {
			var option = $(this).find("option:selected");
			$("#js_scrope").html(option.attr("desc"));
		})
	},
	submit : function() {
		registerCompany.setCompanyNames();
		checkCustomer(function() { // 检查登陆
			var form = $("#zcgsPerfect");
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
	resetName : function() {
		var reCat = /\d+/;
		$(".js_gd").each(function(i) {
			$(this).find(":input").each(function(j) {
				var name = $(this).attr("name");
				name = name.replace(reCat, i);
				$(this).attr("name", name);
			})
		})
	},
	convData : function(val) {
		if (val == '1') {
			return 'One';
		} else if (val == '2') {
			return 'Two';
		} else if (val == '3') {
			return 'Three';
		}
	},
	setCompanyNames : function() {
		$(".companyName").each(
				function(i) {
					var name = $(this).val();
					if (name && name.length > 0) {
						var names = $(this).parents(".nameTr").find(".nameZh");
						var companyName = '';
						$.each(names, function(index) {
							companyName += $(this).val();
						})
						$("#companyNameHtml").append("<input type='hidden' name='ordPerfectRegister.companyName"+ registerCompany.convData(i + 1)+ "' value='" + companyName + "' />");
					}
				})
	},
	citysHtml : function() {
		var html = '';
		html += '	<select class="nameZh" name="cityName">';
		for (var i = 0; i < this.citys.length; i++) {
			html += '<option value="' + this.citys[i].areaName + '">'+ this.citys[i].areaName + '</option>';
		}
		html += '	</select>';
		return html;
	},
	cityHtml:function(){
		var html = '';
		html += '	<select class="nameZh" name="cityName">';
		for (var i = 0; i < this.citys.length; i++) {
			var cityName = this.citys[i].areaName.split('市')[0];
			html += '<option value="' + cityName + '">'+ cityName + '</option>';
		}
		html += '	</select>';
		return html;
	},
	companyNameHtml : function() {
		return '<input type="text" name="companyName" placeholder="公司名" class="companyName nameZh" />';
	},
	companyTypeHtml : function() {
		return '<input name="companyType" type="text" name="three"  placeholder="行业类型" class="postfix nameZh" />';
	},
	cusCompanyNameHtml : function(zuheType) {
		var html = '';
		html += '<p class="mb20 nameTr" >';
		html += ' <select name="assemble">';
		html += '		<option ' + (zuheType == '1' ? 'selected' : '')
				+ ' value="1">组合1</option>';
		html += '		<option ' + (zuheType == '2' ? 'selected' : '')
				+ ' value="2">组合2</option>';
		html += '		<option ' + (zuheType == '3' ? 'selected' : '')
				+ ' value="3">组合3</option>';
		html += '	</select>';
		if (zuheType == '1') {
			html += this.citysHtml() + this.companyNameHtml()
					+ this.companyTypeHtml();
		} else if (zuheType == '2') {
			html += this.companyNameHtml() + this.cityHtml()
					+ this.companyTypeHtml();
		} else if (zuheType == '3') {
			html += this.companyNameHtml() + this.companyTypeHtml()
					+ this.cityHtml();
		}
		var companyType = $(
				"input[name='cusCompany.companyType']:checked").val();
		if (companyType == '0') {
			html += '	<input name="postfix" type="text"  value="有限公司" class="postfix postfix_last nameZh" />';
		} else {
			html += '	<input name="postfix" type="text" value="有限合伙公司" class="postfix postfix_last nameZh" />';
		}
		html += '</p>';
		return html;
	},
	yhgsHtml : function() { // 有限公司
		registerCompany.index = 0;
		
		var jsrfr = '';
		jsrfr += this.legalpersonHtml(this.cusCompanyLegalperson, '0');
		jsrfr += this.cusCompanySupervisorHtml(this.cusCompanySupervisor);
		$("#jsrfr").html(jsrfr);
		var html = '';
		html += this.shareholderHtml(this.shareholderList, '0');
		$("#shareholder").html(html);
	},
	yxhhgsHtml : function() {// 有限合伙公司
		registerCompany.index = 0;
		
		var jsrfr = '';
		//jsrfr += this.legalpersonHtml(this.cusCompanyLegalperson, '1');
		$("#jsrfr").html(jsrfr);
		var html = '';
		html += this.shareholderHtml(this.shareholderList, '1');
		$("#shareholder").html(html);
		$(".js_gd").find(".cancelPartner").first().remove();
	},
	legalpersonHtml : function(cusCompanyLegalperson, companyType) {// 法人html
		var html = '';
		var isOk = false;
		if (cusCompanyLegalperson && cusCompanyLegalperson.id) {
			html += '<input type="hidden"   value="' + cusCompanyLegalperson.id + '" name="cusCompanyLegalperson.id" />';
			isOk = true;
		}
		html += '<tr>';
		if (companyType == '0') {
			html += '		<td colspan="5"><h5 class="fz14 color50">法人</h5></td>';
		} else {
			html += '		<td colspan="5"><h5 class="fz14 color50">执行合伙人</h5></td>';
		}
		html += '</tr>';
		html += '<tr>';
		html += '		<td width="82">姓名</td>';
		html += '		<td><input type="text" name="cusCompanyLegalperson.legalPersonName" placeholder="真实姓名" class="relname" style="margin-right:40px;" value="'+ (isOk ? cusCompanyLegalperson.legalPersonName : "")+ '"></td>';
		html += '		<td>';
		html += '			<select class="documentType" name="cusCompanyLegalperson.documentType">';
		html += "				   <option " + ('sfz' == (cusCompanyLegalperson ? cusCompanyLegalperson.documentType : '') ? 'selected' : '') + " value='sfz'>身份证</option>";
		html += "				   <option " + ('hxz' == (cusCompanyLegalperson ? cusCompanyLegalperson.documentType : '') ? 'selected' : '') + " value='hxz'>回乡证</option>";
		html += "				   <option " + ('tbz' == (cusCompanyLegalperson ? cusCompanyLegalperson.documentType : '') ? 'selected' : '') + " value='tbz'>台胞证</option>";
		html += "				   <option " + ('hz' == (cusCompanyLegalperson ? cusCompanyLegalperson.documentType : '') ? 'selected' : '') + " value='hz'>护照</option>";
		html += '			</select>';
		html += '		</td>';
		html += '		<td><input   name="cusCompanyLegalperson.documentNo" value="'	+ (isOk ? cusCompanyLegalperson.documentNo : '')+ '" type="text" placeholder="证件号码" class="idNumber" /></td>';
		html += '		<td width="180"></td>';
		html += '</tr>';
		html += '<tr>';
		html += '		<td>证件地址</td>';
		html += '		<td colspan="4"><input value="'+ (isOk ? cusCompanyLegalperson.documentAddress : '')+ '"  name="cusCompanyLegalperson.documentAddress" type="text" placeholder="请填写证件上的地址" class="address" /></td>';
		html += '	</tr>';
		return html;
	},
	cusCompanySupervisorHtml : function(cusCompanySupervisor) {
		var html = '';
		var isOk = false;
		if (cusCompanySupervisor && cusCompanySupervisor.id) {
			html += '<input type="hidden" value="' + cusCompanySupervisor.id+ '" name="cusCompanySupervisor.id" />';
			isOk = true;
		}
		html += '<tr>';
		html += '		<td colspan="5"><h5 class="fz14 color50">监事人</h5></td>';
		html += '	</tr>';
		html += '	<tr>';
		html += '		<td>监事姓名</td>';
		html += '		<td><input type="text"  name="cusCompanySupervisor.supervisorName" placeholder="真实姓名" class="relname"  value="'+ (isOk ? cusCompanySupervisor.supervisorName : "")+ '" /></td>';
		html += '		<td>';
		html += '			<select class="documentType" name="cusCompanySupervisor.documentType">';
		html += "				   <option " + ('sfz' == (cusCompanySupervisor ? cusCompanySupervisor.documentType : '') ? 'selected' : '') + " value='sfz'>身份证</option>";
		html += "				   <option " + ('hxz' == (cusCompanySupervisor ? cusCompanySupervisor.documentType : '') ? 'selected' : '') + " value='hxz'>回乡证</option>";
		html += "				   <option " + ('tbz' == (cusCompanySupervisor ? cusCompanySupervisor.documentType : '') ? 'selected' : '') + " value='tbz'>台胞证</option>";
		html += "				   <option " + ('hz' == (cusCompanySupervisor ? cusCompanySupervisor.documentType : '') ? 'selected' : '') + " value='hz'>护照</option>";
		html += '			</select>';
		html += '		</td>';
		html += '		<td><input type="text" name="cusCompanySupervisor.documentNo" value="' + (isOk ? cusCompanySupervisor.documentNo : '') + '"   placeholder="证件号码" class="idNumber" /></td>';
		html += '		<td></td>';
		html += '	</tr>';
		html += '	<tr>';
		html += '		<td>证件地址</td>';
		html += '		<td colspan="4"><input type="text" value="' + (isOk ? cusCompanySupervisor.documentAddress : '') + '" name="cusCompanySupervisor.documentAddress" placeholder="请填写证件上的地址" class="address" /></td>';
		html += '	</tr>';
		return html;
	},
	cooperativeNature : function(obj) {
		var val = $(obj).val();
		if (val == '0') {
			$(obj).parents(".js_gd").find(".isExecuter").removeAttr("disabled");
		} else {
			$(obj).parents(".js_gd").find(".isExecuter").attr("disabled",
					"disabled");
		}
	},
	shareholderHtml : function(shareholderList, companyType) {
		var html = '';
		var len = 1;
		if (shareholderList && shareholderList.length > 0) {
			len = shareholderList.length;
		}
		for (var i = 0; i < len; i++) {
			var shareholder = shareholderList ? shareholderList[i] : "";
			html += '  <table width="100%"  class="js_gd">';
			html += '            <input type="hidden" name="shareholderList[' + i + '].id" value="' + (shareholder ? shareholder.id : '') + '" />'
			html += '				<tr>';
			html += '					<td colspan="5"><h5 class="fz14 color50">' + (companyType == '0' ? '股东' : '合伙人') + '<span class= "index"> ' + (++registerCompany.index) + '</span></h5></td>';
			html += '				</tr>';
			html += '				<tr>';
			html += '					<td width="82">';
			html += '						<select onchange="registerCompany.cooperativeNature(this);" name="shareholderList[' + i + '].cooperativeNature">';
			if (companyType == '0') {
				html += '				<option ' + ("2" == (shareholder ? shareholderList[i].cooperativeNature : '') ? 'selected' : '') + ' value="2">股东姓名</option>';
				html += '				<option ' + ("3" == (shareholder ? shareholderList[i].cooperativeNature : '') ? 'selected' : '') + ' value="3">公司名称</option>';
			} else {
				html += '				<option ' + ("1" == (shareholder ? shareholderList[i].cooperativeNature : '') ? 'selected' : '') + ' value="1">有限合伙人</option>';
				html += '				<option ' + ("0" == (shareholder ? shareholderList[i].cooperativeNature : '') ? 'selected' : '') + ' value="0">普通合伙人</option>';
				html += '				<option ' + ("3" == (shareholder ? shareholderList[i].cooperativeNature : '') ? 'selected' : '') + ' value="3">公司名称</option>';
			}
			html += '						</select>';
			html += '					</td>';
			html += '                 <td width="253"><input name="shareholderList[' + i + '].shareholderName" value="' + (shareholder ? shareholder.shareholderName : '') 	+ '" type="text" placeholder="名称" class="relname" /></td>'
			html += '		            <td>';
			html += '			          <select class="documentType" name="shareholderList[' + i + '].documentType">';
			html += "				         <option " + ('sfz' == (shareholder ? shareholderList[i].documentType : '') ? 'selected' : '') + " value='sfz'>身份证</option>";
			html += "				         <option " + ('hxz' == (shareholder ? shareholderList[i].documentType : '') ? 'selected' : '') + " value='hxz'>回乡证</option>";
			html += "				         <option " + ('tbz' == (shareholder ? shareholderList[i].documentType : '') ? 'selected' : '') + " value='tbz'>台胞证</option>";
			html += "				         <option " + ('hz' == (shareholder ? shareholderList[i].documentType : '') ? 'selected' : '') + " value='hz'>护照</option>";
			html += "				         <option " + ('gszch' == (shareholder ? shareholderList[i].documentType 	: '') ? 'selected' : '') + " value='gszch'>公司注册号</option>";
			html += '			          </select>';
			html += '		            </td>';
			html += '					<td><input  name="shareholderList[' + i + '].documentNo" value="' + (shareholder ? shareholder.documentNo : '') + '"  type="text" placeholder="证件号码" class="idNumber" /></td>';
			html += '					<td width="210"></td>';
			html += '				</tr>';
			html += '				<tr>';
			html += '					<td>证件地址</td>';
			html += '					<td colspan="4"><input    name="shareholderList[' + i + '].cardAddress"  value="' + (shareholder ? shareholder.cardAddress : '') + '"   type="text" placeholder="请填写地址" class="address"/></td>';
			html += '				</tr>';
			html += '				<tr>';
			html += '					<td>出资额</td>';
			html += '					<td><input   type="text" name="shareholderList[' + i 	+ '].shareholderMoney" value="' + (shareholder&&shareholder.shareholderMoney ? shareholder.shareholderMoney : '') + '"  class="money" value="10">万</td>';
			html += '					<td>股权比例</td>';
			html += '					<td><input  type="text" class="money"  name="shareholderList[' + i + '].shareholderRatio" value="' + (shareholder ? shareholder.shareholderRatio : '') + '">%</td>';
			html += '					<td style="text-align:center;">';
			if(registerCompany.index>1){
				html+='<a href="javascript:void(0);" type="button" class="btn_red addPartner"   style="margin:0 10px;">增加股东</a> <a   class="btn_blue cancelPartner">取消</a>';
			}else{
				html += '<a href="javascript:void(0);" type="button" class="btn_red addPartner"   style="margin:0 10px;">增加股东</a>';
			}
			html += '					    ';
			html += '					</td>';
			html += '				</tr>';
			if (companyType == '1') {
				html += '            <tr><td colspan="5"><label for="isExecuter' + i + '" class="mb20"><input  class="isExecuter middle" id="isExecuter'+ i+ '" '
						+ ('0' == (shareholder ? shareholderList[i].isExecuter: '') ? 'checked' : 'disabled=disabled')+ ' name="shareholderList['+i+ '].isExecuter" value="0" type="checkbox" /><span class="middle">设为执行合伙人</span></label></td></tr>'
			}
			html += '  </table>';
		}
		return html;
	},
	cusCompanyHtml : function(cusCompany) { // 公司行业及经营范围
		var html = '';
		html += '<table>';
		html += '		<tr>';
		html += '			<td>公司行业</td>';
		html += '			<td>';
		html += '				<select name="cusCompany.companyIndustryCode" >';
		var companyIndustryCode = cusCompany ? cusCompany.companyIndustryCode: '';
		for (var i = 0; i < registerCompany.industryTypes.length; i++) {
			var industry = registerCompany.industryTypes[i];
			if (industry.industrys && industry.industrys.length > 0) {
				html += '            <optgroup label="' + industry.industryName+ '" >';
				for (var j = 0; j < industry.industrys.length; j++) {
					var inObj = industry.industrys[j];
					if (companyIndustryCode == inObj.industryCode) {
						html += '             <option selected value="'+ inObj.industryCode + '">'+ inObj.industryName + '</option>';
					} else {
						html += '             <option  value="'+ inObj.industryCode + '">'+ inObj.industryName + '</option>';
					}
				}
				html += '            </optgroup>';
			}
		}
		html += '				</select>';
		html += '			</td>';
		html += '		</tr>';
		html += '		<tr>';
		html += '			<td>公司类型</td>';
		html += '			<td>';
		html += '				<select class="scopeSelect" name="cusCompany.scopeName"  >';
		var scopeName = cusCompany ? cusCompany.scopeName : '';
		for (var i = 0; i < this.businessScopeList.length; i++) {
			var businessScope = this.businessScopeList[i];
			if (scopeName == businessScope.scopeName) {
				html += '             <option desc="' + businessScope.scopeDesc+ '" selected  value="' + businessScope.scopeName+ '">' + businessScope.scopeName + '</option>';
			} else {
				html += '             <option  desc="'+ businessScope.scopeDesc + '"    value="'+ businessScope.scopeName + '">'+ businessScope.scopeName + '</option>';
			}
		}
		html += '				</select>';
		html += '			</td>';
		html += '		</tr>';
		html += '		<tr>';
		html += '			<td>经营范围</td>';
		html += '			<td><textarea id="js_scrope" name="cusCompany.scopeDesc">'
				+ (cusCompany.scopeDesc ? cusCompany.scopeDesc : '')
				+ '</textarea></td>';
		html += '		</tr>';
		html += '	</table>';
		return html;
	}
};