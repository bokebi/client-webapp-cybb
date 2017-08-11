$(function() {
	var currentMonth = zcgsProcess.getYearMonth(new Date());
	$("#currentMonth").val(currentMonth);
	zcgsProcess.init();
	$("#sysServiceEvaluate").on("click", ".statisticsConfirm1",
			zcgsProcess.submitSysServiceEvaluate);
	
	
	/* 统计输入字符 */
	$('textarea[name="evaluateContent"]').keydown(limit).keyup(limit)
			.click(limit).focus(function() {
				window.document.oncontextmenu = function() {
					return false;
				}
			}).blur(function() {
				window.document.oncontextmenu = function() {
					return true;
				}
			});
	
})
var evaluateContentMaxInput = 200;
function limit(){
	var value = $(this).val();
	if (value.length > evaluateContentMaxInput) {
		return false;
	}
	$(this).siblings('span.size').text(
			value.length + "/" + evaluateContentMaxInput);
	return true;
}

function picDiv(obj) {
	var src = $(obj).attr("src");
	$("#picDiv").html("<img  src=" + src + " />").fadeIn("slow");
}
var zcgsProcess = {
	init : function() {
		this.currentMonth = $("#currentMonth").val();
		this.orderId = $("#orderId").val();
		this.zcgsProcessOrder();
		$("#sysServiceEvaluate").html(this.loadSysServiceEvaluateHtml());
		this.loadSysServiceEvaluate();
		this.loadProcessHtml();
	},
	loadProcessHtml : function() {
		var data = {
			orderId : this.orderId
		};
		dum.common
				.ajax({
					type : "post",
					url : "/orderProcess/findZcgsLog.html",
					data : data,
					dataType : "json",
					success : function(data) {
						var html = '';
						for (var i = 0; i < data.length; i++) {
							html += '<tr>';
							html += '  <td><span class="radius">';
							if (i + 1 < data.length) {
								html += '<span class="radius1"></span><span class="lineSpan"></span>';
							} else {
								html += '<span class="radius2"></span>';
							}
							html += '</span><span class="fw">'
									+ data[i].createString + '</span></td>';
							html += '  <td class="fw">' + data[i].weekDay
									+ '</td>';
							html += '  <td><p class="mr10 ml10">'
									+ data[i].nodeName + '</p></td>';
							html += '  <td>' + data[i].expRemark + '</td>';
							html += '  <td class="middleTop">';
							var pictureList = data[i].pictureList;
							for (var j = 0; j < pictureList.length; j++) {
								html += '   <img onclick="picDiv(this);" onmouseover="picDiv(this);"  style="width:26px;heigth:26px;cursor:pointer;" src='
										+ dum.appName
										+ "/file/img.do?id="
										+ pictureList[j].picId + ' />';
							}
							html += '  </td>';
							html += '</tr>';
						}
						$("#processTab").html(html);
					}
				});
	},
	currentMonth : '',
	orderId : '',
	companyId : '',
	getYearMonth : function(date) {
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		month = (month < 10 ? "0" + month : month);
		var mydate = (year.toString() + "-" + month.toString());
		return mydate;
	},
	zcgsProcessOrder : function() {
		var data = {
			id : this.orderId
		};
		dum.common.ajax({
			type : "post",
			url : "/orderProcess/zcgsProcessOrder.html",
			data : data,
			dataType : "json",
			success : function(data) {
				$("#companyName").html(data.companyName);
				$("#markCode").html(data.markCode);
				if (data.companyNature == '0') {
					$("#companyNature").html("一般纳税人");
				} else if (data.companyNature == '1') {
					$("#companyNature").html("小规模纳税人");
				} else {
					$("#companyNature").html("无");
				}
				$("#serviceStartTime").html(
						data.serviceStartTime ? data.serviceStartTime : '未开启');
				if (data.sysService) {
					$("#serviceName").html(data.sysService.serviceName);
					$("#serviceMobile").html(data.sysService.serviceMobile);
				}
				$("#flowName").html(data.flowName);
				$("#serviceCount").html(data.serviceCount);
				zcgsProcess.companyId = data.companyId;
				$(".viewReport").attr(
						"href",
						dum.appName + "/cusReport/viewReport.html?companyId="
								+ data.companyId);
				$("#myRenewals").attr(
						"onclick",
						"serviceRenew('" + data.companyId + "','"
								+ data.companyNature + "','"
								+ data.companyAreaCode + "','"
								+ data.companyName + "')");
			}
		});
	},
	getYearMonth : function(date) {
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		month = (month < 10 ? "0" + month : month);
		var mydate = (year.toString() + "-" + month.toString());
		return mydate;
	},
	loadSysServiceEvaluate : function() { // 2.服务评价
		var data = {
			yearToMonth : zcgsProcess.currentMonth,
			id : zcgsProcess.orderId
		};
		dum.common.ajax({
			type : "post",
			url : "/orderProcess/loadSysServiceEvaluate.html",
			data : data,
			dataType : "json",
			success : function(data) {
				if (data) {
					$(".statisticsConfirm1").remove();
					$(".evaluateContent").val(data.evaluateContent).attr(
							"disabled", true);
					$(".evaluateContent").siblings('span.size').hide();
					$("#grade" + data.grade).attr("checked", true);
				}
			}
		});
	},
	loadSysServiceEvaluateHtml : function() {
		var html = '';
		html += '<h4 class="titProcess mt20 mb20">评价</h4> ';
		html += '	<p class="color50"> ';
		html += '		<label class="mr30"><input type="radio" name="grade"  id="grade5" class="middle mr5" value="5" /><span class="middle">惊喜</span></label> ';
		html += '		<label class="mr30"><input type="radio" name="grade"  id="grade4" class="middle mr5" value="4" /><span class="middle">满意</span></label> ';
		html += '		<label class="mr30"><input type="radio" name="grade"  id="grade3" class="middle mr5" value="3"/><span class="middle">一般</span></label> ';
		html += '		<label class="mr30"><input type="radio" name="grade"  id="grade2" class="middle mr5" value="2"/><span class="middle">不满</span></label> ';
		html += '		<label class="mr30"><input type="radio" name="grade"  id="grade1" class="middle mr5" value="1" /><span class="middle">失望</span></label> ';
		html += '	</p> ';
		html += '	<p class="mt20 pr"> ';
		html += '		<span class="middleTop color50">评价服务</span> ';
		html += '		<textarea class="evaluate evaluateContent" name="evaluateContent"></textarea> ';
		html += '		<span class="size">0/200</span> ';
		html += '	</p> ';
		html += '	<p class="statisticsConfirm1" >提交评价</p> ';
		return html;
	},
	submitSysServiceEvaluate : function() {
		var grade = $("input[name=grade]:checked").val();
		var evaluateContent = $(".evaluateContent").val();
		if (grade && evaluateContent) {
			var form = $("#sysServiceEvaluate");
			var data = form.serialize();
			data += "&orderId=" + zcgsProcess.orderId;
			data += "&serviceMonth=" + zcgsProcess.currentMonth;
			dum.common.ajax({
				type : "post",
				url : "/orderProcess/saveSysServiceEvaluate.html",
				data : data,
				dataType : "json",
				success : function(data) {
					$(".commentPrompt").show();
				}
			});
		}
	}

}