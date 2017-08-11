$(function() {
	order.init($('#orderStatus').val());
})
var order = {
	init : function(orderStatus) {
		this.loadOrderList(1,dum.common.isNull(orderStatus) ? null : orderStatus);
		this.bindDelect();
		this.orderTopBind();
	},
	loadOrderList : function(current,orderStatus) {
		var data = {
			page : current
		};
		if (orderStatus) {
			data.orderStatus = orderStatus;
		}
		dum.common.ajax({
			type : "get",
			url : "/ordPaymentOrder/cusOrderList.api",
			data : data,
			dataType : "json",
			success : function(data) {
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
		var rows=pageResult["rows"];
		var html = "";
		if (rows) {
			if(rows&&rows.length>0){
				for (var i = 0; i < rows.length; i++) {
					var paymentOrder = rows[i];
					if (paymentOrder.orderStatus == '0') {
						html += this.getPaymentHtml(paymentOrder);
					} else {
						html += this.getNoPaymentHtml(paymentOrder);
					}
				}
			}else{
				html+='<tr><td colspan="6" class="backFc tc color50" style="height:30px; line-height:30px;">暂无信息</td></tr>';
			}
			
		}
		return html;
	},
	getPaymentHtml : function(paymentOrder) {
		var html = '';
		html += '<tr>';
		html += '<td colspan="8">';
		html += '<table cellpadding="0" cellspacing="0">';
		html += '<tr>';
		html += '<th><p class="color50 ml10"><span class="fw">'+formatDateTime(paymentOrder.createDate)+'</span><span class="ml30">订单号：' + paymentOrder.orderCode + '</span></p></th>';
		html += '<th colspan="2"></th>';
		html += '<th width="10%" colspan="3"></th>';
		html += '</tr>';
		html += '<tr>';
		html += '<td width="45%">';
		html += '<table class="orderTab1 botBorder">';
		var ordItems = paymentOrder.orderItemList;
		for (var i = 0; i < ordItems.length; i++) {
				var orderItem =ordItems[i];
				var serviceProductModel=orderItem.serviceProductSkuEntity;
				html += '<tr>';
				html += '  <td width="25%"><div class="ml10"><h4>'+ serviceProductModel.name + '</h4></div></td>'
				html += '  <td width="30%" class="tc"><p>'+ serviceProductModel.price + '</p></td>';
				html += '  <td width="30%" class="tc"><p>'+ orderItem.skuCount + '</p></td>';
				html += '</tr>';
		}
		var payPrice=paymentOrder.orderPrice-paymentOrder.couponPrice;
		if(payPrice<0){
			payPrice=0;
		}
		html += '</table>';
		html += '</td>';
		html += '<td width="10%" class="tc leftBorder"><p class="fw color68">'+paymentOrder.couponPrice+'</p></td>';
		html += '<td width="10%" class="tc leftBorder"><p class="fw color68">'+paymentOrder.orderPrice+'</p></td>';
		html += '<td width="10%" class="tc leftBorder"><p class="fw color68">'+payPrice+'</p></td>';
		html += '<td width="15%" class=" tc leftBorder">已付款</td>';
		html += '<td width="15%" class="tc leftBorder"><a href="'+dum.appName+'/ordPaymentOrder/contract/'+paymentOrder.id+'.html"><p class="contract">电子合同</p></a></td>';
		html += '</tr>';
		html += '</table>';
		html += '</td>';
		html += '</tr>';
		return html;
	},
	getNoPaymentHtml : function(paymentOrder) {
		var html = '<tr>';
		html += '<td colspan="8" class="stayPayment">';
		html += '<table cellpadding="0" cellspacing="0">';
		html += '<tr>';
		html += '<th><p class="color50 ml10"><span888 class="fw">'+formatDateTime(paymentOrder.createDate)+'</span><span class="ml30">订单号：' + paymentOrder.orderCode+ '</span></p></th>';
		html += '<th colspan="2"></th>';
		html += '<th width="10%" colspan="3" class="tr"><p class="cursor mr5 mt5"><img id="'+paymentOrder.id+'" class="deleteOrder" src="'
				+ dum.appName + '/images/img/delete.png"/></p></th>';
		html += '</tr>';
		html += '<tr>';
		html += '<td width="45%" >';
		html += '<table class="orderTab2 botBorder">';
		var orderItemList = paymentOrder.orderItemList;
		for (var i = 0; i < orderItemList.length; i++) {
				var orderItem =orderItemList[i];
				var serviceProductModel=orderItem.serviceProductSkuEntity;
				html += '<tr>';
				html += '  <td width="25%"><div class="ml10"><h4>'+ serviceProductModel.name + '</h4></div></td>'
				html += '  <td width="30%" class="tc"><p>'+ serviceProductModel.price + '</p></td>';
				html += '  <td width="30%" class="tc"><p>'+ orderItem.skuCount + '</p></td>';
				html += '</tr>';
		}
		html += '</table>';
		html += '</td>';
		html += '<td width="10%" class="tc leftBorder"><p class="fw color68">'+paymentOrder.couponPrice+'</p></td>';
		html += '<td width="10%" class="tc leftBorder"><p class="fw color68">'+paymentOrder.orderPrice+'</p></td>';
		var payPrice=paymentOrder.orderPrice-paymentOrder.couponPrice;
		if(payPrice<0){
			payPrice=0;
		}
		html += '<td width="10%" class="tc leftBorder"><p class="fw color68">'+payPrice+'</p></td>';
		html += '<td width="15%" class=" tc leftBorder"><a href="'+ dum.appName + '/ordPaymentOrder/orderChoPayOpt.html?id='+ paymentOrder.id+ '"><p class="paymentBtn">立即付款</p></a></td>';
		html += '<td width="15%" class="tc leftBorder"><p class="">暂无电子合同</p></td>';
		html += '</tr>';
		html += '</table>';
		html += '</td>';
		html += '</tr>';
		return html;
	},
	bindDelect : function() {
		$("#orderBoday").on("click", ".deleteOrder", function() {
			if (confirm("您确定要删除吗？")) {
				var id = $(this).attr("id");
				dum.common.ajax({
					type : "post",
					url : "/ordPaymentOrder/delOrdPaymentOrder.api?id=" + id,
					dataType : "json",
					success : function(data) {
						$(this).parents(".stayPayment").remove();
						order.loadOrderList(order.pageObj.current);
					}
				});
			}
		})
	},
	pageObj : {},
	pageHtml : function(page) {
		var orderStatus = $(".borderHover").attr("paymentStatus");
		this.pageObj = page;
		var html = '';
		var pages = page.pages();
		if (pages <=1) {
			return html;
		}
		html += '<li><a onclick="order.loadOrderList(1,' + orderStatus
				+ ');" href="javascript:void(0);">首页</a></li>';
		if (page.current > 1) {
			html += '<li><a onclick="order.loadOrderList(' + (page.current - 1)
					+ ',' + orderStatus
					+ ');" href="javascript:void(0);">上一页</a></li>';
		}
		for (var i = page.current; i < pages + 1; i++) {
			if (i == page.current) {
				html += '<li class="PagingUlHover"><a  href="javascript:void(0);">'
						+ i + '</a></li>';
			} else {
				html += '<li><a onclick="order.loadOrderList(' + i + ','
						+ orderStatus + ');"  href="javascript:void(0);">' + i
						+ '</a></li>';
			}
		}
		if (pages > page.current) {
			html += '<li><a onclick="order.loadOrderList(' + (page.current + 1)
					+ ',' + orderStatus
					+ ');" href="javascript:void(0);">下一页</a></li>';
		}
		html += '<li><a onclick="order.loadOrderList(' + pages + ',' + orderStatus
				+ ');" href="javascript:void(0);">尾页</a></li>';
		return html;
	},
	orderTopBind : function() {
		$(".orderTop li").click(
				function() {
					var paymentStatus = $(this).attr("paymentStatus");
					order.loadOrderList(1, paymentStatus);
					$(this).attr("class", "orderHover").siblings().removeClass("orderHover");
				})
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