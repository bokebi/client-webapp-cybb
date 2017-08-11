$(function(){
	$("#dgdPageDiv a").click(function(){
		var currentPage = parseInt($("#dgdPageDiv a[class='hoverPage']").attr("pageIndex"));
		var _thisPage = $(this).attr("pageIndex");
		if(_thisPage=='up'){
			if(currentPage != 1){
				$("#dgdConstitution"+currentPage).hide();
				currentPage = currentPage -1;
				$("#dgdConstitution"+currentPage).show();
				$("#dgdPageDiv a").removeAttr("class");
				$('#dgdPageDiv a[pageIndex="'+currentPage+'"]').attr("class","hoverPage");
			}
		}else if(_thisPage=='next'){
			if(currentPage != 4){
				$("#dgdConstitution"+currentPage).hide();
				currentPage = currentPage + 1;
				$("#dgdConstitution"+currentPage).show();
				$("#dgdPageDiv a").removeAttr("class");
				$('#dgdPageDiv a[pageIndex="'+currentPage+'"]').attr("class","hoverPage");
			}
		}else{
			var jupPage = parseInt(_thisPage);
			$("#dgdConstitution"+currentPage).hide();
			$("#dgdConstitution"+jupPage).show();
			$("#dgdPageDiv a").removeAttr("class");
			$('#dgdPageDiv a[pageIndex="'+jupPage+'"]').attr("class","hoverPage");
		}
	});
});