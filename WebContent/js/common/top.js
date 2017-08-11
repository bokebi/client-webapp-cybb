$(function(){
	/*首页导航判断当前所在位置*/
	var href = window.location.href.replace('#maps','');
	var arr = href.split('/');
	var len=arr.length-2;
	
	$('ul.nav a').removeClass('actives');
	if(arr[len]=='ymi') {
		$('#js_ymxy').addClass('actives');
	} else  if(arr[len]=='hotInformation'){
		$('#js_newsList').addClass('actives');
	} else if(arr[len]=='newsList'||arr[len]=='about'){
		$('#js_'+arr[len]).addClass('actives');
	}else if(window.location.href.split('/')[3]=="#maps"){
		$("#js_creater").addClass("actives");
	}else {
		$('.index').addClass('actives');
	}
	/*页头滚动后固定在顶部*/
	$(document).on('scroll',function(){
		var _top = $(document).scrollTop();
		var searchH = $('.top .w_1200').height();
		var topH = $('#main-nav').height();
		if(_top > searchH){
			$('#main-nav').css({'position':'fixed','top':'0'});
			topH = searchH;
			$('.top').next().css({'margin-top':topH});
		}else{
			$('#main-nav').attr('style','');
			$('.top').next().attr('style','');
		}
		if(_top == 0){
			$('.suspendNav .tops').css({'display':'none'});
		}else{
			$('.suspendNav .tops').css({'display':'block'});
		}
	});
	
	//默认触发滚动事件
	$(document).scroll();
	
	$(".box-shadow-bottom li").click(function() {
		if($(".box-shadow-bottom li").index($(this)) == 3) {
			$(".box-shadow-bottom li").find("a").removeClass("actives");
			$(this).find("a").addClass("actives");
		}
	});
	
	$("#topSearchBtn").click(function(){
		var topSearchValue = $("input[name='topSearch']").val();
		if($.trim(topSearchValue) != ""){
			window.location.href = dum.appName +'/cszt.html'+'?searchValue='+ $.trim(topSearchValue);
		}
	});
	
	$(".searchTop").keydown(function() {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('#topSearchBtn').click();
        }
    });
	
	
})
