var timerId=null;
$(function() {
	//区域列表
	getAreaList();
	function getAreaList(){
		dum.common.ajax({
			   type: "get",
			   url: "/area/areaList/2.api",
			   dataType : "json",
			   success: function(data)
			   {
				   if(data && data.values && data.values){
					   var list = data.values;
					   if(list && list.length && list.length > 0){
						   var content = '';
						   $.each(list,function(index,value){
							   content += '<option value="'+value.id+'">'+value.areaName+'</option>';
						   })
						   $("#area").html(content);
					   }
				   }
			   }
		});
	}
	
	//分类类别
	getQuestionType();
	function getQuestionType(){
		dum.common.ajax({
			   type: "get",
			   url: "/sysQuestion/getQuestionTypeAll.api",
			   dataType : "json",
			   success: function(data)
			   {
				   if(data && data.values && data.values){
					   var list = data.values;
					   if(list && list.length && list.length > 0){
						   var content = '';
						   $.each(list,function(index,value){
							   content += '<option value="'+value.typeCode+'">'+value.typeName+'</option>';
						   })
						   $("#type").html(content);
					   }
				   }
			   }
		});
	}
	
	//点击提交
	$(".subProblem").click(function(){
		clearTimeout(timerId);
	    timerId=setTimeout(function(){
	    	submitQuestion();
	    },500);
	});
	
	//米问答字数校验
	$("#majorQuestion").keyup(function(){
		setWordLength($(this));
	});
	
	$("#additionalQuestion").keyup(function(){
		addwordLength($(this));
	});
	
	//关闭提示框
	$(".promptQuizefix").click(function(){
		$(".promptQuize1").hide();
		window.location.href = dum.appName + "/ask/all/";
	});
	setWordLength($("#majorQuestion"));
	addwordLength($('#additionalQuestion'));
})

//问题标题字数控制
function setWordLength(obj) {
	var inputVal = $.trim(obj.val());
	if(inputVal && inputVal.length <= 40){
		obj.next().text(inputVal.length+"/40");
	}else{
		obj.val(obj.val().substring(0,40));
		obj.next().text("40/40");
	}
}

//问题描述字数控制
function addwordLength(obj){
	var inputVal = $.trim(obj.val());
	if(inputVal && inputVal.length <= 1000){
		obj.next().text(inputVal.length+"/1000");
	}else{
		obj.val(obj.val().substring(0,1000));
		obj.next().text("1000/1000");
	}
}

/**
 * 悬赏
 */
function gradeChange(){
	var objS = document.getElementById("price");
    var value = objS.options[objS.selectedIndex].value;
    if(parseInt(value) > 0){
    	checkCustomer(function(){
    		dum.common.ajax({
    			type : "get",
    			url : "/askUserWealth/getCuserTomerWealth.api",
    			dataType : "json",
    			success : function(data) {
    				var executeStatus = data.executeStatus;
    				var userPrice = data.values;
    				if (executeStatus == '0' && parseInt(value) <= parseInt(userPrice)) {
    					
    				}else{
    					var d = dialog({
    			    	    content: '你的财富值不足！'
    			    	});
    			    	d.show();
    			    	setTimeout(function () {
    			    	    d.close().remove();
    			    	}, 2000);
    			    	$('#price').val("0");
    				}
    			}
    		});
    	});
    }
}
function getH(){
	var wh = $(window).height(),bh = $('body').height();
	if(bh<wh){
		$('body').css({
			'min-height':wh
		});
		$('.loginBottom').css({
			'position':'absolute',
			'bottom':'0',
			'width':'100%'
		});
	}else{
		$('.loginBottom').attr('style','');
	}
}
function submitQuestion() {
	var question = $("#majorQuestion").val();
	$("#validPrompt").hide();
	var titlelength = ($("#majorQuestion").val()).length;
	if (question && titlelength && titlelength <= 40) {
		checkCustomer(function(){
			dum.common.ajax({
				type : "post",
				url : "/sysQuestion/saveQuestion.api",
				data : $('#saveQuestion').serialize(),
				dataType : "json",
				success : function(data) {
					//0:成功，1：失败
					var executeStatus = data.executeStatus;
					if (executeStatus == '0') {
						var d = dialog({
				    	    content: '提问成功,请等待后台审核！'
				    	});
				    	d.show();
				    	setTimeout(function () {
				    	    d.close().remove();
				    	    window.location.href = dum.appName+"/ask/index.html";
				    	}, 2000);
					}else{
						var val = data.errorMsg;
						var code = val.code;
						var msg = val.msg;
						if(code && code == '2002' && msg){
							var d = dialog({
					    	    content: msg
					    	});
					    	d.show();
					    	setTimeout(function () {
					    	    d.close().remove();
					    	}, 2000);
						}else{
							var d = dialog({
					    	    content: '提交失败！'
					    	});
					    	d.show();
					    	setTimeout(function () {
					    	    d.close().remove();
					    	}, 2000);
						}
					}
				}
			});
		});
	} else {
		$("#majorQuestion").focus();
		$("#validPrompt").find("font").text("请准确描述您的问题(长度不能超过40个字符)");
		$("#validPrompt").show();
	}
}