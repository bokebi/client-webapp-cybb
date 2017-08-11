$.validator.addMethod("selectArea", function(value, element) {
	var areaId = $("#areaCode").val();
    return  "请选择区域" != value 
    	&& null != areaId
    	&& undefined != areaId
    	&& "" != areaId;
}, "请选择区域!");

$(function() {
	$("#addressdiv").hide();
	showaddress();//加载地址
	$("#saveConfirm").click(function() {
		paymentSubmit();
	});
	
});

function paymentSubmit(){
	var voucherIds = "";
	var cusIds = "";
	$(".vouchers2").each(function() {
		voucherIds += $(this).attr("vid") + ",";
	});

	$(".vouchers2").each(function() {
		cusIds += $(this).attr("cid") + ",";
	});
	$("#cusIds").val(cusIds);
	$("#voucherIds").val(voucherIds);
	
	$("#saveConfirm").unbind("click");
	$('#confirm').attr("action", dum.appName+ "/payment/choPayOpt.html").submit();
}

function saveaddress(){
	if(!$("#addressform").valid()) {
		return ;
	}
	
	var flag=$("#flag").val();
	var url;
	if(flag=="0"){
		url="../cusAddressRecord/save.do";
	}else{
		url="../cusAddressRecord/editCusAddressRecord.do";
	}
	$.ajax({
		url  :url,
		dataType:'json',
		data:$('#addressform').serialize(),
        success: function(result) {
        	showaddress();
        	clearFrom();
        	$("#flag").val("0");
        	$("#id").val("");
        	$("#addressdiv").hide();
        }
    });
	
	$('#print_ticket').click(function(){
		if($(this).hasClass('icon_uncheck')){
			$(this).addClass('icon_check').removeClass('icon_uncheck');
			$('.openInvoice').css({'visibility':'visible'});
		}else{
			$(this).removeClass('icon_check').addClass('icon_uncheck');
			$('.openInvoice').css({'visibility':'hidden'});
		};
	});
}
function upisdef(vid){
	
	/*$.ajax({
		url  :"../cusAddressRecord/updateisDefault.do?id="+vid,
		dataType:'json',
        success: function(result) {
        	$.ajax({
        		url  :"../cusAddressRecord/list.do",
        		dataType:'json',
        		data:"flag=Y",
                success: function(result) {
                	var dat=result.list;
                	$("#address_lsit").text("");
                	var texts="";
                	$(dat).each(function(index,value){
                		texts+="<li class='address_lsit1' id='addview'>";
                		texts+="<dl class='fl address_detail'>";
                		var isdefault=dat[index].isDefault;
                		if(isdefault=="Y"){
                			texts+="<dd class='address_name'>联系人："+dat[index].contactPerson+"</dd>";
                		}else{
                			texts+="<dd class='paymentLxr' onclick='upisdef("+dat[index].id+")'>联系人："+dat[index].contactPerson+"</dd>";
                		}
                		texts+="<dd class='colorBase'>联系方式："+dat[index].contactMobile+"</dd>";
                		texts+="<dd class='colorBase'>详细地址："+dat[index].areaCode+dat[index].addressDetails+"</dd>";
                		texts+="</dl>";
                		
                		texts+="<dl class='fr address_update'>";
                		texts+="<dd><a href='#' onclick='upisdef("+dat[index].id+")'>设为默认地址</a></dd>";
                		texts+="<dd><a href='#' onclick='edit("+dat[index].id+")'>编辑</a></dd>";
                		texts+="<dd><a href='#' onclick='delet("+dat[index].id+")'>删除</a></dd>";
                		texts+="</dl><br>";
                		texts+="</li>";
                	});
                	$("#address_lsit").html(texts);
                }
            });
        }
    });*/
}
function addAddress(){
	$("#addressdiv").show();
}
function clearFrom(){
	$("#addressdiv").hide();
	$("#addressDetails").val("");
	$("#contactMobile").val("");
	$("#contactPerson").val("");
}
function edit(id){
	$("#addressdiv").show();
	$.ajax({
		url  :"../cusAddressRecord/editByid.do?id="+id,
		dataType:'json',
        success: function(result) {
        	var data=result.car;
        	$("#addressDetails").val(data.addressDetails);
        	$("#contactMobile").val(data.contactMobile);
        	$("#contactPerson").val(data.contactPerson);
        	$("#flag").val("1");
        	$("#id").val(id);
        	$("#areaId").setArea({areaCode:data.areaCode});
        }
    });
}
function delet(id){
	$.ajax({
		url  :"../cusAddressRecord/detel.do?id="+id,
		dataType:'json',
        success: function(result) {
        	showaddress();
        }
    });
}
function showaddress(){
	$.ajax({
		url  :"../cusAddressRecord/list.do",
		dataType:'json',
        success: function(result) {
        	var dat=result.list;
        	$("#address_lsit").text("");
        	var texts="";
        	$(dat).each(function(index,value){
        		texts+="<li class='address_lsit1' id='addview'>";
        		texts+="<dl class='fl address_detail'>";
        		var isdefault=dat[index].isDefault;
        		if(isdefault=="Y"){
        			texts+="<dd class='address_name'>联系人："+dat[index].contactPerson+"</dd>";
        		}else{
        			texts+="<dd class='paymentLxr' onclick='upisdef("+dat[index].id+")'>联系人："+dat[index].contactPerson+"</dd>";
        		}
        		texts+="<dd class='colorBase'>联系方式："+dat[index].contactMobile+"</dd>";
        		texts+="<dd class='colorBase'>详细地址："+dat[index].areaCode+dat[index].addressDetails+"</dd>";
        		texts+="</dl>";
        		
        		texts+="<dl class='fr address_update'>";
        		texts+="<dd><a href='#' onclick='upisdef("+dat[index].id+")'>设为默认地址</a></dd>";
        		texts+="<dd><a href='#' onclick='edit("+dat[index].id+")'>编辑</a></dd>";
        		texts+="<dd><a href='#' onclick='delet("+dat[index].id+")'>删除</a></dd>";
        		texts+="</dl><br>";
        		texts+="</li>";
        	});
        	$("#address_lsit").html(texts);
        	$(".address_lsit1").each(function(index,value){
        	    $(".address_lsit1").eq(index+1).hide();
        	});
        	$(".payFoot").click(function(){
        		$(".payTop").show();
        		$(".address_lsit1").show();
        		$(".payFoot").hide();
        	})
        	$(".payTop").click(function(){
        		$(".address_lsit1").each(function(index,value){
        			index=index+1;
            	    $(".address_lsit1").eq(index).hide();
            	});
        		$(".payFoot").show();
        		$(".payTop").hide();
        	})
        	
        }
    });
}

