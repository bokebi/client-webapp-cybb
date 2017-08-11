$(function(){
	hideDengjia();
	balance();
	//合并结算
	$(".clearing").click(function() {
		checkCustomer(submitCart);
	});
	
	/*分享*/
	$(".share").mouseover(function(){
		$(".share").css({color:"#FF8468"})
		$(".shareDiv").show();
	});
	$(".shareDiv").mouseleave(function(){
		$(".share").css({color:"#000"})
		$(".shareDiv").hide();
	});
	//加号
	$('.add.btnCommon').click(function(){
		var num = parseInt($(this).prev().val());
		num < 1 ? num = 1 : num < 99 ? num += 1 : num = 99;	
		$(this).prev().val(num);
		var price = calculate(this);
		$(this).parents('td').next().find('b').text(price);
		balance();
		

		var name=$(this).next().attr("name");
		var index = name.substring(name.indexOf("[")+1,name.indexOf("]"));
		var id = $("input[name='cartItemList["+index+"].modelId']").val();
		dum.common.ajax({
			type : "post",
			url : "/ordCart/addCart.html",
			data : {id:id},
			dataType : "json",
			success : function(data) {
				getJoinNumber();
			}
		});
		return false;
	});
	//减号
	$('.less.btnCommon').click(function(){
		var num = parseInt($(this).next().val());
		num <= 1 ? num = 1 : num -= 1;	
		$(this).next().val(num);
		var price = calculate(this);
		$(this).parents('td').next().find('b').text(price);
		balance();
		
		var name=$(this).next().attr("name");
		var index = name.substring(name.indexOf("[")+1,name.indexOf("]"));
		var id = $("input[name='cartItemList["+index+"].modelId']").val();
		dum.common.ajax({
			type : "post",
			url : "/ordCart/delCart.html",
			data : {id:id},
			dataType : "json",
			success : function() {
				getJoinNumber();
			}
		});
		return false;
	});
	
	//购物车输入数量(输入值)
	$("body").on("propertychange input", ".shoppingText", function () {
		var name=$(this).attr("name");
		var index = name.substring(name.indexOf("[")+1,name.indexOf("]"));
		var id = $("input[name='cartItemList["+index+"].modelId']").val();
		if(($(this).val()%1)!=0){
			alert('请输入整数！');
			return false;
		}
		dum.common.ajax({
			type : "post",
			url : "/ordCart/updateCart.html",
			data : {id:id,num:$(this).val()},
			dataType : "json",
			success : function(data) {
				getJoinNumber();
			}
		});
	});
	
	//过滤输入的非数字字符
	$('.shoppingText').keydown(function(){
		var keyCode = event.keyCode,flag = false;
		keyCode <= 57 ? flag = true : 
			keyCode < 96 ? flag : 
				keyCode > 105 ? flag : flag = true;
		
		if(!flag){
			return false;
		}
	});
	$('.shoppingText').keyup(function(){
		var price = calculate(this);
		$(this).parents('td').next().find('b').text(price);
		balance();
	});
	$('.shoppingText').blur(function(){
		if(!(parseInt($(this).val()))){
			$(this).val(1);
			balance();
		}
	});
	//全选和反选
	$('.allCheck').click(function(e){
		console.log($(this))
//		console.log($(this).prop('checked'));
		var label_obj = $(this);
		if(label_obj.hasClass('icon_uncheck')){
			label_obj.addClass('icon_check').removeClass('icon_uncheck');
			$('.cartTab').find('.first label').addClass('icon_check').removeClass('icon_uncheck');
			$('.cartTab').find('.first input').prop('checked',true);
		}else{
			label_obj.addClass('icon_uncheck').removeClass('icon_check');
			$('.cartTab').find('.first label').addClass('icon_uncheck').removeClass('icon_check');
			$('.cartTab').find('.first input').prop('checked',false);
		}		
		/*if($(this).prop('checked')){
		}else{
		}*/
		balance();
	});
	
	//单个checkbox
	$('.cartTab>tbody>tr').on("click", function(event){
		var tg = event.target;
		if($(tg).hasClass('shoppingText'))
			return false;
		var label_obj = $(this).find('label[for^="js_allCheck_"]'),checkbox_obj = $('tbody input[type="checkbox"]'),check = [];
		
		if(label_obj.hasClass('icon_check')){
			label_obj.removeClass('icon_check').addClass('icon_uncheck');
			$(this).find('input[type="checkbox"]').prop("checked", false);
		}else{
			label_obj.addClass('icon_check').removeClass('icon_uncheck');
			$(this).find('input[type="checkbox"]').prop("checked", true);
		}
		$.each(checkbox_obj,function(i,ele){
			if($(ele).prop('checked')){
				check.push(ele);
			};
		});
		$(this).find('input[type="checkbox"]').is(':checked')&&check.length == checkbox_obj.length ? $('tfoot .first,thead .first').find('label').addClass('icon_check').removeClass('icon_uncheck') : $('tfoot .first,thead .first').find('label').addClass('icon_uncheck').removeClass('icon_check');
		balance();
	});
	$('#delete').click(function(){
		if(verifiy()){
			if(confirm("是否要删除购物车?"))
			{
				dum.common.ajax({
					type : "post",
					async: false,
					url : "/ordCart/delCartItem.api",
					data : $('#cartForm').serialize(), 
					dataType : "json",
					success : function(data) {
						window.location.reload() ;
					}
				});
			}
		}else{
			$("#errorInfo").html("请至少选择一项。");
			return false;
		}
	});
});

