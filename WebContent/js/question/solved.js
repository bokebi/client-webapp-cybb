$(document).ready(function() {
	findRecommendedAccounts();// 会计推荐列表
	findAboutQuestion($('#answerTypeCode').val());// 相关提问列表
	hotWt();//热门问题
	hotZx();//资讯
	Gg();//广告
	$('#toasnwerQuestion').click(function() {
		//显示隐藏
		$("#toasnwerQuestionDiv").toggle();
		/*$('#toasnwerQuestionDiv').removeClass("clearfix hidden");
		$('#toasnwerQuestionDiv').addClass("clearfix")*/
	});
	
	$('#supplementQuestion').click(function() {
		//显示隐藏
		$("#addQuestionPriceDiv").hide();
		$("#supplementQuestionDiv").toggle();
		/*$('#supplementQuestionDiv').removeClass("clearfix hidden");
		$('#supplementQuestionDiv').addClass("clearfix")*/
	});
	
	$('#addQuestionPrice').click(function() {
		//显示隐藏
		$("#supplementQuestionDiv").hide();
		$("#addQuestionPriceDiv").toggle();
		/*$('#addQuestionPriceDiv').removeClass("clearfix hidden");
		$('#addQuestionPriceDiv').addClass("clearfix")*/
	});
	
	//答字数校验
	$("#questionAnswer").keyup(function(){
		setWordLength($(this));
	});
	
	$("div.best-answer").find("div.with-product li a").each(function(){
	    var flowCode = $(this).attr('flow_code');
	    var imgClass = $(this).attr('class');
	    if("ZCGS"==flowCode){
	    	if(imgClass){
	    		$(this).attr("style","background-image: url("+dum.appName+"/images/img/zcgsIcon.jpg);");
	    	}
	    	$(this).attr("href","/product/registerCompany.html");
	    }else if("GSBG"==flowCode){
	    	if(imgClass){
	    		$(this).attr("style","background-image: url("+dum.appName+"/images/img/gsbgIcon.jpg);");
	    	}
	    	$(this).attr("href","/product/addressChange.html");
	    }else if("DLJZ"==flowCode){
	    	if(imgClass){
	    		$(this).attr("style","background-image: url("+dum.appName+"/images/img/dljzIcon.jpg);");
	    	}
	    	$(this).attr("href","/product/accounting.html");
	    }else if("JCKQBL"==flowCode){
	    	if(imgClass){
	    		$(this).attr("style","background-image: url("+dum.appName+"/images/img/jckqblIcon.jpg);");
	    	}
	    	$(this).attr("href","/product/jckbl.html");
	    }else if("GQSJ"==flowCode){
	    	if(imgClass){
	    		$(this).attr("style","background-image: url("+dum.appName+"/images/img/gqsjIcon.jpg);");
	    	}
	    	$(this).attr("href","/product/equityDesign.html");
	    }
	});
	

	var body = $('.body');
	body.each(function() {
		var el = $(this);
		if(el.height()>500){
			var btnBox = el.next('.more-btn');
			el.height(500);
			btnBox.show();
			btnBox.find('a').click(function(event) {
				event.preventDefault();
				if ($(this).data('open')) {
					el.height(500);
					$(this).text('显示更多').data('open',false);					
				}else{
					el.height('auto');
					$(this).text('收起').data('open',true);	
				}
			});
		}		
	});
});


//热点问题
function hotWt(){
	dum.common.ajax({
		type : "get",
		url : "/sysQuestion/getHotQuestion/"+dum.currentId+"/8.api",
		dataType : "json",
		success : function(data) {
			var html = "";
			var val = data.values;
			$.each(val, function(i, n) {
				html+="<li class='text-overflow'><span class='top-number'>"+(i+1)+"</span> <a href='"+dum.appName+"/ask/"+n.id+".html'>"+n.majorQuestion+"</a></li>";
			});
			if (html != '') {
				$('#solvedHotWtList').html(html);
			}
		}
	});
}

