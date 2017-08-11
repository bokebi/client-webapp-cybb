$(function(){
	userClient.getMinHight();
	processIndex.flowCode=$("#flowCode").val();
	processIndex.loadList(1);
	$(".clinetSearch").click(function(){
		processIndex.loadList(1);
	})
	document.onkeydown=function(e){  
		  if(e = e || window.event);
		  if(e.keyCode == 13){
			  processIndex.loadList(1);
		   }
	}
})

var processIndex={
	flowCode:'',
	loadList:function(current){
		var data={page:current};
		var companyName=$(".clinetSearchTxt").val();
		if(companyName&&companyName.length>0){
			data.companyName=companyName;
		}
		if(this.flowCode&&this.flowCode.length>0){
			data.flowCode=this.flowCode;
		}
		dum.common.ajax({
			type : "post",
			url : "/orderProcess/serviceProcessList.html",
			data:data,
			dataType : "json",
			success : function(data) 
			{
				$("#processBody").html(processIndex.getListHtml(data));
				var rows=10;
				var totalCount=data.totalCount;
				var page=new PageObj(totalCount,rows,current);
				$(".PagingUl").html(processIndex.pageHtml(page));
			}
		});
	},
	getListHtml:function(data){
		var html="";
		if(data&&data.result){
			var dataList=data.result;
			if(null == dataList || dataList.length == 0){
				return '<tr><td colspan="6">暂无信息</td></tr>';
			}
			for(var i=0;i<dataList.length;i++)
			{
				html+="<tr>";
				html+="		<td>";
				html+="			<div class='companyName'>"+(dataList[i].companyName?dataList[i].companyName:'')+"</div>";
				html+="		</td>";
				html+="		<td><div>"+dataList[i].flowName+"</div></td>";
				html+="		<td>";
				if(dataList[i].flowCode=='ZCGS'){
					html+="无";
				}else
				{
					html+="         <div>"+(dataList[i].serviceStartTime?dataList[i].serviceStartTime:'未开启')+"<br/>"+(dataList[i].serviceEndTime?dataList[i].serviceEndTime:'未开启')+"</div>";
				}
				html+="     </td>";
				html+="     <td>";
				if(dataList[i].flowCode=='ZCGS'){
					html+="		注册成功为止";
				}else{
					html+="		<div>"+dataList[i].serviceCount+"</div>";
				}
				html+="     </td>";
				
				if(dataList[i].flowCode=='DLJZ'){
					html+="		<td><div class='renewals'>"+dataList[i].useMonth+"<span onclick='serviceRenew(\""+dataList[i].companyId+"\",\""+dataList[i].companyNature+"\",\""+dataList[i].companyAreaCode+"\",\""+dataList[i].companyName+"\")' class='renewals_span'>续费</span></div></td>";
					html+="	<td><div class='viewDiv'><a href='"+dum.appName+"/orderProcess/dljzProcessIndex.html?id="+dataList[i].id+"'>查看详情</a></div></td>";
				}else{
					html+="		<td><div class='renewals'>"+dataList[i].useMonth+"</div></td>";
					html+="	<td><div class='viewDiv'><a href='"+dum.appName+"/orderProcess/zcgsProcessIndex.html?id="+dataList[i].id+"'>查看详情</a></div></td>";
				}
				html+="</tr>";
			}
		}
		return html;
	},
	getHead:function(){
		var html="";
		html+="<tr>";
		html+="		<th width='30%'>公司名称</th>";
		html+="		<th width='15%'>所选服务</th>";
		html+="		<th width='15%'>服务起止时间</th>";
		html+="		<th width='10%'>服务期限</th>";
		html+="		<th width='10%'>已做期限</th>";
		html+="		<th width='20%'>服务进程</th>";
		html+="</tr>";
		return html;
	},
	pageObj:{},
	pageHtml:function(page){
		var html='';
		this.pageObj=page;
		var pages=page.pages();
		if(pages<=1){
			return html;
		}
		html+='<li><a onclick="processIndex.loadList(1);" href="javascript:void(0);">首页</a></li>';
		if(page.current>1){
			html+='<li><a onclick="processIndex.loadList('+(page.current-1)+');" href="javascript:void(0);">上一页</a></li>';
		}
		for(var i=page.current;i<pages+1;i++){
			if(i==page.current){
				html+='<li class="PagingUlHover"><a  href="javascript:void(0);">'+i+'</a></li>';
			}else{
				html+='<li><a onclick="processIndex.loadList('+i+');"  href="javascript:void(0);">'+i+'</a></li>';
			}
		}
		if(pages>page.current){
			html+='<li><a onclick="processIndex.loadList('+(page.current+1)+');" href="javascript:void(0);">下一页</a></li>';
		}
		html+='<li><a onclick="processIndex.loadList('+pages+');" href="javascript:void(0);">尾页</a></li>';
		return html;
	},
}
function PageObj(totalCount,rows,current){
	this.totalCount=totalCount;
	this.rows=rows;
	this.current=current;
}
PageObj.prototype.pages=function(){
	return this.totalCount%this.rows===0?this.totalCount/this.rows:parseInt(this.totalCount/this.rows)+1;
}