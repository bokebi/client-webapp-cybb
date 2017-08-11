var renewals={
	loadModel:function(productId,serviceCompanyId){
		dum.common.ajax({
			type : "post",
			url : "/productModel/loadModel.html",
			data : {productId:productId},
			dataType : "json",
			success : function(data) 
			{
				var html='';
				if(data&&data.length>0){
					html+='<form id="renewalsForm" action="'+dum.appName+'/productModel/renewals.html">';
					html+=' <table class="renewalsBoxTab">';
					html+=' <input type="hidden" value="'+serviceCompanyId+'" name="serviceCompanyId" >';
					for(var i=0;i<data.length;i++)
					{
						html+='<tr>';
						html+='<td><label><input name="modelId" type="radio" value="'+data[i].id+'" />'+data[i].modelName+'</label>&nbsp;('+data[i].productSell+'元)</td>';
						html+='</tr>';
					}
					html+='<tr>';
					html+='<td align="center"><input type="buttom" value="提交" class="subInquire" /><input type="button" class="btnClose" onclick=$(".renewalsBoxDiv").hide() value="关闭" /></td>';
					html+='</tr>';
					html+=' </table>';
					html+='</form>';
				}
				$(".renewalsContent").html(html);
				$(".renewalsBoxDiv").show();
				$(".subInquire").click(renewals.submitForm);
			}
		});
	},
	submitForm:function(){
		var modelId=$('input[name="modelId"]:checked').val();
		if(modelId){
			$("#renewalsForm").submit();
		}
	}
}