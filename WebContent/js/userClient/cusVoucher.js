$(function(){
	loadVoucherPeriodList();
	$("#upPageNav").click(function(){
		upPage();
	});
	
	$("#nextPageNav").click(function(){
		nextPage();
	});
	
	$("#upPageImg").click(function(){
		upPage();
	});
	
	$("#nextPageImg").click(function(){
		nextPage();
	});
	
	$(".voucherPeriodSel").change(function(){
		$("#currentVoucherPage").val(1);
		$(".voucherCurrentPageNav").text(1);
		
		$("#currentVoucherId").val("");
		$("#upVoucherId").val("");
		$("#nextVoucherId").val("");
		
		queryIndexData();
		showVoucherSum();
		$("#voucherSumDiv").hide();
		$("#voucherDetail").hide();
		$("#voucherIndexDiv").show();
	})
});

function nextPage(){
	var currentPage = parseInt($("#currentVoucherPage").val());
	var totalVoucherPage = parseInt($("#totalVoucherPage").val());
	if(currentPage<totalVoucherPage){
		if (currentPage == 1) {
			$("#voucherIndexDiv").hide();
			$("#voucherSumDiv").show();
			$("#currentVoucherPage").val(currentPage + 1);
			$(".voucherCurrentPageNav").text(currentPage + 1);
		} else {
			var voucherId = $("#nextVoucherId").val();
			queryVoucherList(voucherId);
			$("#voucherSumDiv").hide();
			$("#voucherIndexDiv").hide();
			$("#voucherDetail").show();
			$("#currentVoucherPage").val(currentPage + 1);
			$(".voucherCurrentPageNav").text(currentPage + 1);
		}
	}
}

function upPage(){
	var currentPage = parseInt($("#currentVoucherPage").val());
	if (currentPage != 1) {
		if (currentPage == 2) {
			$("#voucherSumDiv").hide();
			$("#voucherDetail").hide();
			$("#voucherIndexDiv").show();
			$("#currentVoucherPage").val(currentPage - 1);
			$(".voucherCurrentPageNav").text(currentPage - 1);
		}else if(currentPage == 3){
			$("#voucherSumDiv").show();
			$("#voucherDetail").hide();
			$("#voucherIndexDiv").hide();
			
			$("#currentVoucherId").val("");
			$("#upVoucherId").val("");
			$("#nextVoucherId").val("");
			
			$("#currentVoucherPage").val(currentPage - 1);
			$(".voucherCurrentPageNav").text(currentPage - 1);
		}else {
			var voucherId = $("#upVoucherId").val();
			queryVoucherList(voucherId);
			$("#voucherSumDiv").hide();
			$("#voucherIndexDiv").hide();
			$("#voucherDetail").show();
			$("#currentVoucherPage").val(currentPage - 1);
			$(".voucherCurrentPageNav").text(currentPage - 1);
		}
	}
}

function queryVoucherList(voucherId){
	$.ajax({
		   type: "POST",
		   url: dum.appName+"/cusReport/queryCusUIVoucher.html",
		   dataType:"json",
		   data:{"periodId":$(".voucherPeriodSel").val(),"voucherId":voucherId},
		   success: function(data){
			   if(data){
				   var currentVoucherVo = data.currentVoucherVo;
				   var upVoucherVo = data.upVoucherVo;
				   var nextVoucherVo = data.nextVoucherVo;
				   if(currentVoucherVo){
					   $("#voucherCodeTxt").val(currentVoucherVo.voucherCode);
					   $("#voucherSeqTxt").val(currentVoucherVo.voucherSeq);
					   $("#voucherDateTxt").val(dum.formatDate(currentVoucherVo.voucherDate));
					   if(currentVoucherVo.voucherBillNumber){
						   $("#billCountSpan").text(currentVoucherVo.voucherBillNumber);
					   }else{
						   $("#billCountSpan").text("0");
					   }
					   $("#voucherPeriodSpan").text(currentVoucherVo.periodYear+"年第"+currentVoucherVo.periodNumber+"期");
					   var titelTr = $("#voucherTable tr:eq(0)");
					   var totalTr = $("#voucherTable tr:last");
					   $("#voucherTable").html("");
					   $("#voucherTable").append(titelTr);
					   $("#voucherTable").append(totalTr);
					   var entrys = currentVoucherVo.entrys;
					   if(entrys){
						   var total_borrowMoney=0;
						   var total_loanMoney=0;
						   $.each(entrys,function(index,item){
							   var voucherTr = '<tr>';
							   voucherTr +='<td>'+item.abstractContent+'</td>';
							   voucherTr +='<td>'+item.subjectName+'</td>';
							   voucherTr +='<td class="col_debite"><div class="money_unit1 borrowMoney">';
							   if(item.borrowMoney){
								   total_borrowMoney=total_borrowMoney+Number(item.borrowMoney);
								   voucherTr += getSpanHtml(item.borrowMoney);
							   }
							   voucherTr +='</div></td>';
							   
							   voucherTr +='<td class="col_summary1 col_debite"><div class="money_unit1 loanMoney">';
							   if(item.loanMoney){
								   total_loanMoney=total_loanMoney+Number(item.loanMoney);
								   voucherTr += getSpanHtml(item.loanMoney);
							   }
							   voucherTr +='</div></td>';
							   voucherTr +='</tr>';
							   $(voucherTr).insertBefore(totalTr);
							   /*titelTr.append(voucherTr);*/
						   })
						   
						   $("#borrowMoneys").html(getSpanHtml(total_borrowMoney.toFixed(2)));
						   $("#loanMoneys").html(getSpanHtml(total_loanMoney.toFixed(2)));
						   $("#total").text("合计："+DX(total_borrowMoney.toFixed(2)));
					   }
					   //审核人
					   if(currentVoucherVo.auditName){
						   $("#voucherAuditName").text(currentVoucherVo.auditName);
					   }
					   //制作人
					   if(currentVoucherVo.producerName){
						   $("#voucherProducerName").text(currentVoucherVo.producerName);
					   }
					   $("#currentVoucherId").val(currentVoucherVo.vId);
				   }
				   if(upVoucherVo){
					   $("#upVoucherId").val(upVoucherVo.vId);
				   }
				   if(nextVoucherVo){
					   $("#nextVoucherId").val(nextVoucherVo.vId);
				   }
			   }
		   }
	});
}

