$(function() {
	myCompany.init();
})
var myCompany = {
	init : function() {
		this.loadmyCompanyList(1);
	},
	loadmyCompanyList : function(current) {
		var data = {
			page : current
		};
		dum.common.ajax({
			type : "post",
			url : "/myCompany/companyList.html",
			data : data,
			dataType : "json",
			success : function(data) 
			{
				$("#myCompanyBoday").html(myCompany.getmyCompanyListHtml(data));
				var rows = 10;
				var totalCount = data.totalCount;
				var page = new PageObj(totalCount, rows, current);
				$(".PagingUl").html(myCompany.pageHtml(page));
			}
		});
	},
	getmyCompanyListHtml : function(data) {
		var html = "";
		if (data) {
			var result = data.result;
			if(result&&result.length>0){
				for (var i = 0; i < result.length; i++) {
					var cusCompany = result[i];
					html += this.getMyCompanyHtml(cusCompany);
				}
			}else{
				html+='<tr><td colspan="6" class="backFc tc color50" style="height:30px; line-height:30px;">暂无信息</td></tr>';
			}
			
		}
		return html;
	},
	getMyCompanyHtml : function(cusCompany) 
	{
		var html = '';
		html +='<tr>';
		html +=  '<td align="center">'+cusCompany.companyName+'</td>';
		html +=  '<td align="center">';
		html +=  '   <a href="javascript:void(0);">查看</a>';
		html +=  '</td>';
		html +='</tr>';
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
		html += '<li><a onclick="myCompany.loadmyCompanyList(1);" href="javascript:void(0);">首页</a></li>';
		if (page.current > 1) {
			html += '<li><a onclick="myCompany.loadmyCompanyList(' + (page.current - 1)+ ');" href="javascript:void(0);">上一页</a></li>';
		}
		for (var i = page.current; i < pages + 1; i++) {
			if (i == page.current) {
				html += '<li class="PagingUlHover"><a  href="javascript:void(0);">'+ i + '</a></li>';
			} else {
				html += '<li><a onclick="myCompany.loadmyCompanyList(' + i + ');"  href="javascript:void(0);">' + i+ '</a></li>';
			}
		}
		if (pages > page.current) {
			html += '<li><a onclick="myCompany.loadmyCompanyList(' + (page.current + 1)+ ');" href="javascript:void(0);">下一页</a></li>';
		}
		html += '<li><a onclick="myCompany.loadmyCompanyList(' + pages + ');" href="javascript:void(0);">尾页</a></li>';
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
