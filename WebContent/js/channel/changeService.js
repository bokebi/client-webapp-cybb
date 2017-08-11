$(function(page){
	
	/*切换*/
	$(".equityProcess dd span").mouseover(function(){
		$('.equityProcess dd span').removeClass();
		$(this).addClass('processSpan');
		var indx = $(this).parent().index();
		$('#con_one_1 .pr').hide();
		$($('#con_one_1 .pr')[indx]).show();
	});
	
	/*注册公司*/
	$(".marginLeft").mouseover(function(){
		var mls = $('.marginLeft');
		var indx = mls.index(this);
		var simple =$('.simple li');
		simple.hide();
		$(simple[indx]).show();
		//切换字体颜色
		var DataInfo =$(".DataInfo");
		DataInfo.removeClass("DataInfoHover");
		$(this).find('.DataInfo').addClass("DataInfoHover");
		//切换圆圈颜色
		var serialNumber = $('.serialNumber');
		serialNumber.removeClass('serialNumberHover');
		$(this).find('.serialNumber').addClass('serialNumberHover');
	});
	
	/*公司性质*/
	$(".taxesType dd").click(function(){
		$(this).parent().find("dd").removeClass("texesTypeHover");
		$(this).addClass("texesTypeHover");
		var id = $(this).find('label').attr('for');
		$(this).parents('li').find('input').prop('checked',false);
		$('#'+id).prop('checked','checked');
	});
	
	$('.icon-close').click(function(){
		$(this).parents('.serviceArea').removeClass('waring');
	});
	
	// 加入购物车
	$("a.addCart").click(function(event) {
		checkCustomer(function(){
			addOrdCart(null,event)
		});
	});
	//加入购物车
	var addOrdCart = function(callback,event) {
		var form = $("#buyNowForm");
		$.ajax({
			type : "post",
			url : form.attr("action"),
			data:form.serialize(),
			dataType: "json",
			success : function(data) {
				var count=$(".jion_number").html();
				if(!count){
					count=1;
				}else{
					count=parseInt(count)+1;
				}
				$(".jion_number").html(count);
			}
		});
		//设置落脚点
		var offset = '';
		$.each($(".jion"),function(index,item){
			if($(item).parents('.fixed').hasClass('rightboxMin')){
				offset = $($(".jion")[$(".jion").length-1]).offset();
				return false;
			}else{
				offset = $($(".jion")[0]).offset();
			}
		});
		//获取当前点击的js对象
		var _this=$(event.target);
		var src= _this.parents('.serviceLeft').prev().find("img").attr("src");
		var flyer=$("<img src='"+src+"' class='fly'/>");
		flyer.fly({
			start:{
				left:event.clientX, //获取点击购物车按钮的x，y 坐标
				top:event.clientY
			},
			end:{
				left:offset.left,
				top:offset.top-$(window).scrollTop(),
				width:20,
				height:20
			},
			onEnd:function(){
				flyer.fadeOut("slow",function(){
					$(this).remove();
				});
			}
		});
	}
	
	$(".serviceArea").on("click",".service_lable",function(){   //切换商品
		var parm=$("#frmService").dumJson();
		var productNatureId=$("#natureDl").find(".texesTypeHover .service_lable").attr("id");
		var productPeriod=$("#periodDl").find(".texesTypeHover .service_lable").attr("id");
		var productAttributes=$(".attributeDl").find(".texesTypeHover .service_lable");
		var productAttribute = "";
		for(i=0;i<productAttributes.length;i++){
			productAttribute += productAttributes[i].id + ",";
		}
		$("#periodDl").children().show();
		
		if(productNatureId){
			parm.nature=productNatureId;
		}else{
			parm.nature="";
		}
		
		if(productPeriod){
			parm.periodNumber= productPeriod;
		}else{
			parm.periodNumber="";
		}
		if(productAttribute){
			parm.attributeValueIds= productAttribute 
		}
		$.ajax({
			type : "post",
			url :dum.appName+'/productModel/queryProductSku.html',
			data: parm,
			dataType: "json",
			success : function(data) 
			{
				if(data){
					if(data.values){
						$("#modelName").html(data.values.name);
						$("#skuId").val(data.values.id);
						$("#ordPrice").html(data.values.price);
						$("#dljzCount").html(data.values.salesNumber);
						$("input[name='orderPrice']").val(data.values.price);
					}
				}
			}
		});
	})
});
var buyNowFun=function(){
	checkCustomer(function(){
		var form = $("#buyNowForm");
		form.attr("action",dum.appName + "/ordCart/buyNow.html");
		form.submit();
	});
}

var checkSelectedH4 = function(obj, is) {
	var id = $(obj).parent().attr('for');
	if($(obj).hasClass('selected1H4')){
		$(obj).find('span').find('img').attr('src',dum.appName + '/v1/images/img/box1.png');
		$(obj).removeClass('selected1H4');
		$('#'+id).prop('checked','');
	}else{
		$(obj).find('span').find('img').attr('src',dum.appName + '/v1/images/img/box2.png');	
		$(obj).addClass('selected1H4');
		$('#'+id).prop('checked','checked');
	}
	// 公司地址
	if($(obj).attr("type") == "gsdzbg") {
		if($(obj).hasClass("selected1H4")) 
		{ 
			var index = $(".selectedH4[type='gsdzbg']").index(obj);
			if(index == 0) {
				$("#companyType").val(1);
				$(".selectedH4[type='gsdzbg']").eq(1).removeClass("selected1H4");
				$(".selectedH4[type='gsdzbg']").eq(1).find('span').find('img').attr('src',dum.appName +'/v1/images/img/box1.png');	
			} else {
				$("#companyType").val(0);
				$(".selectedH4[type='gsdzbg']").eq(0).removeClass("selected1H4");
				$(".selectedH4[type='gsdzbg']").eq(0).find('span').find('img').attr('src',dum.appName +'/v1/images/img/box1.png');	
			}
			
			$("#gsdzbg").prop("checked", 'checked');
		} else {
			$("#gsdzbg").prop("checked", '');
			$("#companyType").removeAttr("value");
		}
	}
}