function delItem(itemCode ){
	if(confirm('您确定要删除吗？'))
	{
		dum.common.ajax({
			type : "post",
			async: false,
			url : "/ordCart/delCartItem.api",
			data : {"ordCartItems[0].itemCode":itemCode}, 
			dataType : "json",
			success : function(data) {
				window.location.reload() ;
			}
		});
	}
	
}
function submitCart(){
	if(verifiy()){
		$("#cartForm").submit();
	}else{
		$("#errorInfo").html("请至少选择一项。");
		return false;
	}
}

//计算价格
var calculate = function(ele){
	var price = $(ele).closest('tr').find('input.sparices').val(),num = $(ele).closest('tr').find('input[type="text"]').val(),servicePrice = 0;
	num = parseInt(num);
	price = parseFloat(price);
	servicePrice = $.fn.accMul(num,price);
	return servicePrice.toFixed(2);
};
var hideDengjia=function(){
	$(".itemOrderPrice").each(function(){
		var itemOrderPrice=$(this).html();
		var otd=$(this).parents(".td");
		var itemOriginalPrice=otd.find(".itemOriginalPrice").html();
		if(parseFloat(itemOriginalPrice)==parseFloat(itemOrderPrice)){
			otd.find(".itemOriginalPrice").parents("span").hide();
		}
	})
}
//计算总价
var balance = function(){
	var check_obj = $('.cartTab tbody input[type="checkbox"]'),aprice = 0,num = 0,bprice = 0;
	$.each(check_obj,function(i,ele){
		var ps = parseFloat($(ele).closest('tr').find('.js_calculate').text());
		var ops = parseFloat($(ele).closest('tr').find('.js_oparice').val());
		var ns =  parseFloat($(ele).closest('tr').find('.sparices').val());
		var cs = ops - ns;
		$(ele).closest('tr').find('b.js_calculate').text(calculate(ele));
		if($(ele).prop('checked')){
			var nums = parseInt($(ele).parents('tr').find('.shoppingText').val());
			var nps = $.fn.accMul(cs,nums);
			aprice = $.fn.accAdd(aprice,ps).toFixed(2);
			bprice = $.fn.accAdd(bprice,nps).toFixed(2);
			num = $.fn.accAdd(num,nums);
		}
	});
	$('#js_num').text(num);
	$('#js_aprice').text(aprice);
	$('#js_bprice').text(bprice);
};

//获取购物车数量
function getJoinNumber(){
	dum.common.ajax({
		type:"get",
		url:"/ordCart/getCareNumber.html",
		dataType:"json",
		success:function(da){
			$(".jion_number").html(da);
		}
	})
}

var verifiy = function(){
	var check_obj = $('.cartTab tbody input[type="checkbox"]:checked'),flag = false;
	check_obj.length > 0 ? flag = true : flag = false;
	return flag;
}