$(function() {
	order.init();
})
var order = {
	init : function() {
		this.loadOrderList(1);
	},
	loadOrderList : function(current) {
		var data = {
			page : current
		};
		dum.common.ajax({
			type : "post",
			url : "/ordServiceCompany/ordServiceList.html",
			data : data,
			dataType : "json",
			success : function(data) 
			{
				$("#orderBoday").html(order.getOrderListHtml(data));
				var rows = 10;
				var totalCount = data.totalCount;
				var page = new PageObj(totalCount, rows, current);
				$(".PagingUl").html(order.pageHtml(page));
			}
		});
	},
	getOrderListHtml : function(data) {
		var html = "";
		if (data) {
			var result = data.result;
			if(result&&result.length>0){
				for (var i = 0; i < result.length; i++) {
					var ordServiceCompany = result[i];
					html += this.getOrdServiceCompanyHtml(ordServiceCompany);
				}
			}else{
				html+='<tr><td colspan="6" class="backFc tc color50" style="height:30px; line-height:30px;">暂无信息</td></tr>';
			}
			
		}
		return html;
	},
	getOrdServiceCompanyHtml : function(ordServiceCompany) 
	{
		var serviceStatus='进行中';
		var serviceDesc="开启服务";
		if(ordServiceCompany)
		{
			var status=ordServiceCompany.serviceStatus;
			if(status=='0'){
				serviceStatus='已完结';
				serviceDesc="查看信息";
			}else if(status=='1'){
				serviceStatus='已提交';
				serviceDesc="查看信息";
			}
		}
		var serviceProduct=ordServiceCompany.product;
		var html = '';
		html += '<tr>';
		html += '<td align="center">'+(ordServiceCompany?ordServiceCompany.companyName:'')+'</td>';
		html += '<td align="center">'+(serviceProduct?serviceProduct.productName:'')+'</td>';
		html += '<td align="center">';
		html += '<span class="renewalsHover">';
		html += ordServiceCompany.periodUnit;
		html += '</span>';
		if(serviceProduct&&serviceProduct.productCode=='JZBS')
		{
			html+='<a class="renewals_span" onclick="renewals.loadModel('+ordServiceCompany.productId+','+ordServiceCompany.id+')" href="javascript:void(0);"  >续费</a>'
		}
		html += '</td>';
		html += '<td align="center">'+ordServiceCompany.unitName+'</td>';
		html += '<td align="center">';
		html += serviceStatus;
		html += '</td>';
		html += '<td align="center">';
			html += '  <a class="viewDiv" target="_bank" href="'+dum.appName+'/orderProcess/processIndex.html?id='+ordServiceCompany.id+'">';
			html += '   查看进程';
			html += '  </a>';
		html += '</td>';
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


function PageObj(totalCount, rows, current) {
	this.totalCount = totalCount;
	this.rows = rows;
	this.current = current;
}
PageObj.prototype.pages = function() {
	return this.totalCount % this.rows === 0 ? this.totalCount / this.rows
			: parseInt(this.totalCount / this.rows) + 1;
}
