$(function() {

	/* 选择所需业务是否显示公司名称输入项 */
	$("input[name='needService']").change(function() {
		$("#companyNameTr").hide();
		var name = $("#companyNameTr input").val();
		$("#companyNameTr input").val("");
		$.each($("input[name='needService']:checked"), function() {
			var id = $(this).attr("id");
			if (id == "jzbsCKB" || id == "gsbgCKB") {
				$("#companyNameTr").show();
				$("#companyNameTr input").val(name);
			}
		});
	});

	$('#recommendForm input').focus(function() {
		$(this).next('span.tips').text('');
	});
	/* 提交推荐 */
	$('#submitRecommendForm')
			.click(
					function() {
						var _customerName = $('#recommendForm input[name="customer.customerName"]');
						var _customerMobile = $('#recommendForm input[name="customer.customerMobile"]');
						if (dum.common.isNull(_customerName.val())) {
							_customerName.next('span.tips').html(
									'<span class="icon"></span>请输入客户姓名');
							return;
						}
						if (dum.common.isNull(_customerMobile.val())) {
							_customerMobile.next('span.tips').html(
									'<span class="icon"></span>请输入手机号码');
							return;
						}
						if (!dum.isPhone(_customerMobile.val())) {
							_customerMobile.next('span.tips').html(
									'<span class="icon"></span>手机号码错误');
							return;
						}
						dum.common
								.ajax({
									type : "post",
									url : "/customer/isExists.api",
									data : {
										customerMobile : _customerMobile.val()
									},
									dataType : "json",
									async : false,
									success : function(data) {
										if (1 != data.values) {
											_customerMobile
													.next('span.tips')
													.html(
															'<span class="icon"></span>该客户已注册');
										} else {
											var data = $('#recommendForm')
													.serialize();
											dum.common.ajax({
												type : "post",
												url : "/cusRecommend/saveCusRecommend.api",
												data : data,
												dataType : "json",
												success : function(data) {
													window.location.reload();
												}
											});
										}
									}
								});

					});

	/* 搜索推荐明细 */
	$('div.fr a.clinetSearch,#recommendDetailLI').click(function() {
		seachListRecommend();
	});

	/* 筛选已付费明细 */
	$('#paymentDetailLI,input[name="groupPayment"]').click(function() {
		seacListPayment();
	});

	/* 下载二维码 */
	$('div.recommendDetails td.borderTdRight p.downloadEwm').click(function() {
		window.location.href = $(this).children('a').attr('href');
	});

});

/* 搜索推荐明细 */
function seachListRecommend(pageNo) {
	pageNo = null == pageNo ? 1 : pageNo;
	var search = $("div.fr input.clinetSearchTxt").val();
	dum.common.ajax({
		type : "post",
		url : "/recommend/listRecommend.html",
		data : {
			search : search,
			pageNo : pageNo
		},
		dataType : "json",
		success : function(data) {
			showListRecommend(data);
		}
	});
}

/* 推荐明细列表展示 */
function showListRecommend(data) {
	var _tbody = $('#recommendList').html('');

	$.each(data, function() {
		var _this = this;
		var _tr = _tbody.addTr();
		_tr.addTd().text(this.customerName);// 用户名称
		_tr.addTd().text(this.customerMobile);// 用户手机号
		_tr.addTd().text(this.isRegister == 0 ? "已注册" : "未注册");// 是否注册
		_tr.addTd().text(this.paymentAmount); 
	
	});
	// 分页组件
	/*dum.pagingPage($("#recommendList").parent(), data, pageNo, function(index) {
		seachListRecommend(index);
	});*/

}

/* 推荐明细列表展示 
function showListRecommend(data, pageNo) {
	var _tbody = $('#recommendList').html('');

	$.each(data, function() {
		var _this = this;
		var _tr = _tbody.addTr();
		_tr.addTd().text(this.customerName);// 用户名称
		_tr.addTd().text(this.customerMobile);// 用户手机号
		_tr.addTd().text(this.isRegister == 0 ? "已注册" : "未注册");// 是否注册
		_tr.addTd().text(this.paymentAmount); 
	
	});
	// 分页组件
	dum.pagingPage($("#recommendList").parent(), data, pageNo, function(index) {
		seachListRecommend(index);
	});

}*/