//广告
function Gg(){
	dum.common.ajax({
		type : "get",
		url : "/website/getAdByParam/"+dum.currentId+".api",
		dataType : "json",
		data:{identifier:'ask_right'},
		success : function(data) {
			var val = data.values;
			var html = "<a class='ad-b' target='_blank' href='"+val.url+"'><img src='"+val.attachment.fillFilePath+"'";	
			html +="title='"+val.adDesc+"' style='width:250px;height:300px;'></a>";
			if (html != '') {
				$('#solvedGgList').html(html);
			}
		}
	});
}


//热点资讯
function hotZx(){
	dum.common.ajax({
		type : "get",
		url : "/wz/hotarticlelist/1/8.html",
		dataType : "json",
		success : function(data) {
			var html = "";
			$.each(data, function(i, n) {
				html+="<li class='text-overflow'><span class='top-number'>"+(i+1)+"</span> <a href='"+dum.appName+"/wz/"+n.id+".html'>"+n.articleTitle+"</a></li>";
			});
			if (html != '') {
				$('#solvedHotZxList').html(html);
			}
		}
	});
}

function chasingAnswerFuc(id,type){
	//显示隐藏
	$('#chasingAnswerDiv'+id).toggle();
	$("#chasingAnswerDiv"+id+" [name='type']").val(type);
	if(type == 0){
		$("#chasingAnswerDiv"+id+" [name='content']").attr({"placeholder":"追问"});
	}else if(type == 1){
		$("#chasingAnswerDiv"+id+" [name='content']").attr({"placeholder":"追答"});
	}
	
}

//相关问题
function findAboutQuestion(findType) {
	dum.common.ajax({
		type : "get",
		url : "/ask/aboutquestionbycode/"+findType+"/1/5.html",
		dataType : "json",
		data : {
			findType : findType
		},
		success : function(data) {
			var html = "";
			$.each(data, function(i, n) {
				if(n.majorQuestion && n.majorQuestion.length > 40){
					html += '<li><a href=\''+dum.appName +'/ask/'+n.id+'.html\'>' + n.majorQuestion.substring(0,40)+ '...</a> <span class=\'time\'>' + n.formatCreateDate+ '</span></li>';
				}else{
					html += '<li><a href=\''+dum.appName +'/ask/'+n.id+'.html\'>' + n.majorQuestion+ '</a> <span class=\'time\'>' + n.formatCreateDate+ '</span></li>';
				}
			});
			if (html != '') {
				$('#solvedAboutQuestionList').html(html);
			}
		}
	});
}

//加载推荐会计
function findRecommendedAccounts() {
	dum.common.ajax({
		type : "get",
		url : "/askRecommendAccount/getAskRecommendAccountList/10.api",
		dataType : "json",
		success : function(data) {
			var val = data.values;
			var html = "";
			$.each(val,function(i, n) {
					if(n.attachment){
						html += '<li class=\'clearfix\'><div class=\'user-img-box\' style=\'background-image: url('+n.attachment.fillFilePath+')\'></div>';
					}else{
						html += '<li class=\'clearfix\'><div class=\'user-img-box\' style=\'background-image: url('+dum.appName +'/images/img/infoImg.png)\'></div>';
					}
					var jobType=n.type==0?"会计":"工商";
					html += '<div class=\'user-info\'><p><span class=\'name\'>'
							+ '<a href=\''+dum.appName+'/ask/kjzx/'+n.id+'.html\'>'+n.userName+'</a>'
							
							+ '</span> <span class=\'job\'>'
							+ jobType
							+ '</span></p>';
					html += '<p><span class=\'green-icon\'></span>在线</p></div><div class=\'button-box\'><a href=\''+dum.appName +'/ask/addQuestion.html?cusid='+n.id+'\' class=\'btn btn-success ask\'>提问</a></div></li>';
				});
				if (html != '') {
					$('#recommendedAccountsList').html(html);
				}
		}
	});
}

/**
 * 字数
 * @param obj
 */