function queryIndexData(){
	$.ajax({
		   type: "POST",
		   url: dum.appName+"/cusReport/voucherIndex.html",
		   dataType:"json",
		   data:{"periodId":$(".voucherPeriodSel").val()},
		   success: function(data){
			   if(data){
				   $(".voucherCompany").text(data.companyName);
				   $(".voucherMonth").text(data.currentMonth);
				   $(".voucherCode").text(data.voucherCode);
				   $(".minSeq").text(data.minSeq);
				   $(".maxSeq").text(data.maxSeq);
			   }
		   }
	});
}

function showVoucherSum(){
	$.ajax({
		   type: "POST",
		   url: dum.appName+"/cusReport/queryVoucherSumReport.html",
		   dataType:"json",
		   data:{"periodId":$(".voucherPeriodSel").val()},
		   success: function(data){
			   if(data){
				   $("#companyName").text(data.companyName);
				   $("#voucherDate").html(data.startDate+'<span class="ml5 mr5">至</span>'+data.endDate);
				   if(data.voucheCount){
					   var totalPage =parseInt(data.voucheCount)+2;
					   $("#voucheCount").text(data.voucheCount+"张");
					   $("#totalVoucherPage").val(totalPage);
					   $(".voucherTotalPageNav").text("/"+totalPage);
				   }else{
					   $("#totalVoucherPage").val(2);
					   $(".voucherTotalPageNav").text("/"+2);
					   $("#voucheCount").text(0+"张");
				   }
				   if(data.billTatol){
					   $("#billTatol").text(data.billTatol+"张");
				   }else{
					   $("#billTatol").text("0张");
				   }
				   
				   var $tbody = $("#voucherSumTable").html("");
				   var totalBorrow = 0;
				   var totalLoan = 0;
				   
				   $.each(data.list,function(index, item) {
						if(Number(item.borrowAmount)){
							totalBorrow += Number(item.borrowAmount);
						}
						if(Number(item.loanAmount)){
							totalLoan += Number(item.loanAmount);
						}
						var $tr = $('<tr><td class="tl" width="25%">'+ item.subjectCode + '</td>'+
							'<td class="tl" width="25%">'+ item.subjectName + '</td><td class="tr" width="25%">'+ formatCurrency(item.borrowAmount)+ '</td>'+
							'<td class="tr" width="25%">'+ formatCurrency(item.loanAmount)+ '</td></tr>');
						$tbody.append($tr);
				   });
				   var $tr = $('<tr><td width="5%" align="center"><p></p></td>'+
							'<td width="15%" align="center"><p>合计</p></td>'+
							'<td width="6%"  ><p align="right">'+ formatCurrency(totalBorrow) + '</p></td>'+
							'<td width="6%"  ><p align="right">'+ formatCurrency(totalLoan)+ '</p></td>'+
					'</tr>');
					$tbody.append($tr);
			   }
		   }
	});
}

