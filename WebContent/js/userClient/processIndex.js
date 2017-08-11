$(function() {
  
  processIndex.init();
})

var processIndex = {
	serviceCompanyId:'',
	init : function() {
		this.serviceCompanyId=$("#serviceCompanyId").val();
		this.loadProcessHtml();
	},
	loadProcessHtml : function() {
		var data = {
				serviceCompanyId : this.serviceCompanyId
		};
		dum.common.ajax({
					type : "post",
					url : "/orderProcess/wfNodeList.html",
					data : data,
					dataType : "json",
					success : function(data) {
						var html = '';
						if(data&&data.length>0){
							for (var i = 0; i < data.length; i++) {
								html += '<tr>';
								html += '  <td><span class="radius">';
								if (i + 1 < data.length) {
									html += '<span class="radius1"></span><span class="lineSpan"></span>';
								} else {
									html += '<span class="radius2"></span>';
								}
								html += '</span><span class="fw">' + data[i].createString + '</span></td>';
								html += '  <td class="fw">' + data[i].weekDay + '</td>';
								html += '  <td><p class="mr10 ml10">' + data[i].nodeName + '</p></td>';
								
								if(data[i].figure){
									html += '  <td><img class="processindexIcon" onclick="processIndex.amplifyImg('+data[i].figure+')"/></p></td>';
								}else{
									html += '  <td>' + data[i].nodeRemark + '<img  onclick="processIndex.amplifyImg()" class="processindexIcon" src="../images/img/dljzWc.png" class="processindexIcon"/></td>';
								}
								
								html += '  <td>' + data[i].nodeRemark + '</td>';
								html += '  <td class="middleTop">';
								html += '  </td>';
								html += '</tr>';
							}
							$("#processTab").html(html);
						}else{
							$("#processTab").html("无数据");
						}
					}
				});
	},
	amplifyImg:function(id){
		if(id){
			$("body").append('<div class="IconShowDiv none"><div class="IconShow1"></div><div class=" IconShow"><p class="IconClose"><img src="../images/clos.png"/></p/></div></div>');
		}else{
			$("body").append('<div class="IconShowDiv none"><div class="IconShow1"></div><div class=" IconShow"><img src="../images/img/dljzWc.png" class="processindexIcon1" /><p class="IconClose"><img src="../images/clos.png"/></p/></div></div>');
		}
		$(".processindexIcon").click(function(){
			$(".IconShowDiv").show();
		});
		$(".IconClose").click(function(){
			$(".IconShowDiv").hide();
		});
	}
}