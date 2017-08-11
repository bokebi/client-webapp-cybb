$(function(){
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
	customerCount($("#userid").val());
})

function queryQuestionData(pageNumber) {
	var userid   = $("#userid").val();
	var index   = $("#index").val();
	var url = dum.appName + "/ask/yhzx-yh-"+userid+"-"+index+".html?pagenumber="+pageNumber;
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

function askQuestionToUser(){
	var toUserContent = $('#toUserContent').val();
	var userid   = $("#userid").val();
	window.open(dum.appName +"/ask/addQuestion.html?cusid="+userid+"&content="+encodeURI(encodeURI(toUserContent)));
}

//用户问答信息统计
function customerCount(cusid){
	dum.common.ajax({
		type : "get",
		url : "/cusTomerInfo/getCustomerCountById/"+cusid+".api",
		dataType : "json",
		success : function(data) {
			if(data && data.values){
				$('#customercount #hds').text(data.values.answersNumber);
				$('#customercount #cns').text(data.values.adoptionNumber);
				$('#customercount #cnl').text(data.values.adoptionRate);
				$('#customercount #cfz').text(data.values.wealth);
				$('#customercount #bzrs').text(data.values.helpNumber);
				$('#customercount #sddz').text(data.values.praiseNumber);
			}
		}
	});
}

