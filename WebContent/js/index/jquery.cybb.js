/** 
	他们说按钮切换2017-03-29
 */
;(function($){
	$(function(){
		$.cybb={
			menuTab:function(dom){
				$(dom).find(".menu-box").on("mouseover","li",function(){
					var n=$(this).index();
					if(!($(this).hasClass("on"))){
						$(this).addClass("on").siblings(".on").removeClass("on");
						$(dom).find(".info-box").fadeOut(300);
						$(dom).find(".info-box").eq(n).fadeIn(300);
					}
				});
			},
			menuChange:function(box,left,right){
				var $li=$(box).find("li"),
					n=$li.size(),
					m=0;
				$(left).on("click",function(){
					$li.eq(m).fadeOut(300);
					m<(n-1)?m++:m=0;
					$li.eq(m).fadeIn(300);
					return m;			
				});
				$(right).on("click",function(){
					$li.eq(m).fadeOut(300);
					m<1?m=(n-1):m--;
					$li.eq(m).fadeIn(300);
					return m;			
				});
			},
		}
	})
})(jQuery);