function setWordLength(obj) {
	var inputVal = $.trim(obj.val());
	if(!inputVal){
		$("#answerNumber").text("2000");
	}else if(inputVal.length <= 2000){
		$("#answerNumber").text(2000-inputVal.length);
	}else{
		obj.val(obj.val().substring(0,2000));
		$("#answerNumber").text("0");
	}
}
function setContentLength(obj,number,id) {
	var inputVal = $.trim(obj.value);
	if(!inputVal){
		$("#chasingAnswerNumber"+id+"").text(number);
	}else if(inputVal && inputVal.length <= number){
		$("#chasingAnswerNumber"+id+"").text(number-inputVal.length);
	}else{
		obj.value=obj.value.substring(0,number);
		$("#chasingAnswerNumber"+id+"").text("0");
	}
}
function setSupplementContentLength(){
	var inputVal=$.trim($("#supplementContent").val());
	if(!inputVal){
		$("#supplementContentLength").text("2000");
	}else if(inputVal && inputVal.length <= 2000){
		$("#supplementContentLength").text(2000-inputVal.length);
	}else{
		$("#supplementContent").val(inputVal.substring(0,2000));
		$("#supplementContentLength").text("0");
	}
}

//回答问题
function saveAnswerQuestion() {
	checkCustomer(function(){
		dum.common.ajax({
			type : "post",
			url : "/sysQuestion/saveAnswerQuestion.api",
			data : $('#questionAnswerForm').serialize(),
			dataType : "json",
			success : function(data) {
				//0:成功，1：失败
				if (data.executeStatus == "0") {
					var d = dialog({
			    	    content: '回答成功！'
			    	});
			    	d.show();
			    	setTimeout(function () {
			    	    d.close().remove();
			    	}, 1500);
					window.location.reload();
				}else{
					var d = dialog({
			    	    content: '回答失败！'
			    	});
			    	d.show();
			    	setTimeout(function () {
			    	    d.close().remove();
			    	}, 1500);
				}
			}
		});
	});
}

//问题补充
function saveSupplementQuestion() {
	checkCustomer(function(){
		dum.common.ajax({
			type : "post",
			url : "/sysQuestion/saveSupplementQuestion.api",
			data : $('#supplementQuestionForm').serialize(),
			dataType : "json",
			success : function(data) {
				//0:成功，1：失败
				if (data.executeStatus == "0") {
					var d = dialog({
			    	    content: '问题补充成功！'
			    	});
			    	d.show();
			    	setTimeout(function () {
			    	    d.close().remove();
			    	}, 1500);
					window.location.reload();
				}else{
					var d = dialog({
			    	    content: '问题补充失败！'
			    	});
			    	d.show();
			    	setTimeout(function () {
			    	    d.close().remove();
			    	}, 1500);
				}
			}
		});
	});
}

//追加悬赏
function addQuestionPrice() {
	checkCustomer(function(){
		var id = $('#addQuestionPriceForm #id').val();
		var price = $('#addQuestionPriceForm #addPrice').val();
		if(price && price > 0){
			dum.common.ajax({
				type : "post",
				url : "/sysQuestion/addQuestionPrice/"+id+"/"+price+".api",
				dataType : "json",
				success : function(data) {
					//0:成功，1：失败
					if (data.executeStatus == "0") {
						var d = dialog({
				    	    content: '追加悬赏成功！'
				    	});
				    	d.show();
				    	setTimeout(function () {
				    	    d.close().remove();			    	    
				    	}, 1500);
				    	window.location.reload();
					}else{
						if(data.errorCode == '2002'){
							var d = dialog({
					    	    content: data.errorMsg
					    	});
					    	d.show();
					    	setTimeout(function () {
					    	    d.close().remove();
					    	}, 1500);
						}else{
							var d = dialog({
					    	    content: '追加悬赏失败！'
					    	});
					    	d.show();
					    	setTimeout(function () {
					    	    d.close().remove();
					    	}, 1500);
						}
						
					}
				}
			});
		}else{
			var d = dialog({
	    	    content: '请填写财富值！'
	    	});
	    	d.show();
	    	setTimeout(function () {
	    	    d.close().remove();			    	    
	    	}, 1500);
		}
	});
}

//追答
function saveChasingAnswer(id){
	checkCustomer(function(){
		dum.common.ajax({
			type : "post",
			url : "/sysQuestion/saveChasingAnswer.api",
			data : $('#chasingAnswerForm'+id).serialize(),
			dataType : "json",
			success : function(data) {
				//0:成功，1：失败
				if (data.executeStatus == "0") {
			    	var d = dialog({
			    	    content: '操作成功！'
			    	});
			    	d.show();
			    	setTimeout(function () {
			    	    d.close().remove();
			    	}, 1500);
					window.location.reload();
				}else{
					var d = dialog({
			    	    content: '操作失败！'
			    	});
			    	d.show();
			    	setTimeout(function () {
			    	    d.close().remove();
			    	}, 1500);
				}
			}
		});
	});
}

