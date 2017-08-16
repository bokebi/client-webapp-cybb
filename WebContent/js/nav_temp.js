$(function(){
		//导航
	 	$(".all_services").mouseover(function(){
			$(".childNav").show();
			$(".childNavDl").show();
			/* $(".allBotton").removeClass('allBotton').addClass('allTop'); */
		});
		
		$('.childNavDl').mouseleave(function(){
			$(this).hide();
			if(location.pathname == "/"){
				$(".childNav").show();
				$(".childNavDl").show();
			}
		});
		
		$(".childNavDl dd").mouseover(function(){
			$(".childNavDl dd").removeClass('childNavHover');
			$(this).addClass('childNavHover');
			$(".clildNavDiv").removeClass('clildNavDivHover');
			var i = $(this).index();
			//鼠标移入，先隐藏所有二级菜单，当前二级菜单显示
			$(".childNavDl dd > .clildNavDiv").hide();
			$($(".clildNavDiv")[i]).show();
			$($(".clildNavDiv")[i]).addClass('clildNavDivHover')
		});
		$(".childNav").mouseleave(function(){
			$(".clildNavDiv").hide();
			$(".childNavDl dd").removeClass('childNavHover');
			if(location.pathname == "/") return;
			$(".childNav").hide();
			$(".childNavDl").hide();
		});
		$(".all_servicesLi").mouseleave(function(){
			if(location.pathname == "/") return;
			$(".childNavDl").hide();
			$(".clildNavDiv").hide();
		}); 
		
		//新增导航滚动固定2017-03-28
		$(window).scroll(function(){
			var scrollTop = $(document).scrollTop();
			if(scrollTop >= 112){
				$(".navTop").addClass("fixednav"); 
				$(".childNav").hide();
				$('.childNavDl').mouseleave(function(){
					$(this).hide();
					if(location.pathname == "/"){
						$(".childNav").hide();
						$(".childNavDl").hide();
					}
				});
				$(".all_servicesLi").mouseleave(function(){
					//if(location.pathname == "/") return;
					$(".childNavDl").hide();
					$(".clildNavDiv").hide();
				}); 
			}else if(scrollTop < 112){
				$(".navTop").removeClass("fixednav"); 
				$(".childNav").show();
				if(location.pathname == "/"){
					$(".childNavDl").show();
				}
				$('.childNavDl').mouseleave(function(){
					$(this).hide();
					if(location.pathname == "/"){
						$(".childNav").show();
						$(".childNavDl").show();
					}
				});
				$(".all_servicesLi").mouseleave(function(){
					if(location.pathname == "/"){
						$(".childNavDl").show();
					}
				}); 
			}
		});
		
		//二维码显示
		$(".rightRwmShow").mouseover(function(){
			$(".rightRwmIcon").show();
		});
		$(".rightRwmShow").mouseleave(function(){
			$(".rightRwmIcon").hide();
		});
		/* 滚动 */
		$(document).scroll(function(){
			var scrollTop = $(window).scrollTop();
			if(scrollTop <= 0){
				$('.advisory_list .advisory_listBottom').hide();
			}else{
				$('.advisory_list .advisory_listBottom').show();
			}
		});
		$(".advisory_listBottom").click(function () {
	        var speed=200;//滑动的速度
	        $('body,html').animate({ scrollTop: 0 }, speed);
	        return false;
	 	});
		
		$(".gzewm").mouseover(function(){
			$(".ewmtop").show();
		});
		$(".gzewm").mouseleave(function(){
			$(".ewmtop").hide();
		});
		$(".js_localcity").mouseover(function(){
			$(".urbanAreas").show();
		});
		$(".urbanAreas").mouseleave(function(){
			$(".urbanAreas").hide();
		});
		
	})