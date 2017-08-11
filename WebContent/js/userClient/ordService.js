$(function() {
	//order.init($('#payType').val());
})
var order = {
	init : function(payType) {
		this.loadOrderList(1);
	},
	loadOrderList : function(current) {
		var data = {
			page : current
		};
		dum.common.ajax({
			type : "get",
			url : "/ordService/ordServiceList.api",
			data : data,
			dataType : "json",
			success : function(data) 
			{
				var status=data["executeStatus"];
				if("0"==status){
					var pageResult=data["values"];
					$("#orderBoday").html(order.getOrderListHtml(pageResult));
					var rows = 10;
					var totalCount = pageResult.total;
					var page = new PageObj(totalCount, rows, current);
					$(".PagingUl").html(order.pageHtml(page));
				}else{
					if(data["errorCode"]=='login001'){
						window.location.href = dum.appName+"/customer/loginUI.html";
					}
				}
				
			}
		});
	},
	getOrderListHtml : function(pageResult) {
		var html = "";
		var rows=pageResult["rows"];
		if (rows) {
			if(rows&&rows.length>0){
				for (var i = 0; i < rows.length; i++) {
					var ordService = rows[i];
					html += this.getOrdServiceHtml(ordService);
				}
			}else{
				html+='<tr><td colspan="6" class="backFc tc color50" style="height:30px; line-height:30px;">暂无信息</td></tr>';
			}
			
		}
		return html;
	},
	getOrdServiceHtml : function(ordService) 
	{
		var html = '';
		html += '<tr>';
		html += '<td align="center">'+(ordService.enterpriseName?ordService.enterpriseName:'<a onclick="enterpriseList('+ordService.id+','+ordService.customerId+')"')+' style="color:blue;text-decoration:underline;cursor: pointer;">分配企业</a></td>';
		html += '<td align="center">'+ordService.productName+'</td>';
		html += '<td align="center">'+ordService.serviceName+'</td>';
		html += '<td align="center">'+(ordService.createDate?formatDateTime(ordService.createDate):'')+'</td>';
		html += '</tr>';
		return html;
	},
	pageObj : {},
	pageHtml : function(page) {
		var payType = $(".borderHover").attr("paymentStatus");
		this.pageObj = page;
		var html = '';
		var pages = page.pages();
		if (pages <=1) {
			return html;
		}
		html += '<li><a onclick="order.loadOrderList(1);" href="javascript:void(0);">首页</a></li>';
		if (page.current > 1) {
			html += '<li><a onclick="order.loadOrderList(' + (page.current - 1)+ ');" href="javascript:void(0);">上一页</a></li>';
		}
		for (var i = page.current; i < pages + 1; i++) {
			if (i == page.current) {
				html += '<li class="PagingUlHover"><a  href="javascript:void(0);">'+ i + '</a></li>';
			} else {
				html += '<li><a onclick="order.loadOrderList(' + i + ');"  href="javascript:void(0);">' + i+ '</a></li>';
			}
		}
		if (pages > page.current) {
			html += '<li><a onclick="order.loadOrderList(' + (page.current + 1)+ ');" href="javascript:void(0);">下一页</a></li>';
		}
		html += '<li><a onclick="order.loadOrderList(' + pages + ');" href="javascript:void(0);">尾页</a></li>';
		return html;
	}
}

function openEnterpriseList(ordServiceId){
	$("#ordServiceId").val(ordServiceId);
	$('#enterpriseList_Div').window('open');
	$("#enterpriseList").datagrid( "load");
}

function choiceEnterprise(){
	var row = $('#enterpriseList').datagrid('getSelected');
	var ordServiceId=$("#ordServiceId").val();
	var param={"enterpriseId":row.id,"id":ordServiceId}
    if (row){
    	$.messager.confirm('提示框', '你确定要给该服务分配企业吗?',function(){
    		dum.common.ajax({
    			type : "post",
    			url : "/ordService/saveOrdService.api",
    			data : param,
    			dataType : "json",
    			success : function(data) {
    				if(data.executeStatus=="0"){
    					window.location.reload();
    				}else{
    					$.messager.alert('提示:','分配失败!');
    				}
    			}
    		});
    	})
    	
    }else{
		$.messager.alert('提示','请先选择一行数据!','确定');
    }
	
}
function PageObj(totalCount, rows, current) {
	this.totalCount = totalCount;
	this.rows = rows;
	this.current = current;
}
PageObj.prototype.pages = function() {
	return this.totalCount % this.rows === 0 ? this.totalCount / this.rows
			: parseInt(this.totalCount / this.rows) + 1;
}

function formatEntName(v,r,i){
	if(v){
		return v;
	}else{
		return '<a style="color:blue;text-decoration:underline;cursor: pointer;" onclick="openEnterpriseList('+r.id+')">分配企业</a>';
	}
}

function  formatDateTime(dd){
	if(!dd||dd=='undefined'){
		return '';
	}
	var d=new Date(dd);
	return d.getFullYear()
		+"-"+getTwoTime(d.getMonth()+1)
		+"-"+getTwoTime(d.getDate())
		+" "+getTwoTime(d.getHours())
		+":"+getTwoTime(d.getMinutes())
		+":"+getTwoTime(d.getSeconds());
}
function  getTwoTime(t){
	if(t<10){
		return "0"+t;
	}
	return t;
}