/**
 * 采纳答案
 * @returns
 */
function adoptAnswer(id,qid){
	var d = dialog({
	    title: '提示',
	    content: '你确定要采纳该答案吗？',
	    okValue: '确定',
	    ok: function () {
	    	checkCustomer(function(){
					dum.common.ajax({
						type : "post",
						url : "/sysQuestion/saveAdoptAnswer/"+id+".api",
						dataType : "json",
						success : function(data) {
							//0:成功，1：失败
							if (data.executeStatus == "0") {
								var d = dialog({
						    	    content: '采纳答案成功！'
						    	});
						    	d.show();
						    	setTimeout(function () {
						    	    d.close().remove();
						    	}, 1500);
								window.location.reload();
							}else{
								var d = dialog({
								    content: '采纳答案失败'
								});
								d.show();
								setTimeout(function () {
								    d.close().remove();
								}, 1500);
							}
						}
					});
			});
			return true;
	    },
	    cancelValue: '取消',
	    cancel: function () {}
	});
	d.show();
}


/**
 * 关闭问题
 * @returns
 */
function closeQuestion(id){
	var d = dialog({
	    title: '提示',
	    content: '你确定要关闭该问题吗？',
	    okValue: '确定',
	    ok: function () {
	    	checkCustomer(function(){
					dum.common.ajax({
						type : "post",
						url : "/sysQuestion/saveSysQuestionSolve/"+id+".api",
						dataType : "json",
						success : function(data) {
							//0:成功，1：失败
							if (data.executeStatus == "0") {
								window.location.reload();
							}else{
								var d = dialog({
								    content: '关闭问题失败'
								});
								d.show();
								setTimeout(function () {
								    d.close().remove();
								}, 1500);
							}
						}
					});
	    	});
			return true;
	    },
	    cancelValue: '取消',
	    cancel: function () {}
	});
	d.show();
}

function saveAskCommentLog(type,answerId,praiseNum,negativeNum,el){
	
	el = $(el);
	var offset = el.offset();
	var cloneEl = el.clone().css('position','absolute').offset(offset);
	$('body').append(cloneEl);
	cloneEl[0].childNodes[2].textContent = type?"-1":'+1';
	cloneEl.animate({
		top: cloneEl.offset().top - 50,
		opacity: 0
	});
	
	saveAskCommentLogOk(type,answerId,praiseNum,negativeNum);
	//改变样式
	dum.common.ajax({
		type : "post",
		url : "/ask/savePraiseStep/"+answerId+"/"+type+".html",
		dataType : "json",
		success : function(data) {
			
		}
	});
}

/**
 * 点赞踩失败后的样式改变
 */
