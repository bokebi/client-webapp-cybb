function PageObj(totalCount,rows,current){
	this.totalCount=totalCount;
	this.rows=rows;
	this.current=current;
}
PageObj.prototype.pages=function(){
	return this.totalCount%this.rows===0?this.totalCount/this.rows:parseInt(this.totalCount/this.rows)+1;
}
PageObj.prototype.init=function(){
	var html='';
	var pages=page.pages();
	if(pages==1){
		return html;
	}
	html+='<li><a onclick="order.loadOrderList(1,'+payType+');" href="javascript:void(0);">首页</a></li>';
	if(page.current>1){
		html+='<li><a onclick="order.loadOrderList('+(page.current-1)+','+payType+');" href="javascript:void(0);">上一页</a></li>';
	}
	for(var i=page.current;i<pages+1;i++){
		if(i==page.current){
			html+='<li class="PagingUlHover"><a  href="javascript:void(0);">'+i+'</a></li>';
		}else{
			html+='<li><a onclick="order.loadOrderList('+i+','+payType+');"  href="javascript:void(0);">'+i+'</a></li>';
		}
	}
	if(pages>page.current){
		html+='<li><a onclick="order.loadOrderList('+(page.current+1)+','+payType+');" href="javascript:void(0);">下一页</a></li>';
	}
	html+='<li><a current onclick="order.loadOrderList('+pages+','+payType+');" href="javascript:void(0);">尾页</a></li>';
	$(".PagingUl").html(html);
}