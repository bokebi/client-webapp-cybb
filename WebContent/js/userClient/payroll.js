var rowName = new Array();
$(function(){
	rowName.push("seq");
	rowName.push("taxName");
	rowName.push("cardType");
	rowName.push("cardNo");
	rowName.push("yearMonth");
	rowName.push("income");
	rowName.push("fund");
	rowName.push("deductionsCombined");
	rowName.push("taxableIncomeAmount");
	
	var isImportExcel = $("#isImportExcel").val();
	if(isImportExcel == '0'){
		$('.reportsUl li').removeClass('reportsHover');
		$('.reportsUl li:eq(3)').addClass('reportsHover');
		$('.infoList>div').hide();
		$($('.infoDivCommon')[3]).show();
	}
	
	initPeriodList();
	$("#addPayRoll").click(function(){
		addPayRoll();
	})
	
	$("#savePayroll").click(function(){
		saveData();
	})
	
	$("#queryPayrollBtn").click(function(){
		queryPayroll(1);
	})
	
	$(document).on("dblclick","#payrollTable tr td",function(){
		if($(this).parent().find("input[type='text']").length == 0){
			dblclickTd($(this));
		}
	});
	
	$(document).on("blur","#payrollTable tr td input[opType='edit']",function(){
		updateDetail($(this));
	});
})

function updateDetail(obj){
	var editVal = $(obj).val();
	var editName = $(obj).attr("name");
	var thisTr = $(obj).parent().parent();
	var id=$(thisTr).find("input[name='detailId']").val();
	if(id && editVal){
		$.ajax({
		    url: dum.appName+'/payroll/updateDetail.html',
		    dataType: "json",
		    type: "POST",
		    data:"id="+id+"&"+editName+"="+editVal,
		    success: function (data) {
		    	var payrollCurrentPage = parseInt($("#payrollCurrentPage").val());
			    queryPayroll(payrollCurrentPage);
		    }
		});
	}
}

function dblclickTd(obj){
	var tdIndex = $(obj).index();
	var trIndex = $(obj).parent().index();
	if(tdIndex != 0 && tdIndex != 4){
		var tdVal = $(obj).text();
		var nameAttr = rowName[tdIndex];
		var tdInput = '<input class="upText" type="text" opType="edit" name="'+nameAttr+'" id="'+nameAttr+'" value="'+tdVal+'" />';
		$(obj).html(tdInput);
		$("#payrollTable tr td input[opType='edit']").focus();
	}
}

function initPageing(){
	var payrollPageCount = parseInt($("#payrollPageCount").val());
	$("#payrollPage").createPage({
		pageCount:payrollPageCount,
		current:1,
		backFn:function(p){
			$("#payrollCurrentPage").val(p);
			addClass(p);
			queryPayroll(p);
		}
	});
}

function addClass(currentPage){
	var pageLinks = $("#payrollPage span");
	$.each(pageLinks,function(index,value){
		if(parseInt($(value).text()) == currentPage){
			$(this).addClass("hoverPage")
		}
	});
}

function initPeriodList(){
	$.ajax({
	    url: dum.appName+'/payroll/listByAccntBook.do',
	    dataType: "json",
	    type: "POST",
	    success: function (data) {
	    	   if(data){
	    		   var periodList = data.periodList;
	    		   var currentPeriod = data.currentPeriod;
	    		   $(".payrollSel").empty();
				   var options = '';
				   $.each(periodList,function(index,value){
					   if(value.id == currentPeriod.id){
						   options += '<option selected="selected" value="'+value.id+'">'+value.periodYear+'-'+value.periodNumber+'</option>';
					   }else{
						   options += '<option value="'+value.id+'">'+value.periodYear+'-'+value.periodNumber+'</option>';
					   }
				   })
				   $(".payrollSel").append(options);
				   queryPayroll(1);
	    	   }
	    }
	});
}