function saveAskCommentLogNoOk(type,id,praiseNum,negativeNum){
	var best_obj = $('#best_updown'+id);
	var normal_obj = $('#normal_updown'+id);
	if(praiseNum == '' || isNaN(praiseNum)){praiseNum=0;}
	if(negativeNum == '' || isNaN(negativeNum)){negativeNum=0;}
	praiseNum = parseInt(praiseNum);
	negativeNum = parseInt(negativeNum);
	if(type==0){
		var html = "<button class=\"btn btn-default\"> 失败 <span class=\"glyphicon glyphicon-thumbs-up\"></span>&nbsp;"
				+ (praiseNum)
				+ "&nbsp;</button>"
				+ "&nbsp;<button class=\"btn btn-default\"><span class=\"glyphicon glyphicon-thumbs-down\"></span> "
				+ negativeNum + " </button>";
		isobj(best_obj,html);
		isobj(normal_obj,html);
		setTimeout(
				function() {
					html = "<button class=\"btn btn-default\"  onclick=\"saveAskCommentLog(0,'"+id+"','"+praiseNum+"','"+negativeNum+"')\"><span class=\"glyphicon glyphicon-thumbs-up\"></span>&nbsp;"
							+ (praiseNum)
							+ "&nbsp;</button>"
							+ "&nbsp;<button class=\"btn btn-default\" onclick=\"saveAskCommentLog(1,'"+id+"','"+praiseNum+"','"+negativeNum+"')\"><span class=\"glyphicon glyphicon-thumbs-down\"></span>&nbsp;"
							+ negativeNum + "&nbsp;</button>";
					isobj(best_obj,html);
					isobj(normal_obj,html);
				}, 700
		);
	}else{
		var html = "<button class=\"btn btn-default\"><span class=\"glyphicon glyphicon-thumbs-up\"></span>&nbsp;"
			+ (praiseNum)
			+ "&nbsp;</button>"
			+ "&nbsp;<button class=\"btn btn-default\"> 失败 <span class=\"glyphicon glyphicon-thumbs-down\"></span> "
			+ negativeNum + " </button>";
		isobj(best_obj,html);
		isobj(normal_obj,html);
		setTimeout(
				function() {
					html = "<button class=\"btn btn-default\"  onclick=\"saveAskCommentLog(0,'"+id+"','"+praiseNum+"','"+negativeNum+"')\"><span class=\"glyphicon glyphicon-thumbs-up\"></span>&nbsp;"
							+ (praiseNum)
							+ "&nbsp;</button>"
							+ "&nbsp;<button class=\"btn btn-default\"  onclick=\"saveAskCommentLog(1,'"+id+"','"+praiseNum+"','"+negativeNum+"')\"><span class=\"glyphicon glyphicon-thumbs-down\"></span>&nbsp;"
							+ (negativeNum) + "&nbsp;</button>";
					isobj(best_obj,html);
					isobj(normal_obj,html);
				}, 700
		);
	}
}

/**
 * 改变最佳答案用户的赞数量
 */
function changuserpraiseNum(id){
	var best_praiseNum = $('#best_'+id+'praiseNum'); //最佳答案用户的点赞数对象
	var best_praiseNuminput = $('#best_'+id+'praiseNumInput');
	var num = 0;
	if(best_praiseNuminput.length > 0 && best_praiseNuminput.val() != '' && !isNaN(best_praiseNuminput.val())){
		num = parseInt(best_praiseNuminput.val())+1;
		best_praiseNuminput.val(num);
	}
	if(best_praiseNum.length > 0){
		best_praiseNum.html('<font color=\'red\'>+1</font>');
		setTimeout(
				function() {
					best_praiseNum.html(num);
				}, 700
		);
	}
	
}

/**
 * 点赞踩成功后的样式改变
 */
function saveAskCommentLogOk(type,id,praiseNum,negativeNum){
	var best_obj = $('#best_updown'+id);
	var normal_obj = $('#normal_updown'+id);
	if(praiseNum == '' || isNaN(praiseNum)){praiseNum=0;}
	if(negativeNum == '' || isNaN(negativeNum)){negativeNum=0;}
	praiseNum = parseInt(praiseNum);
	negativeNum = parseInt(negativeNum);
	if(type==0){
		changuserpraiseNum(id);
		var html = "<button class=\"btn btn-default\"> 已赞 <span class=\"glyphicon glyphicon-thumbs-up\"></span>&nbsp;"
				+ (praiseNum+1)
				+ "&nbsp;</button>"
				+ "&nbsp;<button class=\"btn btn-default\"><span class=\"glyphicon glyphicon-thumbs-down\"></span> "
				+ negativeNum + " </button>";
		isobj(best_obj,html);
		isobj(normal_obj,html);
	}else{
		var html = "<button class=\"btn btn-default\"><span class=\"glyphicon glyphicon-thumbs-up\"></span>&nbsp;"
			+ (praiseNum)
			+ "&nbsp;</button>"
			+ "&nbsp;<button class=\"btn btn-default\"> 已踩 <span class=\"glyphicon glyphicon-thumbs-down\"></span> "
			+ (negativeNum+1) + " </button>";
		isobj(best_obj,html);
		isobj(normal_obj,html);
	}
}

function isobj(obj,html){
	if(obj.length > 0){
		obj.html(html);
	}
}

