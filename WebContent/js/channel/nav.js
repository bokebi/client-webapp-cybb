/**
* 导航相关,以及右侧联系我们的js
**/
$(function(){
	nav.init();
});

var nav = {
	init:function(){
		var that = this;
		$('.nav_main').on('mouseenter','#allServices',function(){
			$('#nav_level').fadeIn(200);
		});
		$('.nav_main').on('mouseleave','#allServices',function(){
			$('#nav_level').fadeOut(200);
		});
	
		$(".searchTxt1").keydown(function(e) {
			if (e.keyCode == 13) {
				that.searchAricle($(this).val());
			}
		});
		$(".articleKeys li a").click(function(){
			that.searchAricle($(this).text());
		});
		
		//向上滚动
		$('.last,.last_p').click(function(){
			that.scrollTop();
		});
		//登陆后我的账户
		$('.nav_main').on('mouseenter','#loginstatus',function(){
			$(this).addClass('hovered white');
			$('.iconDown').css({backgroundPosition: '-156px -310px'});
		});
		$('.nav_main').on('mouseleave','#loginstatus',function(){
			$(this).removeClass('hovered white');
			$('.iconDown').css({backgroundPosition: '-122px -311px'});
		});
		$('.pointers').mouseover(function(){
			$(this).find('img').show();
		});
		$('.pointers').mouseleave(function(){
			$(this).find('img').hide();
		});
		//滚动事件
		$(document).scroll(function(){
			var scrollTop = $(window).scrollTop();
			if(scrollTop <= 0){
				$('.rightbox .last_p').hide();
				$('.min-rightbox .last').hide();
			}else{
				$('.rightbox .last_p').show();
				$('.min-rightbox .last').show();
			}
		});
		//hover
		$('.top .w_95').mouseenter(function(){
			$(this).parent().addClass('hovs');
			$('.top .w_230').show();
		});
		$('.top .p_absolute').mouseleave(function(){
			$(this).removeClass('hovs');
			$('.top .w_230').hide();
		});
		$('.top .w_230 span').click(function(){
			$(this).siblings().removeClass('checked');
			$(this).addClass('checked');
			$('.top .js_localcity').text($(this).text());
			$(this).parent().hide();
			
		});
		/*
		//判断当前的位置
		var nav = $('.nav_main ul>li').find('a');
		var href = window.location.href;
		var appname = dum.appName;
		var len = appname.length;
		var index = href.indexOf(appname);
		var hf = href.substr(index);
		nav.removeClass('hover');
		$.each(nav,function(index,item){
			if(hf == $(item).attr('href')){
				if($(item).parent().hasClass('fl')){
					if(!($(item).text() == '小规模纳税人')){
						//$(item).parents('#nav_level').parent().children('a').addClass('hover');
					}
				}else{
					//$(item).addClass('hover');
				}
			}
		});*/
	},
	searchAricle:function(searchVal){
		if(searchVal && $.trim(searchVal) != ""){
			window.open(dum.appName +'/wz/all.html'+'?searchValue='+ $.trim(searchVal));
		}
	},
	min : function(){
		var obj = arguments[0],parent = obj.parent(),min = parent.next();
		parent.addClass('rightboxMin');
		parent.animate({right:'-17px',top:'21%',opacity:"0"},500);
		parent.next().show(1000);
		window.setTimeout(function(){
			parent.css({'display':'none'});
		},1000);
		min.css({'opactiy':'1'});
		parent.next().show(1000);
	},
	max : function(){
		var obj = arguments[0];
		obj.parents('.min-rightbox').hide();
		obj.parents('.min-rightbox').prev().removeClass('rightboxMin').css({opacity:'1',right:'15px',top:'50%','margin-top':'-180px'}).show();
	},
	//滚动到顶部
	scrollTop:function(){
		$('html,body').animate({scrollTop:'0'},300);
	},
};
