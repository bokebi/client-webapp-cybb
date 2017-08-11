$(function(){
	userClient.init();
});
var userClient = {
	init:function(){
		this.eventLinster();
//		$('#myAccount').click();
	},
	eventLinster:function(){
		//统一添加页面事件监听
		
		//左侧导航点击事件
		$('#nav_left li a').click(function(){
//			if($(this).attr('href') != '#'){
				$('#nav_left li').removeClass('active');
				$(this).parent().addClass('active');
//				$('#content').load($(this).attr('href'));
//			}
		});	
	},
	getMinHight:function(){
		//检查最小高度方法
		var nav_height = $('#nav_left').height(),content_height = $('#content').height();
		if(nav_height > content_height){
			$('#content').css({'min-height':nav_height});
		}else{
			$('#nav_left').css({'border-right':'none'});
			$('#content').css({'border-left':'1px solid #ccc'});
		}
	}
};
