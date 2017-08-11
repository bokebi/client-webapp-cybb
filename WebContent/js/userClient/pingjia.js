/**
 * 评价js
 */
$(function() {
    //加载用户对企业的评论
	/*dum.common.ajax({
		url : "/dyyApi/evaluate/findEvaluateDumInfo.api",
		type : "get",
		dataType : "json",
		success : function(data) {
			var value = data.values;
			if(!dum.common.isNull(value)){
				//服务态度
				var evaluateAttitude = value.evaluateAttitude;
				if(!dum.common.isNull(evaluateAttitude) && parseInt(evaluateAttitude) > 0){
					buildStart($('#evaluateAttitude_div').children('i'),evaluateAttitude);
					$('#evaluateAttitude').text(evaluateAttitude);
				}
				//工作效率
				var workEfficiency = value.workEfficiency;
				if(!dum.common.isNull(workEfficiency) && parseInt(workEfficiency) > 0){
					buildStart($('#workEfficiency_div').children('i'),workEfficiency);
					$('#workEfficiency').text(workEfficiency);
				}
				//响应速度
				var responseSpeed = value.responseSpeed;
				if(!dum.common.isNull(responseSpeed) && parseInt(responseSpeed) > 0){
					buildStart($('#responseSpeed_div').children('i'),responseSpeed);
					$('#responseSpeed').text(responseSpeed);
				}
				//专业程度
				var majorDegree = value.majorDegree;
				if(!dum.common.isNull(majorDegree) && parseInt(majorDegree) > 0){
					buildStart($('#majorDegree_div').children('i'),majorDegree);
					$('#majorDegree').text(majorDegree);
				}
				//细心脾气好
				var temperDegree = value.temperDegree;
				if(!dum.common.isNull(temperDegree) && parseInt(temperDegree) > 0){
					buildStart($('#temperDegree_div').children('i'),temperDegree);
					$('#temperDegree').text(temperDegree);
				}
				//主动又热情
				var activeHot = value.activeHot;
				if(!dum.common.isNull(activeHot) && parseInt(activeHot) > 0){
					buildStart($('#activeHot_div').children('i'),activeHot);
					$('#activeHot').text(activeHot);
				}
			}
		}
	});*/
	
	//根据数据给星星上色
	function buildStart(obj,number){
		$.each(obj,function(i,v){
			if((i+1)<=parseInt(number)){
				$(this).addClass("ihover");
			}
			$(this).removeAttr("onclick");
		});
	}
	
	//可评论的业务
	/*dum.common.ajax({
		url : "/dyyApi/evaluate/findEvaluateBusinessInfo.api",
		type : "get",
		data:{ordServiceId:$('#ordServiceId').val()},
		dataType : "json",
		success : function(data) {
			var value = data.values;
			if(!dum.common.isNull(value) && value.length > 0){
				var html = "";
				for(var i = 0; i < value.length; i++){
					var name = value[i].name;
					html += '<span>'+name+'</span>';
					html += '<p>';
					html += '<i onclick="a(this,1,\'#business'+i+'\')" class="ihover"></i>';
					html += '<i onclick="a(this,2,\'#business'+i+'\')" class="scorei"></i>';
					html += '<i onclick="a(this,3,\'#business'+i+'\')" class="scorei"></i>';
					html += '<i onclick="a(this,4,\'#business'+i+'\')" class="scorei"></i>';
					html += '<i onclick="a(this,5,\'#business'+i+'\')" class="scorei"></i>';
					html += '<font id="business'+i+'">1</font>分</p>';
				}
				$('#business_score').html(html);
			}
		}
	});*/
	
});

function a(obj,score,fs){
	$(obj).nextAll().removeClass("ihover");
	$(obj).prevAll().addClass("ihover");
	$(obj).addClass("ihover");
	$(obj).parent().find("input[type='hidden']").val(score);
	$(fs).text(score);
}