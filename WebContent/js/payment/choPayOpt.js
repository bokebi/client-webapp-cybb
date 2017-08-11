$(function() {
	/*$("#payNext").click(function() {
		var paymentType=$("input[name='paymentType']:checked").val();
		if(undefined==paymentType){
			$("#error_span").html("请选择支付方式！");
			return;
		}else{
			var paymentType=$("input[name='paymentType']:checked").val();
			if(paymentType==2){
				$('#loadPayForm').submit();
			}else if(paymentType==4){
				$('#payfrom').attr("action",dum.appName+"/ordPaymentOrder/payNext.html");
				$('#payfrom').submit();
			}
		}
	});*/
});

function payNext(){
	var paymentType=$("input[name='paymentType']:checked").val();
	if(undefined==paymentType){
		$("#error_span").html("请选择支付方式！");
		return;
	}else{
		var paymentType=$("input[name='paymentType']:checked").val();
		if(paymentType==2){
			$('#loadPayForm').submit();
		}else if(paymentType==4){
			$('#payfrom').attr("action",dum.appName+"/ordPaymentOrder/payNext.html");
			$('#payfrom').submit();
		}
	}
}

function loadPaytype(that){
	var paymentType=$("input[name='paymentType']:checked").val();
	if(paymentType==2){
		var data={paymentType:paymentType,id:$("#ordPaymentOrderId").val()};
		var url=$(that).attr("requestUrl");
		dum.common.ajax({
			type : "post",
			url : url,
			data :data,
			dataType : "json",
			beforeSend: function () {  
				$(".pay_Next").attr("style","opacity: 0.2");    
				$(".pay_Next").removeAttr("onclick");    
            },
			success : function(data) {
				$(".pay_Next").attr("style","opacity: 1");   
				$(".pay_Next").attr("onclick","payNext();");  
				var status=data["executeStatus"];
				if('0'==status){
					var html='';
					var params=data["values"];
					for(var key in params){
						html+='<input name="'+key+'" value="'+params[key]+'" />';
					}
					$("#loadPayForm").html(html);
				}
			}
		});
	}
}