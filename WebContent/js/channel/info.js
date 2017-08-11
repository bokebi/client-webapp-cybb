$(function(){
	//信息收集第一步
	$('dl dd').click(function(){
		$(this).parent().find('dd').removeClass('whetherHover');
		$(this).addClass('whetherHover');
		var val = $(this).attr('value');
		$(this).parents('td').find('input').val(val);
	});
	$('#user_resache').submit(function(){
		if(!dum.verifiy('user_resache')){
			return false;
		}
	});
	
	//信息收集第二步
	$('#user_resache_2').submit(function(){
		var arguments = $(this).serialize(),flag = true,flags = [];
		var arrayA = arguments.split('&');
		$.each(arrayA,function(i,item){
			var val = item.split('=')[0];
			if(!val){
				flags.push(false);
			}
		});
		if(arrayA.length < 15){
			flag = false;
		}else{
			$.each(flags,function(i,item){
				item&&flag ? flag = true : flag = false;
			});
		}
		if(!flag){
			alert('您还没填写完哦')
		}
		return flag;
		/*if(!dum.verifiy('user_resache_2')){
			return false;
		}*/
	});
})