$(function(){
	var current = 'hove',_con = $('#js_detail');
	$('.content-service').hover(function(){
		$(this).find('.mark').hide();
		$(this).removeClass('ots');
	},function(){
		$(this).find('.mark').show();
		$(this).addClass('ots');
	});
	$('.banner_nav .w_1200').on('mouseleave',function(event){
		_con.hide();
		$('.hover-nav li').removeClass(current);
	});
	$('.hover-nav li').on('mouseenter',function(){
		var liId = $(this).attr('id');
		$('.hover-nav li').removeClass(current);
		$(this).addClass(current);
		_con.show(100);
		_con.find($('#js_'+liId)).show().siblings("div:visible").hide();
	});
	
	$("#js_gsbg td span").click(function() {
		$("#js_gsbg td span").removeClass("chosed").removeClass("unchosed").addClass("unable");
		$(this).addClass("chosed").removeClass("unable");
	});
	$("#js_gsbg td span").hover(function(){
		if(!$(this).hasClass("chosed")) {
			$(this).addClass("unchosed").removeClass("unable");
		}
	}, function() {
		if(!$(this).hasClass("chosed")) {
			$(this).addClass("unable").removeClass("unchosed");
		}
	});
	//首页banner切换$
	var _banner = $('.banner-small li'),banner_account = _banner.length,tms;
	function bannerChange (bans){
		if(bans == banner_account){
			bans = 0;
		}
		_banner.each(function(index,li){
			$(li).css({'left':(index-bans)*1920});
			var img = $(_banner[index-bans]).attr('imgUrl');
			$('.banner_nav').css({'background':'url('+img+') no-repeat center 0 transparent'});
		});
		tms = setTimeout(function(banners){
			bannerChange(bans+1);
		},6000);
	}
	bannerChange(0);
	_banner.mouseenter(function(){
		clearTimeout(tms);
	});
	_banner.mouseleave(function(){
		bannerChange(0)
	});
});