//选择优惠券
function selectVoucher(obj, voucherId, cusavId, voucherMoney, voucherType) {
	var sumPrice = Number(parseFloat($("#sumPricep span").text()).toFixed(2));
	var vmoney = Number(voucherMoney);
	var clickTd = $(obj).find("p");
	var originalPrice = Number($("#originalPrice").val());
	
	if(voucherType == '1'){
		if (clickTd.attr("class") == 'vouchers1') {
			var otherVoudiv = $("p[voucher]");
			var tempMoney = 0;
			$(otherVoudiv).each(function(index,value){
				var tempDiv =$(value);
				var tclass = tempDiv.attr("class");
				if(tclass == 'vouchers2'){
					var tamount = tempDiv.attr("voucherMoney");
					tempMoney = Number(tempMoney) + Number(tamount);
					tempDiv.removeClass('vouchers2');
					tempDiv.addClass('vouchers1');
					tempDiv.removeAttr('vid');					
					tempDiv.removeAttr('cid');
					tempDiv.removeAttr('voucherMoney');
				}
			})
			if(sumPrice > 0){
				sumPrice = sumPrice + Number(tempMoney);
			}else {
				sumPrice = originalPrice;
			}
			clickTd.removeClass('vouchers1');
			clickTd.addClass('vouchers2');
			clickTd.attr('vid', voucherId);
			clickTd.attr('cid', cusavId);
			clickTd.attr('voucherMoney', voucherMoney);
			if (sumPrice <= vmoney) {
				$("#sumPricep span").text("0.00");
			} else {
				$("#sumPricep span").text((sumPrice - vmoney).toFixed(2));
			}
			$("#voucherPrice span").text(Number(voucherMoney).toFixed(2));
			
		} else if (clickTd.attr("class") == 'vouchers2') {
			clickTd.removeClass('vouchers2');
			clickTd.addClass('vouchers1');
			clickTd.removeAttr('vid');
			clickTd.removeAttr('cid');
			clickTd.removeAttr('voucherMoney');
			if(sumPrice > 0){
				$("#sumPricep span").text((sumPrice + vmoney).toFixed(2));
			}else {
				$("#sumPricep span").text(originalPrice.toFixed(2));
			}
			$("#voucherPrice span").text("0.00");
		}
	}else if(voucherType == '4'){
		if(clickTd.attr("class") == 'vouchers1'){
			var exchangeDivs = $("p[exchange]");
			$(exchangeDivs).each(function(index,value){
				var tempDiv = $(value);
				if(tempDiv.attr("class") == 'vouchers2'){
					tempDiv.removeClass('vouchers2');
					tempDiv.addClass('vouchers1');
					tempDiv.removeAttr('vid');
					tempDiv.removeAttr('cid');
				}
			})
			clickTd.removeClass('vouchers1');
			clickTd.addClass('vouchers2');
			clickTd.attr('vid', voucherId);
			clickTd.attr('cid', cusavId);
		}else if(clickTd.attr("class") == 'vouchers2'){
			clickTd.removeClass('vouchers2');
			clickTd.addClass('vouchers1');
			clickTd.removeAttr('vid');
			clickTd.removeAttr('cid');
		}
	}
}
//点击当前地址，将其放在第一位
$('body').on('click','.paymentLxr',function(){
	var _ul = $(this).parents('#address_lsit'),_li = $(this).parents('li');
	var _lis = _ul.find('li');
	var li = _lis[0];
	_lis[0] = _li;
	_lis[_li.index()] = li;
//	_ul.append(_lis);
	_ul.find('.address_name').addClass('paymentLxr');
	$('.paymentLxr').removeClass('address_name');
	$(this).addClass('address_name').removeClass('paymentLxr');
});