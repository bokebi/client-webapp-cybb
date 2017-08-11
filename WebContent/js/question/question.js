/**
 * 问答js
 */
$(function() {
	
	//获取广告
	function getad(){
		dum.common.ajax({
			type : 'get',
			url : '/website/getAdByParam/'+dum.currentId+'.api',
			dataType : 'json',
			data:{identifier:'ask_right'},
			async : false,
			success : function(data) {
				if (data && data.values && data.values.attachment && data.values.attachment.fillFilePath) {
					var html = '<a href="'+data.values.url+'" class="model model-ad-a"><img alt="'+data.values.adTitle+'" src="'+data.values.attachment.fillFilePath+'"/></a>';
					$('#askad').html(html);
				}
			}
		});
	}
	
	getad();
	
	//热门文章切换
	$("#changeHotArticle").click(function(){
		var totalPage = Number($("#articleTotalPage").val());
		var currentPage = Number($("#articleCurrentPage").val());
		currentPage = currentPage + 1;
		if(currentPage > totalPage){
			currentPage = 1;
		}
		changeHotArticle(currentPage);
	});
	
	function changeHotArticle(currentPage){
		dum.common.ajax({
			type : "get",
			url : "/wz/changarticlelist/"+currentPage+"/"+2+".html",
			async : false,
			dataType : "json",
			success : function(data) {
				if (data) {
					$(".hotArticle_ul").html("");
					var content = '';
					$.each(data,function(index,item){
						content +='<li>';
						content +='<a target="_blank" href="'+dum.appName+'/wz/'+item.id+'.html">';
						var attachment=item.attachment;
						if(attachment){
							content +='<p><img src="'+attachment.fillFilePath+'" style="width:230px; height: 130px;"/></p>';
						}
						content +='<h5 class="mt5">'+item.articleTitle+'</h5>';
						if(item.articleDesc && item.articleDesc.length){
							if(item.articleDesc.length > 35){
								content +='<p class="loreDetail">'+item.articleDesc.substr(0,35)+'...</p>';
							}else{
								content +='<p class="loreDetail">'+item.articleDesc+'</p>';
							}
						}
						
						content +='</a></li>';
					})
					$(".hotArticle_ul").html(content);
					$("#articleCurrentPage").val(currentPage);
				}
			}
		});
	}
});