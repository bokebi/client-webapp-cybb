$(function(){
	//findHouseCount();
	var solveTotalPages = parseInt($("#solveTotalPages").val());
	var currentPage = parseInt($("#currentPage").val());
	$(".solvePageCode").createPage({
		pageCount:solveTotalPages,
		current:currentPage,
		backFn:function(p){
			queryQuestionData(p);
		}
	});
	addClass(currentPage,2);
})

function queryQuestionData(pageNumber) {
	var typeCode = $("#typeCode").val();
	var type     = $("#type").val();
	var likeSearch = $('#likeSearch').val();
	var url = dum.appName + "/ask/wtk/"+typeCode+"/"+type;
	if(pageNumber!=1){
		url += "/page_"+pageNumber+".html";
	}else{
		url += ".html";
	}
	if($.trim(likeSearch) != ''){
		if(pageNumber!=1){
			url +="?likeContent="+likeSearch;
		}else{
			url =dum.appName + "/ask/wtk/"+typeCode+"/"+type+".html?likeContent="+likeSearch;
		}
	}
	
	window.location.href = url;
}

function citySelectChange() {
	var typeCode = $("#typeCode").val();
	var type     = $("#type").val();
	var url = dum.appName + "/ask/"+typeCode+"-"+type+"/";
	window.location.href = url;
}

function addClass(currentPage,isSolve){
	if(isSolve == 2){
		var solvePageLinks = $(".solvePageCode span");
		$.each(solvePageLinks,function(index,value){
			if(parseInt($(value).text()) == currentPage){
				$(this).addClass("hoverPage")
			}
		});
		var notSolvePageLinks = $(".notSolvePageCode span");
		$.each(notSolvePageLinks,function(index,value){
			if(parseInt($(value).text()) == currentPage){
				$(this).addClass("hoverPage")
			}
		});
	}else if(isSolve == 1){
		var notSolvePageLinks = $(".notSolvePageCode span");
		$.each(notSolvePageLinks,function(index,value){
			if(parseInt($(value).text()) == currentPage){
				$(this).addClass("hoverPage")
			}
		});
	}else if(isSolve == 0){
		var solvePageLinks = $(".solvePageCode span");
		$.each(solvePageLinks,function(index,value){
			if(parseInt($(value).text()) == currentPage){
				$(this).addClass("hoverPage")
			}
		});
	}
}

function findHouseCount(){
	dum.common.ajax({
		type : "post",
		url : "/ask/findQuestionCount.html",
		dataType : "json",
		success : function(data) {
			if(data){
				$("#houseSolveCount").text(data.solveCount+"个");
				$("#houseNotSolveCount").text(data.notSolveCount+"个");
				$("#houseAllQuestionCount").text(data.allQuestionCount+"个");
			}
		}
	});
}

function likeSearch() {
	var typeCode = $("#typeCode").val();
	var type     = $("#type").val();
	var likeContent = $("#likeSearch").val();
	var url = dum.appName + "/ask/wtk/"+typeCode+"/"+type+".html";
	if($.trim(likeContent) != ''){
		url = dum.appName + "/ask/wtk/"+typeCode+"/"+type+".html?likeContent="+likeContent;
	}
	
	window.location.href = url;
}