function addPayRoll(){
	var yearMonth = $(".payrollSel").find("option:selected").text();
	if(yearMonth){
		$("#payrollTable").html("");
		for (var i = 0; i < 5; i++) {
			var dataRow = '<tr>'
			+ '<td style="width: 5%">'+(i+1)+'</td>'
			+ '<td style="width: 15%"><input class="upText" type="text" name="details['+i+'].taxName" id="taxName" value="" /></td>'
			+ '<td style="width: 10%"><input class="upText" type="text" name="details['+i+'].cardType" id="cardType" value="身份证" /></td>'
			+ '<td style="width: 20%"><input class="upText" type="text" name="details['+i+'].cardNo" id="cardNo" value="" /></td>'
			+ '<td style="width: 10%"><label>'+yearMonth+'</label></td>'
			+ '<td style="width: 10%"><input class="upText" type="text" name="details['+i+'].income" id="income" value="" /></td>'
			+ '<td style="width: 10%"><input class="upText" type="text" name="details['+i+'].fund" id="fund" value="" /></td>'
			+ '<td style="width: 10%"><input class="upText" type="text" name="details['+i+'].deductionsCombined" id="deductionsCombined" value="" /></td>'
			+ '<td style="width: 10%"><input class="upText" type="text" name="details['+i+'].taxableIncomeAmount" id="taxableIncomeAmount" value="" /></td>'
			+ '</tr>';
			$("#payrollTable").append(dataRow);
		}
		
		$("#incomeSum").text('');
		$("#fundSum").text('');
		$("#deductionsCombinedSum").text('');
		$("#taxableIncomeAmountSum").text('');
		$("#savePayroll").parent().show();
	}
}

var isInitPage = false;
function queryPayroll(currentPage){
	var yearMonth = $(".payrollSel").find("option:selected").text();
	if(yearMonth){
		$.ajax({
		    url: dum.appName+'/payroll/queryList.html',
		    data: {"yearToMonth":yearMonth,"currentPage":currentPage},
		    dataType: "json",
		    type: "POST",
		    success: function (data) {
		        if(data){
		        	var payrollTable = $("#payrollTable");
	        		payrollTable.html('');
		        	var list = data.detailList;
		        	var totalPage = data.totalPage;
		        	$("#payrollPageCount").val(totalPage);
		        	if($("#payrollPageCount").val() && !isInitPage){
		        		isInitPage = true;
		        		initPageing();
		        		addClass(1);
		        	}
		        	if(list && list.length > 0){
		        		$.each(list,function(index,item){
		        				var rowPayroll = '';
			        			rowPayroll += '<tr>';
				        		rowPayroll +='<td style="width: 5%"><input type="hidden" name="detailId" id="detailId" value="'+item.id+'" />'+(index+1)+'</td>';
				        		if(item.taxName){
				        			rowPayroll += '<td style="width: 15%">'+item.taxName+'</td>';
				        		}else{
				        			rowPayroll += '<td style="width: 15%"></td>';
				        		}
				        		if(item.cardType){
				        			rowPayroll += '<td style="width: 10%">'+item.cardType+'</td>';
				        		}else{
				        			rowPayroll += '<td style="width: 10%"></td>';
				        		}
				        		
				        		if(item.cardNo){
				        			rowPayroll += '<td style="width: 20%">'+item.cardNo+'</td>';
				        		}else{
				        			rowPayroll += '<td style="width: 20%"></td>';
				        		}
				        		rowPayroll += '<td style="width: 10%">'+yearMonth+'</td>';
				        		if(item.income){
				        			rowPayroll += '<td style="width: 10%">'+formatCurrency(item.income)+'</td>';
				        		}else{
				        			rowPayroll += '<td style="width: 10%"></td>';
				        		}
				        		
				        		if(item.fund){
				        			rowPayroll += '<td style="width: 10%">'+formatCurrency(item.fund)+'</td>';
				        		}else{
				        			rowPayroll += '<td style="width: 10%"></td>';
				        		}
				        		
				        		if(item.deductionsCombined){
				        			rowPayroll += '<td style="width: 10%">'+formatCurrency(item.deductionsCombined)+'</td>';
				        		}else{
				        			rowPayroll += '<td style="width: 10%"></td>';
				        		}
				        		if(item.taxableIncomeAmount){
				        			rowPayroll += '<td style="width: 10%">'+formatCurrency(item.taxableIncomeAmount)+'</td>';
				        		}else{
				        			rowPayroll += '<td style="width: 10%"></td>';
				        		}
				        		rowPayroll += '/<tr>';
		        				payrollTable.append(rowPayroll);
		        		})
		        		
		        		$("#incomeSum").text(formatCurrency(data.incomeSum));
		        		$("#fundSum").text(formatCurrency(data.fundSum));
		        		$("#deductionsCombinedSum").text(formatCurrency(data.deductionsCombinedSum));
		        		$("#taxableIncomeAmountSum").text(formatCurrency(data.taxableIncomeAmountSum));
		        	}else{
		        		$("#incomeSum").text("");
		        		$("#fundSum").text("");
		        		$("#deductionsCombinedSum").text("");
		        		$("#taxableIncomeAmountSum").text("");
		        	}
		        }else{
		        	$("#payrollPageCount").val("1");
		        	initPageing();
		        }
		        $("#savePayroll").parent().hide();
		    }
		});
	}
}

