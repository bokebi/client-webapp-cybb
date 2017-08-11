$(function(){
	
	//content6点击radio变色
	$(".radi").click(function(){
		$(this).css("border","5px solid #07a6f2").siblings(".radi").css("border","5px solid #ccc");
	})
	
	//content6提交弹框
//	$(".btn").click(function(){
//		swal({
//				title : '操作成功!',
//				text : '您的申请已成功提交到后台，我们将在第一时间与您联系，请保持手机畅通。',
//				type : 'success',
//				animation : 'none'
//			});
//			
//		/*swal({
//				title : '操作失败',
//				text : '您的信息提交失败，请重新提交。',
//				type : 'error',
//				animation : 'none'
//			});*/
//	});
//	$("#validForm").validate();
	//content3滑过变色
	$(".cir1").hover(function(){
		$(this).css("background","#f5095b");
	},function(){
		$(this).css("background","#d6dee4");
	})
	$(".cir2").hover(function(){
		$(this).css("background","#ffa800");
	},function(){
		$(this).css("background","#d6dee4");
	})
	
	$(".cir3").hover(function(){
		$(this).css("background","#0fc32c");
	},function(){
		$(this).css("background","#d6dee4");
	})
	
	$(".cir4").hover(function(){
		$(this).css("background","#07a6f2");
	},function(){
		$(this).css("background","#d6dee4");
	})
	$(".cir5").hover(function(){
		$(this).css("background","#920783");
	},function(){
		$(this).css("background","#d6dee4");
	})
})
/**
 * 加盟商申请加盟
 */
function submitjoin(){
	var province=$("#province").val();
	if(province==null || typeof(province)=="undefined" || province==''){
		swal({
			title : '操作失败',
			text : '省市不能为空，请选择。',
			type : 'warning',
			animation : 'none'
		});
		return false;
	}
	var city=$("#city").val();
	if(city==null || typeof(city)=="undefined" || city==''){
		swal({
			title : '操作失败',
			text : '城市不能为空，请选择。',
			type : 'warning',
			animation : 'none'
		}); 
		return false;
	}
	var area=$("#area").val();
	if(area==null || typeof(area)=="undefined" || area==''){
		swal({
			title : '操作失败',
			text : '区域不能为空，请选择。',
			type : 'warning',
			animation : 'none'
		}); 
		return false;
	}
	var companyName=$("#companyName").val();
	if(companyName==null || typeof(companyName)=="undefined" || companyName==''){
		swal({
			title : '操作失败',
			text : '请填写公司全称！',
			type : 'warning',
			animation : 'none'
		}); 
		return false;
	}
	var userName=$("#userName").val();
	if(userName==null || typeof(userName)=="undefined" || userName==''){
		swal({
			title : '操作失败',
			text : '请填写您的姓名！',
			type : 'warning',
			animation : 'none'
		}); 
		return false;
	}
	var phone =$("#phone").val();
	if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){ 
		swal({
			title : '操作失败',
			text : '请按要求填写电话！',
			type : 'warning',
			animation : 'none'
		});  
		return false;
		}
//	var email=$("#email").val();
//	if(!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email))){ 
//		swal({
//			title : '操作失败',
//			text : '请按要求填写正确的电子邮箱！',
//			type : 'warning',
//			animation : 'none'
//		});  
//		return false;
//		}
//	var address=$("#adress").val();
//	if(address==null || typeof(address)=="undefined" || address==''){
//		swal({
//			title : '操作失败',
//			text : '请填写您的公司地址！',
//			type : 'warning',
//			animation : 'none'
//		}); 
//		return false;
//	}
//	var mainBusiness=$("#mainBusiness").val();
//	if(mainBusiness==null || typeof(mainBusiness)=="undefined" || mainBusiness==''){
//		swal({
//			title : '操作失败',
//			text : '请输入您公司的主营业务！',
//			type : 'warning',
//			animation : 'none'
//		}); 
//		return false;
//	}
//	var advantage=$("#advantage").val();
//	if(advantage==null || typeof(advantage)=="undefined" || advantage==''){
//		swal({
//			title : '操作失败',
//			text : '请输入您公司的优势！',
//			type : 'warning',
//			animation : 'none'
//		}); 
//		return false;
//	}
	var params = $("#validForm").serialize();
	$.ajax({
		url : "/joinInfoSave.jspx",
		type : "post",
		data : params,
		success : function(result) {
			if (result == "success") {
				swal({
					title : '操作成功!',
					text : '您的申请已成功提交到后台，我们将在第一时间与您联系，请保持手机畅通。',
					type : 'success',
					animation : 'none'
				},function (isConfirm) {  
                    if (isConfirm) {  
                    	$("#validForm")[0].reset();
                    	$(".radi1").css("border","5px solid #07a6f2").siblings(".radi").css("border","5px solid #ccc");
                    }
				});
			} else {
				swal({
					title : '操作失败',
					text : '您的信息提交失败，请重新提交。',
					type : 'error',
					animation : 'none'
				});
			}
		},
		error : function() {
			alert("error");
		}
	});
}
