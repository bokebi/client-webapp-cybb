$(function(){
	//左侧搜索文章
	$(".searchArticle").click(function(){
		var searchVal = $(".articleSearchTxt").val();
		if(searchVal && $.trim(searchVal) != ""){
			window.open(dum.appName +'/cszt.html'+'?searchValue='+ $.trim(searchVal));
		}
	});
	
	$(".articleSearchTxt").keydown(function(e) {
		if (e.keyCode == 13) {
			var searchVal = $(".articleSearchTxt").val();
			if(searchVal && $.trim(searchVal) != ""){
				window.open(dum.appName +'/cszt.html'+'?searchValue='+ $.trim(searchVal));
			}
		}
	});
	
	//保存快速注册电话号码
	$(".inquireMobileBtn").click(function(){
		$('.verify').hide();
		var inquireMobile = $(".inquireMobile").val();
		if(dum.verifiy("inquireMobileDiv")){
			dum.common.ajax({
				type : "post",
				url : "/home/saveQueryInfo.html",
				data : {"customerMobile":inquireMobile},
				dataType : "json",
				success : function(data) {
					if(data.result == '0'){
						$(".inquireMobile").val("");
					}
				}
			});
		}else{
			$('.verify').show();
		}
	});
	$('.verifyClose').click(function(){
		$('.verify').hide();
	});
})