function isValidate(){
	var tableTr = $("#payrollTable tr");
	for (var i = 0; i < tableTr.length; i++) {
		var taxName = $.trim($(tableTr[i]).find("input[id='taxName']").val());
		var cardType = $.trim($(tableTr[i]).find("input[id='cardType']").val());
		var cardNo = $.trim($(tableTr[i]).find("input[id='cardNo']").val());
		var income = $.trim($(tableTr[i]).find("input[id='income']").val());
		if(taxName == '' && cardNo == '' && income == ''){
			continue;
		}
		if(taxName == ''){
			return false;
		}
		if(cardType == ''){
			return false;
		}
		if(cardNo == '' || !isIdCardNo(cardNo)){
			return false;
		}
		if(income == ''){
			return false;
		}
		
	}
	return true;
}

function saveData() {
	var yearMonth = $(".payrollSel").find("option:selected").text();
	var form = $("#payrollForm");
	if(yearMonth && isValidate()){
		$("#yearMonth").val(yearMonth);
		$.ajax({
		    url: dum.appName+'/payroll/savePayroll.html',
		    data: form.serialize(),
		    dataType: "json",
		    type: "POST",
		    success: function (data) {
		    	if(data.status == '0'){
		    		isInitPage = false;
		    		queryPayroll(1);
		    	}
		    }
		});
	}
}

function payrollExport(form){
	var yearMonth = $(".payrollSel").find("option:selected").text();
    $("#exportYearMonth").val(yearMonth);
	var url = dum.appName + "/payroll/exportExcel.do";
	$(form).attr("action", url);
	$(form).submit();
}

//增加身份证验证
function isIdCardNo(num) {
    var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
    var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
    var varArray = new Array();
    var intValue;
    var lngProduct = 0;
    var intCheckDigit;
    var intStrLen = num.length;
    var idNumber = num;
    // initialize
    if ((intStrLen != 15) && (intStrLen != 18)) {
        return false;
    }
    // check and set value
    for (i = 0; i < intStrLen; i++) {
        varArray[i] = idNumber.charAt(i);
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
            return false;
        } else if (i < 17) {
            varArray[i] = varArray[i] * factorArr[i];
        }
    }
    if (intStrLen == 18) {
        //check date
        var date8 = idNumber.substring(6, 14);
        if (isDate8(date8) == false) {
            return false;
        }
        // calculate the sum of the products
        for (i = 0; i < 17; i++) {
            lngProduct = lngProduct + varArray[i];
        }
        // calculate the check digit
        intCheckDigit = parityBit[lngProduct % 11];
        // check last digit
        if (varArray[17] != intCheckDigit) {
            return false;
        }
    }
    else {        //length is 15
        //check date
        var date6 = idNumber.substring(6, 12);
        if (isDate6(date6) == false) {
            return false;
        }
    }
    return true;
}
function isDate6(sDate) {
    if (!/^[0-9]{6}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    if (year < 1700 || year > 2500) return false
    if (month < 1 || month > 12) return false
    return true
}

function isDate8(sDate) {
    if (!/^[0-9]{8}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    day = sDate.substring(6, 8);
    var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (year < 1700 || year > 2500) return false
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
    if (month < 1 || month > 12) return false
    if (day < 1 || day > iaMonthDays[month - 1]) return false
    return true
}