function loadVoucherPeriodList(){
	$.ajax({
		   type: "POST",
		   url: dum.appName+"/myCompany/queryPeriodList.html",
		   asnyc:false,
		   success: function(data){
			   if(data){
				   $(".voucherPeriodSel").empty();
				   var options = '';
				   $.each(data,function(index,value){
					   options += '<option value="'+value.id+'">'+value.periodYear+'-'+value.periodNumber+'</option>';
				   })
				   $(".voucherPeriodSel").append(options);
				   $(".voucherPeriodSel option:last").attr("selected","selected");
				   queryIndexData();
				   showVoucherSum();
			   }
		   }
	});
}


//转换中文
function DX(numberValue) {
	var numberValue = new String(Math.round(numberValue * 100));
	var chineseValue = ""; // 转换后的汉字金额
	if(Number(numberValue) < 0) {
		chineseValue += "负";
		numberValue = new String(Math.abs(numberValue));
	}
	var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
	var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
	var len = numberValue.length; // numberValue 的字符串长度
	var Ch1; // 数字的汉语读法
	var Ch2; // 数字位的汉字读法
	var nZero = 0; // 用来计算连续的零值的个数
	var String3; // 指定位置的数值
	if (numberValue == 0) {
		chineseValue = "零元整";
		return chineseValue;
	}
	String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值
	for (var i = 0; i < len; i++) {
		String3 = parseInt(numberValue.substr(i, 1), 10); // 取出需转换的某一位的值
		if (i != (len - 3) && i != (len - 7) && i != (len - 11)
				&& i != (len - 15)) {
			if (String3 == 0) {
				Ch1 = "";
				Ch2 = "";
				nZero = nZero + 1;
			} else if (String3 != 0 && nZero != 0) {
				Ch1 = "零" + String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			} else {
				Ch1 = String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			}
		} else { // 该位是万亿，亿，万，元位等关键位
			if (String3 != 0 && nZero != 0) {
				Ch1 = "零" + String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			} else if (String3 != 0 && nZero == 0) {
				Ch1 = String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			} else if (String3 == 0 && nZero >= 3) {
				Ch1 = "";
				Ch2 = "";
				nZero = nZero + 1;
			} else {
				Ch1 = "";
				Ch2 = String2.substr(i, 1);
				nZero = nZero + 1;
			}
			if (i == (len - 11) || i == (len - 3)) { // 如果该位是亿位或元位，则必须写上
				Ch2 = String2.substr(i, 1);
			}
		}
		chineseValue = chineseValue + Ch1 + Ch2;
	}
	var two=numberValue.substr(numberValue.length-2,1);
	if (String3 == 0&&two==0) { // 最后一位（分）为0时，加上“整”
		chineseValue = chineseValue + "整";
	}
	return chineseValue;
}

/**  
* 数字格式转换成千分位  
*@param{Object}num  
*/
function commQFW(num) {
	//1.先去除空格,判断是否空值和非数   
	num = num + "";
	num = num.replace(/[ ]/g, ""); //去除空格  
	if (num == "") {
		return;
	}
	if (isNaN(num)) {
		return;
	}
	//2.针对是否有小数点，分情况处理   
	var index = num.indexOf(".");
	if (index == -1) {//无小数点   
		var reg = /(-?\d+)(\d{3})/;
		while (reg.test(num)) {
			num = num.replace(reg, "$1,$2");
		}
	} else {
		var intPart = num.substring(0, index);
		var pointPart = num.substring(index + 1, num.length);
		var reg = /(-?\d+)(\d{3})/;
		while (reg.test(intPart)) {
			intPart = intPart.replace(reg, "$1,$2");
		}
		num = intPart + "." + pointPart;
	}
	return num;
}


//组装格子
function getSpanHtml(data){
	var isOk=false;
	if(data<0){
		isOk=true;
	}
	data=m_Round(data,2)+"";
	if(data=='undefined'||data=='0'){
		return "";
	}
	if(data.indexOf(".")!=-1)
	{
		var datas=data.split(".");
		var befor=datas[0];
		var after=datas[1];
		if(befor<=0){
			befor=0-befor;
		}
		if(after.length==1){
			after+='0';
		}
		data=befor+''+after;
	}else{
		if(Math.abs(data)>0){
			data=data.replace("-",'');
			data=data+"00";
		}
	}
	var num=data.length;
	var len=11;
	if(len-num<=0){
		num=len;
	}
	var html=new Array();
	for(var i=0;i<len-num;i++)
	{
		html.push("<span></span>");
	}
	for(var i=0;i<num;i++){
		html.push("<span "+(isOk?"style=color:red;":'')+">"+data[i]+"</span>");
	}
	
	
	return html.join("");
}

//四舍五入的方法
function m_Round(v, e) {
	if(v == 0) {
		return v;
	}
	var t = Math.pow(10, e);// 保留小数点右边多少位；
	var a = Math.round(Math.abs(v) * t) / t;
	return v > 0 ? a : 0-a;
}