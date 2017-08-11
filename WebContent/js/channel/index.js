
$(function(){
	index.init();
	$(".tab_nav dd").eq(0).mouseenter();
	//index.countCustomer();
	//index.queryCount();
});
var index = {
	init : function(){
		
		$('.leftbox .minsize').click(function(){
			$(this).parents('.leftbox').animate({'left':'-185px'},'fast');
			$('.min-leftbox').show();
			$('.leftbox').addClass('js_minsize');
		});
		$('.min-leftbox .icon-left').click(function(){
			$('.leftbox').animate({'left':'15px'},'fast');
			$('.min-leftbox').hide();
			$('.leftbox').removeClass('js_minsize');
		});
		//关闭弹出的填写信息框
		$('.close').click(function(){
			var prop = $(this).parents('.prop');
			prop.hide();
			prop.prev().hide();
		});
		//打开弹窗
		$('#searchName').click(function(){
			$('.mark').show();
			$('.prop').show();
			$("#companyName").val($("#queryName").val());
		});
		this.changeTabNav();
		
		//米问答
		$("#majorQuestion").keyup(function(){
			var inputVal = $.trim($(this).val());
			if(inputVal){
				$(this).next().text(inputVal.length+"/40");
			}else{
				$(this).next().text("0/40");
			}
		});
		
		//提交米问答问题
		$("#submitQuestion").click(function(){
			var question = $("#majorQuestion").val();
			if(question){
				dum.common.ajax({
					   type: "post",
					   url: "/ask/saveQuestion.html",
					   data:  $('#questionForm').serialize(),
					   dataType : "json",
					   success: function(data)
					   {
						   //0：成功，1：失败，2：需要登录
						   if(data.status == "0"){
							   
						   }else if(data.status == "1"){
							   
						   }else if(data.status == "2"){
							   window.location.href = dum.appName + "/cus/loginUI.html";
						   }
					   }
					});
			}else{
				$("#majorQuestion").focus();
			}
		});
		
		//提交查询公司
		$(".queryCompanyBtn").click(function(){
			var that = this;
			if(dum.verifiy('queryCompanyNameForm')){}else{
				return false;
			}
			dum.common.ajax({
				type : "post",
				url : "/customer/checkname.api",
				data : $('#queryCompanyNameForm').serialize()+"&sourceId=1",
				dataType : "json",
				success : function(data) {
					if(data.executeStatus == '0'){
						$(".propBox").hide();
						$('#queryCompanyNameForm')[0].reset();
						window.location.reload();
					}
				}
			});
			
	});
		//给电话号码过滤非数字输入
		$('input[name="customerMobile"]').keydown(function(){
			var keyCode = event.keyCode,flag = false;
			keyCode <= 57 ? flag = true : 
				keyCode < 96 ? flag : 
					keyCode > 105 ? flag : flag = true;
			
			if(!flag){
				return false;
			}
		});
		
	},
	// 绑定事件：切换介绍和内容
	changeTabNav:function(){
		var that = this;
		/*$('.tab_nav').on('mouseenter','li',function(){
			that.switchContent($(this));
		});*/
		$('.tab_nav').on('mouseenter','dd',function(){
			that.switchContent($(this));
		});
	},
	//切换逻辑
	switchContent : function(obj){
		var indx = obj.index(),contents = obj.siblings();
		contents.removeClass('focus');
		obj.addClass('focus');
		var divId= obj.attr("divId");
		var box = $("#"+divId).show();
		box.siblings().hide();
		
		var left = obj.position().left-obj.parent().position().left + obj.width()/2;
		
		box.find(".icon1").css("left",left);
	},
	countCustomer:function(){
		dum.common.ajax({
			   type: "post",
			   url: "/cus/countCustomer.html",
			   dataType : "json",
			   success: function(data)
			   {
				   for(var key in data){
					   $("#"+key).html(data[key]);
				   }
			   }
			});
	},
	queryCount : function() {
		dum.common.ajax({
			type : "post",
			url : "/home/queryCount.html",
			dataType : "text",
			success : function(data) {
				$(".queryCount").text(data);
			}
		});
	}
};