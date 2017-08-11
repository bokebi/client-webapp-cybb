var thisForm; 
$(function(){
	userClient.getMinHight();
	$(".defineTax").click(function(){
		thisForm=this;
		var beforHas =$(".reportsUl .reportsHover").next();
		if(beforHas&&beforHas.length>0){
			checkCustomer(gsbg.submit);
		}else{
			$('.Infoprompt').show();
		}
	});
	$('.Infoprompt .subSaveA1').click(function() {
		$("#serviceStatus").val('1');
		$('.Infoprompt').hide();
		checkCustomer(gsbg.submit);
	});
	$('.Infoprompt .subSaveA2').click(function() {
		$('.Infoprompt').hide();
		checkCustomer(gsbg.submit);
	});
	$('.Infoprompt p.close').click(function() {
		$('.Infoprompt').hide();
	});
	
	//增资扩股 股权变更
	$("#zckgbgBefor").on("click",".addPartner",function(){
		var html='';
		html+=gsbg.shareholderHtml({},'#zckgbgBefor','shareholderList');
		$("#zckgbgBefor").append(html);
		resetName("#zckgbgBefor");
	});
	$("#zckgbgBefor").on("click",".cancelPartner",function(){
		var js_gd=$(this).parents(".shareholderList");
		var preObj=js_gd.prev();
		js_gd.remove();
		preObj.find(".addPartner").show();
		resetName("#zckgbgBefor");
	});
	$("#zckgbgAfter").on("click",".addPartner",function(){
		var html='';
		html+=gsbg.shareholderHtml({},'#zckgbgAfter','ShareholderChangeList');
		$("#zckgbgAfter").append(html);
		resetName("#zckgbgAfter");
	});
	$("#zckgbgAfter").on("click",".cancelPartner",function(){
		var js_gd=$(this).parents(".shareholderList");
		var preObj=js_gd.prev();
		js_gd.remove();
		preObj.find(".addPartner").show();
		resetName("#zckgbgAfter");
	});
	
})
function resetName(id){
		var reCat = /\d+/;
		$(id).find(".shareholderList").each(function(i){
			$(this).find(":input").each(function(j){
				var name=$(this).attr("name");
				name=name.replace(reCat,i);
				$(this).attr("name",name);
			})
		})
		
}
function selScopeName(obj) {
	var option = $(obj).find("option:selected");
	$(obj).parents(".js_gd").find(".scopeTarea").val(option.attr("desc"));
}
var gsbg={
	loadData:function(businessCode){ //公司名称变更  GSBG_001
		var ordServiceId = $('#ordServiceId').val();
		var data={ordServiceId:ordServiceId,businessCode:businessCode};
		$.ajax({
			type:'post',
			url:dum.appName+'/perfect/gsbgData.html',
			data:data,
			dataType:'json',
			async:false,
			success:function(data){
				if(data){
					$("#serviceProductId").val(data.ordService.serviceProductId);
					gsbg.jiexiData(data,businessCode);//解析数据
				}
			}
		});
	},submit : function() {
		var form=$(thisForm).parents("form");
		var gsbgForm=$("#gsbgForm");
		var data=form.serialize()+"&"+gsbgForm.serialize();
		$.ajax({
			type:'post',
			url:dum.appName+'/perfect/saveGsbgPerfect.html',
			data:data,
			dataType:'json',
			success:function(data){
				if(data){
					var reportsHover =$(".reportsUl .reportsHover").next();
					if(reportsHover&&reportsHover.length>0){
						$('#ordServiceCompanyId').val(data.id);
						$("#cusCompanyId").val(data.companyId);
						reportsHover.click();
					}else{
						window.location = dum.appName + "/ordService/index.html?leftNav=myService";
					}
				}
			}
		});
	},
	jiexiData:function(data,businessCode){
			if(data.cusCompany){
				var cusCompany=data.cusCompany;
				$("#cusCompanyId").val(cusCompany.id);
				$("#companyName").val(cusCompany.companyName);
				if(businessCode=='GSBG_001'){
					
				}else if(businessCode=='GSBG_003')
				{
					$("#scopeName").val(cusCompany.scopeName);
					$("#scopeDesc").val(cusCompany.scopeDesc);
				}else if(businessCode=='GSBG_004')
				{
					$("#areaId").setArea({"areaId":cusCompany.areaId});
					$("#companyAddress").val(cusCompany.companyAddress);
				}
			}
			if(data.ordServiceCompany){
				$("#serviceStatus").val(data.ordServiceCompany.serviceStatus);
				$('#ordServiceCompanyId').val(data.ordServiceCompany.id);
			}
			if(data.ordPerfectChange){
				$("#ordPerfectChangeId").val(data.ordPerfectChange.id);
				if(businessCode=='GSBG_001')
				{
					$("#newCompanyName").val(data.ordPerfectChange.newName);
				}else if(businessCode=='GSBG_003')
				{
					$("#newScopeName").val(data.ordPerfectChange.newScopeName);
					$("#newScopeDesc").val(data.ordPerfectChange.newScopeDesc);
				}else if(businessCode=='GSBG_004')
				{
					$("#newAreaId").setArea({"areaId":data.ordPerfectChange.newAreaId});
					$("#newAddress").val(data.ordPerfectChange.newAddress);
				}
			}
			if(businessCode=='GSBG_018'||businessCode=='GSBG_006') 
			{
				var cusCompanyLegalperson=data.cusCompanyLegalperson;
				var companyLegalperson;
				var ordPerfectChange=data.ordPerfectChange;
				if(ordPerfectChange&&ordPerfectChange.companyLegalperson)
				{
					companyLegalperson= ordPerfectChange.companyLegalperson;
				}
				var shareholderList=data.shareholderList;
				var bHtml='',aHtml='';
				var shareholderChangeList=data.shareholderChangeList;
				if(businessCode=='GSBG_018'){ //增资扩股 添加注册资金
					 bHtml=gsbg.zczjHtml(cusCompany,ordPerfectChange,'0')+gsbg.companyLegalpersonHtml(cusCompanyLegalperson,'0')+gsbg.shareholderHtml(shareholderList,'#zckgbgBefor','shareholderList');
					 aHtml=gsbg.zczjHtml(cusCompany,ordPerfectChange,'1')+gsbg.companyLegalpersonHtml(companyLegalperson,'1')+gsbg.shareholderHtml(shareholderChangeList,'#zckgbgAfter','ShareholderChangeList');
				}else{
					 bHtml=gsbg.companyLegalpersonHtml(cusCompanyLegalperson,'0')+gsbg.shareholderHtml(shareholderList,'#zckgbgBefor','shareholderList');
					 aHtml=gsbg.companyLegalpersonHtml(companyLegalperson,'1')+gsbg.shareholderHtml(shareholderChangeList,'#zckgbgAfter','ShareholderChangeList');
				}
				$("#zckgbgBefor").html(bHtml);
				$("#zckgbgAfter").html(aHtml);
			}
			$("#zckgbgBefor").find(".shareholderList").first().find(".cancelPartner").remove();
			$("#zckgbgAfter").find(".shareholderList").first().find(".cancelPartner").remove();
			if($("#serviceStatus").val()&&$("#serviceStatus").val().length>0){
				$(".defineTax").remove();
				$(":input").attr("readonly",true);
				$(".addPartner").remove();
			}
	},
	zczjHtml:function(cusCompany,ordPerfectChange,type) 
	{	//注册资金
		var html='';
		if(type=='0'){
			html+='<h5 class="fz14 color50">变更前注册资本</h5>';
			html+='人民币<input type="text" class="math register_m border" style="margin-right:5px;" name="cusCompany.registeredCapital" value="'+(cusCompany&&cusCompany.registeredCapital?cusCompany.registeredCapital:'')+'"  ><span class="ml5">万</span> ';
		}else{
			html+='<h5 class="fz14 color50">变更后注册资本</h5>';
			html+='人民币<input type="text" class="math register_m border" style="margin-right:5px;" name="ordPerfectChange.registeredCapital" value="'+(ordPerfectChange&&ordPerfectChange.registeredCapital?ordPerfectChange.registeredCapital:'')+'"  ><span class="ml5">万</span> ';
		}
		return html;
	},
	companyLegalpersonHtml:function(cusCompanyLegalperson,type){
		var html='';
		var isOk=false;
		html+='<table>';
		if(cusCompanyLegalperson&&cusCompanyLegalperson.id){
			if(type=='0'){
				html+='<input type="hidden" value="'+cusCompanyLegalperson.id+'" name="cusCompanyLegalperson.id" />';
			}else{
				html+='<input type="hidden" name="companyLegalperson.id" value="'+cusCompanyLegalperson.id+'" />';
			}
			isOk=true;
		}
		var legalPersonName='cusCompanyLegalperson.legalPersonName';
		var documentType="cusCompanyLegalperson.documentType";
		var documentNo="cusCompanyLegalperson.documentNo";
		var documentAddress="cusCompanyLegalperson.documentAddress";
		if(type=='1'){
			legalPersonName='companyLegalperson.legalPersonName';
			documentType="companyLegalperson.documentType";
			documentNo="companyLegalperson.documentNo";
			documentAddress="companyLegalperson.documentAddress";
		}
		html+=' <tr>';
		html+='		<td colspan="5"><h5 class="fz14 color50">法人</h5></td>';
		html+=' </tr>';
		html+=' <tr>';
		html+='		<td width="82">姓名</td>';
		html+='		<td><input type="text" name="'+legalPersonName+'" placeholder="真实姓名" class="relname" style="margin-right:40px;" value="'+(isOk?cusCompanyLegalperson.legalPersonName:"")+'"></td>';
		html+='		<td>';
		html+='			<select class="documentType" name="'+documentType+'">';
		html+="				<option "+((isOk&&'sfz'==cusCompanyLegalperson.documentType)?'selected':'')+" value='sfz'>身份证</option>";
		html+="				<option "+((isOk&&'hxz'==cusCompanyLegalperson.documentType)?'selected':'')+" value='hxz'>回乡证</option>";
		html+="				<option "+((isOk&&'tbz'==cusCompanyLegalperson.documentType)?'selected':'')+" value='tbz'>台胞证</option>";
		html+="				<option "+((isOk&&'hz'==cusCompanyLegalperson.documentType)?'selected':'')+" value='hz'>护照</option>";
		html+='			</select>';
		html+='		</td>';
		html+='		<td><input   name="'+documentNo+'" value="'+(isOk?cusCompanyLegalperson.documentNo:'')+'" type="text" placeholder="证件号码" class="idNumber" /></td>';
		html+='		<td width="180"></td>';
		html+=' </tr>';
		html+=' <tr>';
		html+='		<td>证件地址</td>';
		html+='		<td colspan="4"><input value="'+(isOk?cusCompanyLegalperson.documentAddress:'')+'"  name="'+documentAddress+'" type="text" placeholder="请填写证件上的地址" class="address" /></td>';
		html+='	</tr>';
		html+='</table>';
		return html;
	},
	shareholderHtml:function(shareholderList,id,shareholderObj){
		var html='';
		var len=1;
		if(shareholderList&&shareholderList.length>0)
		{
			len=shareholderList.length;
		}
		for(var i=0;i<len;i++){
			var shareholder=shareholderList?shareholderList[i]:"";
			html+='  <table width="100%"  class="js_gd shareholderList">';
			html+='            <input type="hidden" name="'+shareholderObj+'['+i+'].id" value="'+(shareholder?shareholder.id:'')+'" />'
			html+='				<tr>';
			html+='					<td colspan="5"><h5 class="fz14 color50">股东'+(i+1)+'</h5></td>';
			html+='				</tr>';
			html+='				<tr>';
			html+='					<td width="82">';
			html+='						<select  name="'+shareholderObj+'['+i+'].cooperativeNature">';
			html+='							<option '+("2"==(shareholder?shareholderList[i].cooperativeNature:'')?'selected':'')+' value="2">股东姓名</option>';
			html+='							<option '+("3"==(shareholder?shareholderList[i].cooperativeNature:'')?'selected':'')+' value="3">公司名称</option>';
			html+='						</select>';
			html+='					</td>';
			html+='                 <td width="253"><input name="'+shareholderObj+'['+i+'].shareholderName" value="'+(shareholder?shareholder.shareholderName:'')+'" type="text" placeholder="名称" class="relname" /></td>'
			html+='		            <td>';
			html+='			          <select class="documentType" name="'+shareholderObj+'['+i+'].documentType">';
			html+="				         <option "+('sfz'==(shareholder?shareholderList[i].documentType:'')?'selected':'')+" value='sfz'>身份证</option>";
			html+="				         <option "+('hxz'==(shareholder?shareholderList[i].documentType:'')?'selected':'')+" value='hxz'>回乡证</option>";
			html+="				         <option "+('tbz'==(shareholder?shareholderList[i].documentType:'')?'selected':'')+" value='tbz'>台胞证</option>";
			html+="				         <option "+('hz'==(shareholder?shareholderList[i].documentType:'')?'selected':'')+" value='hz'>护照</option>";
			html+="				         <option "+('gszch'==(shareholder?shareholderList[i].documentType:'')?'selected':'')+" value='gszch'>公司注册号</option>";
			html+='			          </select>';
			html+='		            </td>';
			html+='					<td><input  name="'+shareholderObj+'['+i+'].documentNo" value="'+(shareholder?shareholder.documentNo:'')+'"  type="text" placeholder="证件号码" class="idNumber" /></td>';
			html+='					<td width="210"></td>';
			html+='				</tr>';
			html+='				<tr>';
			html+='					<td>证件地址</td>';
			if("shareholderList"==shareholderObj){
				html+='					<td colspan="4"><input    name="'+shareholderObj+'['+i+'].cardAddress"  value="'+(shareholder?shareholder.cardAddress:'')+'"   type="text" placeholder="请填写地址" class="address1"/></td>';
			}else{
				html+='					<td colspan="4"><input    name="'+shareholderObj+'['+i+'].addressDetails"  value="'+(shareholder?shareholder.addressDetails:'')+'"   type="text" placeholder="请填写地址" class="address1"/></td>';
			}
			html+='				</tr>';
			html+='				<tr>';
			html+='					<td>出资额</td>';
			html+='					<td><input   type="text" name="'+shareholderObj+'['+i+'].shareholderMoney" value="'+(shareholder&&shareholder.shareholderMoney?shareholder.shareholderMoney:'')+'"  class="money" value="10"><span class="ml10">万</span></td>';
			html+='					<td>股权比例</td>';
			html+='					<td><input  type="text" class="money"  name="'+shareholderObj+'['+i+'].shareholderRatio" value="'+(shareholder?shareholder.shareholderRatio:'')+'"><span class="ml10">%</span></td>';
			html+='					<td style="text-align:center;"><a href="javascript:void(0);" type="button" class="btn_red addPartner"   style="margin:0 10px;">增加股东</a>';
			html+='					    <a   class="btn_blue cancelPartner">取消</a>';
			html+='					</td>';
			html+='				</tr>';
			html+='  </table>';
		}
		return html;
	}
}