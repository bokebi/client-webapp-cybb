$(function(page){
	var totalPage = parseInt($("#totalPage").val());
	var pageNo = parseInt($("#pageNo").val());
	$(".articleResultPage").createPage({
		pageCount:totalPage,
		current:pageNo,
		backFn:function(p){
			addClass(pageNo);
			findPageData(p);
		}
	});
	addClass(pageNo);
	getad();
});

//获取广告 
function getad(){
	dum.common.ajax({
		type : 'get',
		url : '/website/getAdByParam/'+dum.currentId+'.api',
		dataType : 'json',
		data:{identifier:'article_right'},
		async : false,
		success : function(data) {
			if (data && data.values && data.values.attachment && data.values.attachment.fillFilePath) {
				var html = "<a href=\""+data.values.url+"\"><img title=\""+data.values.adTitle+"\" src=\""+data.values.attachment.fillFilePath+"\" style=\"width:260px;\"/></a>"
				$('#getad').html(html);
			}
		}
	});
}

function findPageData(pageNumber){
	var categoryCode = $("#categoryCode").val();
	var keyCode = $("#keyCode").val();
	var searchValue = $("#searchValue").val();
	var url = '';
	if(searchValue){
		url = dum.appName + "/wz/all/page_"+pageNumber+".html?searchValue="+ $.trim(searchValue);
	}else{
		if(categoryCode){
			url = dum.appName + "/wz/type/"+categoryCode.toLocaleLowerCase()+"/page_"+pageNumber+".html";
		}else if(keyCode){
			url = dum.appName + "/wz/key/"+keyCode.toLocaleLowerCase()+"/page_"+pageNumber+".html";
		}else{
			url = dum.appName + "/wz/all/page_"+pageNumber+".html";
		}
		
	}
	window.location.href = url;
}

function addClass(currentPage) {
	var solveListPageLinks = $(".articleResultPage span");
	$.each(solveListPageLinks, function(index, value) {
		if (parseInt($(value).text()) == currentPage) {
			$(this).addClass("hoverPage")
		}
	});
}

