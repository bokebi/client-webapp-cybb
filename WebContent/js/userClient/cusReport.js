$(function() {
	loadPeriodList();
	
	$(".queryDetailList").click(function(){
		queryDetailList();
	});
	$(".queryLedgerList").click(function(){
		queryLedgerList();
	});
	$(".queryBalanceList").click(function(){
		queryBalanceList();
	});
	$(".searchZCFZB").click(function(){
		searchZCFZB();
	});
	
	$(".searchLRB").click(function(){
		searchLRB();
	});
	$(".searchSFB").click(function(){
		searchSFB();
	});
	//
	$('.reportsUl').on('click','li',function(){
		$('.reportsUl li').removeClass('reportsHover');
		$(this).addClass('reportsHover');
		var i=$(this).index();
		$('.infoList>div').hide();
		$($('.infoDivCommon')[i]).show();
	});

	$('.infoDivCommon1 .billUl').on('click','li',function(){
		$('.infoDivCommon1 .billUl li').removeClass('billHover');
		$(this).addClass('billHover');
		var i=$(this).index();
		var parentDiv = $(this).parents('.infoDivCommon');
		parentDiv.find('.posting').hide();
		$(parentDiv.find('.posting')[i]).show();
	});
	
	$('.infoDivCommon2 .billUl').on('click','li',function(){
		$('.infoDivCommon2 .billUl li').removeClass('billHover');
		$(this).addClass('billHover');
		var i=$(this).index();
		var parentDiv = $(this).parents('.infoDivCommon');
		parentDiv.find('.posting').hide();
		$(parentDiv.find('.posting')[i]).show();
	});
})

function loadPeriodList(){
	$.ajax({
		   type: "POST",
		   asnyc:false,
		   url: dum.appName+"/myCompany/queryPeriodList.html",
		   success: function(data){
			   if(data){
				   $(".detailStartPeriod").empty();
				   $(".detailEndPeriod").empty();
				   
				   $(".ledgerStartPeriod").empty();
				   $(".ledgerEndPeriod").empty();
				   
				   $(".balanceStartPeriod").empty();
				   $(".balanceEndPeriod").empty();
				   
				   $(".zcfzbPeriodSel").empty();
				   $(".lrbPeriodSel").empty();
				   $(".sfbPeriodSel").empty();
				   var options = '';
				   $.each(data,function(index,value){
					   options += '<option value="'+value.id+'">'+value.periodYear+'-'+value.periodNumber+'</option>';
				   })
				   $(".detailStartPeriod").append(options);
				   $(".detailStartPeriod option:last").attr("selected","selected");
				   $(".detailEndPeriod").append(options);
				   $(".detailEndPeriod option:last").attr("selected","selected");
				   
				   $(".ledgerStartPeriod").append(options);
				   $(".ledgerStartPeriod option:last").attr("selected","selected");
				   $(".ledgerEndPeriod").append(options);
				   $(".ledgerEndPeriod option:last").attr("selected","selected");
				   
				   $(".balanceStartPeriod").append(options);
				   $(".balanceStartPeriod option:last").attr("selected","selected");
				   $(".balanceEndPeriod").append(options);
				   $(".balanceEndPeriod option:last").attr("selected","selected");
				   
				   $(".zcfzbPeriodSel").append(options);
				   $(".zcfzbPeriodSel option:last").attr("selected","selected");
				   
				   $(".lrbPeriodSel").append(options);
				   $(".lrbPeriodSel option:last").attr("selected","selected");

				   $(".sfbPeriodSel").append(options);
				   $(".sfbPeriodSel option:last").attr("selected","selected");
				   loadSubjectSel(0);
			   }
		   }
	});
}

function loadSubjectSel(endPeriodId){
	$.ajax({
		   type: "POST",
		   url: dum.appName+"/cusReport/loadSubject.html",
		   data:{"endPeriodId":endPeriodId},
		   success: function(data){
			   if(data){
				   $(".detaiSubjectSel").empty();
				   var options = '';
				   $.each(data,function(index,value){
					   options += '<option value="'+value.id+'">'+value.subjectCode+'-'+value.subjectName+'</option>';
				   })
				   $(".detaiSubjectSel").append(options);
				   $(".detaiSubjectSel option:first").attr("selected","selected");
				   queryDetailList();
			   }
		   }
	});
}

/**
 * 查询税费表
 */
function searchSFB(){
	$(".reportsLoading").showLoading();
	var periodId = $(".sfbPeriodSel").val();
	$.ajax({
		   type: "POST",
		   url: dum.appName+"/cusReport/searchSFB.html",
		   data:{"periodId":periodId},
		   success: function(data){
			   if(data){
					var $tbody = $("#sfbReporttable").html("");
					var titelTr = '<tr><th width="50%">税种</th><th width="50%">申报税</th></tr>';
					$tbody.append(titelTr);
					var $tr = '';
					if(data.companyNature == '0'){
						$tr ='<tr><td>增值税</td><td>'+data.SFB_WJZZS_1_BQSBSF+'</td></tr>';
					}else if(data.companyNature == '1'){
						$tr ='<tr><td>增值税</td><td>'+data.SFB_YJZZS_6_BQSBSF+'</td></tr>';
					}else{
						$tr ='<tr><td>增值税</td><td></td></tr>';
					}
					$tbody.append($tr);
					$tr ='<tr><td>城市建设维护税</td><td>'+data.SFB_CSJSWHS_2_BQSBSF+'</td></tr>';
					$tbody.append($tr);
					$tr ='<tr><td>教育附加税</td><td>'+data.SFB_JYFFJ_3_BQSBSF+'</td></tr>';
					$tbody.append($tr);
					$tr ='<tr><td>地方教育附加税</td><td>'+data.SFB_DFJYFJ_4_BQSBSF+'</td></tr>';
					$tbody.append($tr);
					$tr ='<tr><td>企业所得税</td><td>'+data.SFB_QYSDS_5_BQSBSF+'</td></tr>';
					$tbody.append($tr);
					
				}
			   $(".reportsLoading").hideLoading();
		   },
           error: function(xhr) {
               $(".reportsLoading").hideLoading();
           }
	});
}

/**
 * 查询利润表
 */
function searchLRB(){
	$(".reportsLoading").showLoading();
	var periodId = $(".lrbPeriodSel").val();
	$.ajax({
		   type: "POST",
		   url: dum.appName+"/cusReport/searchLRB.html",
		   data:{"periodId":periodId},
		   success: function(data){
			   if(data){
					var $tbody = $("#lrbReporttable").html("");
					var titelTr = '<tr><th>项目</th><th>行次</th><th>本年累计金额</th><th>本月金额</th></tr>';
					$tbody.append(titelTr);
					var $tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">一、营业收入 </a><b class="editor_fzb"></b></div></td><td width="5%">1</td><td width="10%">'+formatCurrency(data.LRB_YYSR_1_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_YYSR_1_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">减：营业成本 </a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">2</td><td width="10%" align="right">'+formatCurrency(data.LRB_YYCB_2_BNLJ)+'</td><td width="10%" align="right">'+formatCurrency(data.LRB_YYCB_2_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;营业税金及附加 </a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">3</td><td width="10%">'+formatCurrency(data.LRB_YYSJJFJ_3_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_YYSJJFJ_3_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;其中：消费税 </a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">4</td><td width="10%">'+formatCurrency(data.LRB_XFS_4_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_XFS_4_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;&nbsp;营业税 </a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">5</td><td width="10%">'+formatCurrency(data.LRB_YYS_5_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_YYS_5_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;&nbsp;城市维护建设税</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">6</td><td width="10%">'+formatCurrency(data.LRB_CSJSF_6_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_CSJSF_6_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;&nbsp;资源税</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">7</td><td width="10%">'+formatCurrency(data.LRB_ZYS_7_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_ZYS_7_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;&nbsp;土地增值税</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">8</td><td width="10%">'+formatCurrency(data.LRB_TDZZS_8_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_TDZZS_8_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;&nbsp;城镇土地使用税、房产税、车船税、印花税</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">9</td><td width="10%">'+formatCurrency(data.LRB_TFCY_9_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_TFCY_9_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;&nbsp;教育费附加、矿产资源补偿税、排污费</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">10</td><td width="10%">'+formatCurrency(data.LRB_JKZP_10_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_JKZP_10_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;销售费用</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">11</td><td width="10%">'+formatCurrency(data.LRB_XSFY_11_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_XSFY_11_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;其中：商品维修费</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">12</td><td width="10%">'+formatCurrency(data.LRB_SPWXF_12_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_SPWXF_12_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;&nbsp;广告费和业务宣传费</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">13</td><td width="10%">'+formatCurrency(data.LRB_GGFYWXCF_13_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_GGFYWXCF_13_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;管理费用</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">14</td><td width="10%">'+formatCurrency(data.LRB_GLFY_14_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_GLFY_14_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;其中：开办费</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">15</td><td width="10%">'+formatCurrency(data.LRB_KBF_15_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_KBF_15_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;&nbsp;业务招待费</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">16</td><td width="10%">'+formatCurrency(data.LRB_YWZDF_16_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_YWZDF_16_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;&nbsp;研究费用</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">17</td><td width="10%">'+formatCurrency(data.LRB_YJFY_17_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_YJFY_17_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;财务费用</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">18</td><td width="10%">'+formatCurrency(data.LRB_ZWFY_18_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_ZWFY_18_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;其中：利息费用（收入以“-”号填列）</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">19</td><td width="10%">'+formatCurrency(data.LRB_LXFY_19_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_LXFY_19_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">加：投资收益（损失以“-”号填列）</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">20</td><td width="10%">'+formatCurrency(data.LRB_TZSY_20_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_TZSY_20_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">二、营业利润（亏损以“-”号填列）</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">21</td><td width="10%">'+formatCurrency(data.LRB_YYLR_21_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_YYLR_21_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">加：营业外收入</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">22</td><td width="10%">'+formatCurrency(data.LRB_YYWSR_22_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_YYWSR_22_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;其中：政府补助</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">23</td><td width="10%">'+formatCurrency(data.LRB_ZFBZ_23_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_ZFBZ_23_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">减：营业外支出</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">24</td><td width="10%">'+formatCurrency(data.LRB_YYWZC_24_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_YYWZC_24_BYJE)+'</td></tr>');
					
					$tbody.append($tr);
					$tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;其中：坏账损失</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">25</td><td width="10%">'+formatCurrency(data.LRB_WZSS_25_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_WZSS_25_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;&nbsp;无法收回的长期债券投资损失</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">26</td><td width="10%">'+formatCurrency(data.LRB_WFSHDCQZJTZSS_26_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_WFSHDCQZJTZSS_26_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;&nbsp;无法收回的长期股权投资损失</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">27</td><td width="10%">'+formatCurrency(data.LRB_WFSHDCQGQTZSS_27_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_WFSHDCQGQTZSS_27_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;&nbsp;自然灾害等不可抗力因素造成的损失</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">28</td><td width="10%">'+formatCurrency(data.LRB_ZRZHDBKKJYSZCDSS_28_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_ZRZHDBKKJYSZCDSS_28_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;&nbsp;税收滞纳金</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">29</td><td width="10%">'+formatCurrency(data.LRB_SSXNJ_29_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_SSXNJ_29_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">三、利润总额（亏损总额以“-”号填列）</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">30</td><td width="10%">'+formatCurrency(data.LRB_LRZE_30_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_LRZE_30_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">减：所得税费用</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">31</td><td width="10%">'+formatCurrency(data.LRB_SDSFY_31_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_SDSFY_31_BYJE)+'</td></tr>');
					$tbody.append($tr);
					$tr = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">四：净利润（净亏损以“-”号填列）</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%">32</td><td width="10%">'+formatCurrency(data.LRB_JLR_32_BNLJ)+'</td><td width="10%">'+formatCurrency(data.LRB_JLR_32_BYJE)+'</td></tr>');
					$tbody.append($tr);
					}
			   $(".reportsLoading").hideLoading();
		   },
		   error: function(xhr) {
               $(".reportsLoading").hideLoading();
           }
	});
}

/**
 * 查询资产负债表
 */
function searchZCFZB(){
	$(".reportsLoading").showLoading();
	var periodId = $(".zcfzbPeriodSel").val();
	$.ajax({
		   type: "POST",
		   url: dum.appName+"/cusReport/searchZCFZB.html",
		   data:{"periodId":periodId},
		   success: function(data){
			   if(data){
					var $tbody = $("#reportZCFZB").html("");
					var titelTr = '<tr><th>资产</th><th>行次</th><th>期末数</th><th>年初数</th><th width="15%">负债和所有者（或股东）权益</th><th>行次</th><th>期末数</th><th>年初数</th></tr>';
					$tbody.append(titelTr);
					var $tr = $('<tr class="even"><td width="10%" class="td_editor">流动资产：</td><td width="5%" align="center"></td><td width="10%"></td><td width="10%"></td>'+
							'<td width="10%" class="td_editor">流动负债：</td><td width="5%" align="center"></td><td width="10%"></td><td width="10%"></td></tr>');
					$tbody.append($tr);
					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;货币资金</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">1</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_HBZJ_1_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_HBZJ_1_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;短期借款</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">31</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_DQJK_31_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_DQJK_31_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;短期投资</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">2</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_DQTZ_2_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_DQTZ_2_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;应付票据</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">32</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YFPJ_32_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YFPJ_32_NCS)+'</a></td></tr>');
					$tbody.append(item);
					
					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;应收票据</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">3</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YSPJ_3_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YSPJ_3_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;应付账款</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">33</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YFDK_33_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YFDK_33_NCS)+'</a></td></tr>');
					$tbody.append(item);
					
					var item = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;应收账款</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">4</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YSZK_4_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YSZK_4_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;预收账款</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">34</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YSDK_34_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YSDK_34_NCS)+'</a></td></tr>');
					$tbody.append(item);

					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;预付账款</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">5</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YFZK_5_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YFZK_5_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;应付职工薪酬</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">35</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YFZGXC_35_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YFZGXC_35_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;应收股利</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">6</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YSGL_6_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YSGL_6_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;应交税费</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">36</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YJSF_36_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YJSF_36_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;应收利息</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">7</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YSGL_7_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YSGL_7_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;应付利息</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">37</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YFLX_37_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YFLX_37_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;其他应收款</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">8</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_QTYSK_8_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_QTYSK_8_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;应付利润</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">38</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YFLR_38_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YFLR_38_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;存货</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">9</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_CH_9_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_CH_9_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;其他应付款</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">39</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_QTYFK_39_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_QTYFK_39_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;其中：原材料</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">10</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YCL_10_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YCL_10_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;其他流动负债</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">40</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_QTLDFZ_40_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_QTLDFZ_40_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;在产品</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">11</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_ZCP_11_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_ZCP_11_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;流动负债合计：</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">41</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_LDFZHJ_41_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_LDFZHJ_41_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;库存商品</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">12</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_KCSP_12_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_KCSP_12_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">非流动负债：</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center"></td><td width="10%" align="right"><a href="javascript:void(0);"></a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);"></a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;周转材料</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">13</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_ZZZL_13_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_ZZZL_13_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;长期借款</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">42</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_CQJK_42_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_CQJK_42_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;其他流动资产</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">14</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_QTLDZC_14_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_QTLDZC_14_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;长期应付款</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">43</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_CQYFK_43_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_CQYFK_43_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">流动资产合计</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">15</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_LDZCHJ_15_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_LDZCHJ_15_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;递延收益</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">44</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_DYSY_44_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_DYSY_44_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">非流动资产：</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center"></td><td width="10%" align="right"><a href="javascript:void(0);"></a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);"></a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;其他非流动负债</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">45</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_QTFLDFZ_45_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_QTFLDFZ_45_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;长期债券投资</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">16</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_CQZJTZ_16_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_CQZJTZ_16_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;非流动负债合计</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">46</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_FLDFZHJ_46_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_FLDFZHJ_46_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;长期股权投资</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">17</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_CQGQTZ_17_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_CQGQTZ_17_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;&nbsp;负债合计</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">47</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_FZHJ_47_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_FZHJ_47_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;固定资产原价</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">18</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_GDZCYJ_18_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_GDZCYJ_18_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl"></a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center"></td><td width="10%" align="right"><a href="javascript:void(0);"></a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);"></a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;减：累计折旧</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">19</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_JLJZJ_19_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_JLJZJ_19_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl"></a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center"></td><td width="10%" align="right"><a href="javascript:void(0);"></a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);"></a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;固定资产账面价值</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">20</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_GDZCZMJZ_20_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_GDZCZMJZ_20_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl"></a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center"></td><td width="10%" align="right"><a href="javascript:void(0);"></a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);"></a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;在建工程</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">21</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_ZJGC_21_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_ZJGC_21_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl"></a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center"></td><td width="10%" align="right"><a href="javascript:void(0);"></a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);"></a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;工程物资</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">22</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_GCWZ_22_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_GCWZ_22_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl"></a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center"></td><td width="10%" align="right"><a href="javascript:void(0);"></a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);"></a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;固定资产清理</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">23</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_GDZCQL_23_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_GDZCQL_23_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl"></a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center"></td><td width="10%" align="right"><a href="javascript:void(0);"></a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);"></a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;生产性生物资产</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">24</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_SCXSWZC_24_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_SCXSWZC_24_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">所有者权益（或股东权益）：</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center"></td><td width="10%" align="right"><a href="javascript:void(0);"></a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);"></a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;无形资产</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">25</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_WXZC_25_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_WXZC_25_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;实收资本（或股本）</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">48</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_SSZB_48_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_SSZB_48_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;开发支出</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">26</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_KFZC_26_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_KFZC_26_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;资本公积</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">49</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_ZBGJ_49_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_ZBGJ_49_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;长期待摊费用</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">27</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_CQDTFY_27_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_CQDTFY_27_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;盈余公积</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">50</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YYGJ_50_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_YYGJ_50_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;其他非流动资产</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">28</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_QTFLDZC_28_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_QTFLDZC_28_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;未分配利润</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">51</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_WFPLR_51_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_WFPLR_51_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="even"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;非流动资产合计</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">29</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_FLDZCHJ_29_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_FLDZCHJ_29_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;所有者权益（或股东权益）合计</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">52</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_SYZQYHJ_52_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_SYZQYHJ_52_NCS)+'</a></td></tr>');
					$tbody.append(item);
					var item = $('<tr class="odd"><td width="10%" class="td_editor"><div class="ov"><a href="javascript:void(0);" class="alignMiddle fl">资产总计</a>'+
							'<b class="editor_fzb" ></b>'+
							'</div></td><td width="5%" align="center">30</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_ZCZJ_30_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_ZCZJ_30_NCS)+'</a></td>'+
							'<td width="10%" class="td_editor"><div class="ov">'+
							'<a href="javascript:void(0);" class="alignMiddle fl">&nbsp;&nbsp;&nbsp;负债和所有者权益（或股东权益）总计</a>'+
							'<b class="editor_fzb"></b>'+
							'</div></td><td width="5%" align="center">53</td><td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_FZHSYZQYZJ_53_QMS)+'</a></td>'+
							'<td width="10%" align="right"><a href="javascript:void(0);">'+formatCurrency(data.ZCFZB_FZHSYZQYZJ_53_NCS)+'</a></td></tr>');
					$tbody.append(item);
					}
			   $(".reportsLoading").hideLoading();
		   },
		   error: function(xhr) {
               $(".reportsLoading").hideLoading();
           }
	});
}

/**
 * 查询科目余额
 */
function queryBalanceList(){
	$(".reportsLoading").showLoading();
	var startPeriodId = $(".balanceStartPeriod").val();
    var endPeriodId = $(".balanceEndPeriod").val();
	$.ajax({
		   type: "POST",
		   url: dum.appName+"/cusReport/balanceList.html",
		   data:{"startPeriodId":startPeriodId,"endPeriodId":endPeriodId},
		   success: function(data){
			   if(data){
					var $tbody = $("#balanceListTable").html("");
					var titelTr ='<tr><th width="5%">科目编码</th><th width="8%">科目名称</th><th width="5%"><div class="subjectBottme">期初余额</div><p class="fl debit">借方</p>';
					titelTr +='<p class="fl Credit">贷方</p><div class="cb"></div></th><th width="5%"><div class="subjectBottme">本期发生额</div><p class="fl debit">借方</p>';
					titelTr +='<p class="fl Credit">贷方</p><div class="cb"></div></th><th width="5%">';
					titelTr +='<div class="subjectBottme">本年累计发生额</div><p class="fl debit">借方</p><p class="fl Credit">贷方</p><div class="cb"></div>';
					titelTr +='</th><th width="5%"><div class="subjectBottme">期末余额</div><p class="fl debit">借方</p><p class="fl Credit">贷方</p><div class="cb"></div>';
					titelTr +='</th></tr>';
					
					$tbody.append(titelTr);
					var balances = data.balances;
					var amountSum = data.amountSum;
					if(balances!=null&&amountSum!=null){
						$.each(balances, function(index, balance) {
							var amount = balance,flag = 'odd';
							if(index%2 == 0){
								flag = 'even'
							}
							if(amount){
								var $tr = $('<tr class='+flag+'><th width="5%" align="center"><p>'
										+ balance.subjectCode + '</p></th>'
										+ '<th width="8%" align="center"><p>'
										+ balance.subjectName + '</p></th>'
										
										+ '<th width="5%" align="center"><p class="fl debit">'
										+ formatCurrency(amount.periodBegunAmountBorrow) + '</p><p class="fl Credit">'
										+ formatCurrency(amount.periodBegunAmountLoan) + '</p><div class="cb"></div></th>'
										
										+ '<th width="5%" align="center"><p class="fl debit">'
										+ formatCurrency(amount.monthAmountBorrow) + '</p><p class="fl Credit">'
										+ formatCurrency(amount.monthAmountLoan) + '</p><div class="cb"></div></th>'
										
										+ '<th width="5%" align="center"><p class="fl debit">'
										+ formatCurrency(amount.yearAccumulatedBorrow) + '</p><p class="fl Credit">'
										+ formatCurrency(amount.yearAccumulatedLoan) + '</p><div class="cb"></div></th>'
										
										+ '<th width="5%" align="center"><p class="fl debit">'
										+ formatCurrency(amount.terminalAccumulatedBorrow) + '</p><p class="fl Credit">'
										+ formatCurrency(amount.terminalAccumulatedLoan) + '</p><div class="cb"></div></td>');
							}else{
								var $tr = $('<tr class='+flag+'><th width="5%" align="center"><p>'
										+ balance.subjectCode + '</p></th>'
										+ '<th width="8%" align="center"><p>'
										+ balance.subjectName + '</p></th>'
										
										+ '<th width="5%" align="center"><p class="fl debit"></p><p class="fl Credit"></p><div class="cb"></div></th>'
										+ '<th width="5%" align="center"><p class="fl debit"></p><p class="fl Credit"></p><div class="cb"></div></th>'
										+ '<th width="5%" align="center"><p class="fl debit"></p><p class="fl Credit"></p><div class="cb"></div></th>'
										+ '<th width="5%" align="center"><p class="fl debit"></p><p class="fl Credit"></p><div class="cb"></div></th>');
							}
							$tbody.append($tr);
						});
						var $tr = $('<tr><th width="5%" align="center"><p></p></th>'
								+ '<th width="8%" align="center"><p>合计</p></th>'
								+ '<th width="5%" align="center"><p class="fl debit">' + formatCurrency(amountSum.periodBegunAmountBorrowSum) + '</p><p class="fl Credit">' + formatCurrency(amountSum.periodBegunAmountLoanSum) + '</p><div class="cb"></div>'
								+'</th>'+ '<th width="5%" align="center"><p class="fl debit">' + formatCurrency(amountSum.monthAmountBorrowSum)+ '</p><p class="fl Credit">' + formatCurrency(amountSum.monthAmountLoanSum) + '</p><div class="cb"></div>'
								+'</th>'+'<th width="5%" align="center"><p class="fl debit">' + formatCurrency(amountSum.yearAccumulatedBorrowSum) + '</p><p class="fl Credit">' + formatCurrency(amountSum.yearAccumulatedLoanSum) + '</p><div class="cb"></div>'
								+'</th>'+ '<th width="5%" align="center"><p class="fl debit">' + formatCurrency(amountSum.terminalAccumulatedBorrowSum)+ '</p><p class="fl Credit">' + formatCurrency(amountSum.terminalAccumulatedLoanSum) + '</p><div class="cb"></div>'
								+'</th></tr>');
						$tbody.append($tr);
					}
			   }
			   $(".reportsLoading").hideLoading();
		   },
	       error: function(xhr) {
	           $(".reportsLoading").hideLoading();
	       }
	});
}

/**
 * 查询总账
 */
function queryLedgerList(){
	$(".reportsLoading").showLoading();
	var startPeriodId = $(".ledgerStartPeriod").val();
    var endPeriodId = $(".ledgerEndPeriod").val();
	$.ajax({
		   type: "POST",
		   url: dum.appName+"/cusReport/queryLedgerList.html",
		   data:{"startPeriodId":startPeriodId,"endPeriodId":endPeriodId},
		   success: function(data){
			   if(data){
					var $tbody = $("#accntLedgerTable").html("");
					var titelTr = '<tr><th>科目编码</th><th>科目名称</th><th>期间</th><th>摘要</th><th>借方</th><th>贷方</th><th>方向</th><th>余额</th></tr>';
					$tbody.append(titelTr);
					var isColor = 1;
					$.each(data,function(index, item) {
							var subjectName = item.subjectName;
							var subjectCode = item.subjectCode;
							var entitys = item.entitys;
							
							var periodCode = "";
							var abstractContent = "";
							var borrowAmount = "";
							var loanAmount = "";
							var balanceDirection = "";
							var begunAmountMoney = "";
							var tempPeriodCode = "";
							if(entitys && entitys.length > 0){
								$.each(entitys,function(index, entity) {
									if(index == 0){
										periodCode += '<p>'+ entity.periodCode + '</p>';
										abstractContent += '<p>期初余额</p>';
										borrowAmount += '<p align="right"></p>';
										loanAmount += '<p align="right"></p>';
										if(!entity.periodBegunAmount || 0 == entity.periodBegunAmount){
											balanceDirection += '<p>平</p>';
										}else{
											balanceDirection += '<p>'+ (entity.balanceDirection == '1'? '借':'贷') + '</p>';
										}
										begunAmountMoney += '<p align="right">'+ formatCurrency(entity.periodBegunAmount) +'</p>';
									}
									
									periodCode += '<p>'+ entity.periodCode + '</p>';
									abstractContent += '<p>本期合计</p>';
									borrowAmount += '<p align="right">'+ formatCurrency(entity.monthAmountBorrow) +'</p>';
									loanAmount += '<p align="right">'+ formatCurrency(entity.monthAmountLoan) + '</p>';
									if(!entity.currentMounthBegunAmount || 0 == entity.currentMounthBegunAmount){
										balanceDirection += '<p>平</p>';
									}else{
										balanceDirection += '<p>'+ (entity.balanceDirection == '1'? '借':'贷') + '</p>';
									}
									begunAmountMoney += '<p align="right">'+ formatCurrency(entity.currentMounthBegunAmount) +'</p>';
									
									periodCode += '<p>'+ entity.periodCode + '</p>';
									abstractContent += '<p>本年累计</p>';
									borrowAmount += '<p align="right">'+ formatCurrency(entity.yearAccumulatedBorrow) +'</p>';
									loanAmount += '<p align="right">'+ formatCurrency(entity.yearAccumulatedLoan) +'</p>';
									
									if(!entity.yearBegunAmount || 0 == entity.yearBegunAmount){
										balanceDirection += '<p>平</p>';
									}else{
										balanceDirection += '<p>'+ (entity.balanceDirection == '1'? '借':'贷') + '</p>';
									}
									
									begunAmountMoney += '<p align="right">'+ formatCurrency(entity.yearBegunAmount) +'</p>';
								});
							}
							
							var $tr = $('<tr><td width="5%" align="center"><div>'+ subjectCode + '</div></td>'+
							'<td width="15%" align="center"><div>'+ subjectName + '</div></td>'+
							'<td width="5%" align="center">'+periodCode+'</td>'+
							'<td width="5%" align="center">'+abstractContent+'</td>'+
							'<td width="6%" align="center">'+borrowAmount+'</td>'+
							'<td width="6%" align="center">'+loanAmount+'</td>'+
							'<td width="3%" align="center">'+balanceDirection+'</td>'+
							'<td width="5%" align="center">'+begunAmountMoney+'</td>');
							if(isColor % 2 == 0) {
								$tr.addClass("backColor1");
							}
							isColor++;
							$tbody.append($tr);
						});
			   }
			   $(".reportsLoading").hideLoading();
		   },
	       error: function(xhr) {
	           $(".reportsLoading").hideLoading();
	       }
	});
}

/**
 * 查询明细账
 */
function queryDetailList() {
	var subjectId = $(".detaiSubjectSel").val();
	var startPeriodId = $(".detailStartPeriod").val();
    var endPeriodId = $(".detailEndPeriod").val();
	$.ajax({
		type : "POST",
		url : dum.appName + "/cusReport/queryDetailList.html",
		data : {
			"subjectId" : subjectId,
			"startPeriodId" : startPeriodId,
			"endPeriodId" : endPeriodId
		},
		success : function(data) {
			if (data) {
				var $tbody = $("#accntDetailTable").html("");
				var titelTr = '<tr><th>日期</th><th>凭证宇号</th><th>摘要</th><th>借方</th><th>贷方</th><th>方向</th><th>余额</th></tr>';
				$tbody.append(titelTr);
				
				var isColor = 1;
				$.each(data,function(index, item) {
						var tranches = item.tranche;
						var balance = item.accntSubjectBalance;
						if(index == 0){
							var $balance = '<tr class="odd"><td width="8%" align="center"><p>'+dum.formatDate(balance.createDate)+'</p></td>'+
							'<td width="15%" align="center"><p></p></td>'+
							'<td width="15%" align="center"><p>期初余额</p></td>'+
							'<td width="6%" align="right"><p></p></td>'+
							'<td width="6%" align="right"><p></p></td>';
							$balance += '<td width="6%" align="center"><p>';
							$balance += (balance.periodBegunAmount && 0 != balance.periodBegunAmount) ? (balance.balanceDirection == 1 ? "借" : "贷") : "平" +'</p></td>';
							$balance += '<td width="6%" ><p align="right">'+ formatCurrency(balance.periodBegunAmount)+ '</p></td></tr>';
							$tbody.append($balance);
						}
						$.each(tranches,function(index, tranche) {
							var cs = '';
							index%2 == 0 ? cs = 'even' : cs = 'odd';
							var $tr = $('<tr class='+cs+'><td width="5%" align="center"><p>'+ tranche.voucherDate+ '</p></td>'+
											'<td width="15%" align="center"><p>'+ tranche.voucherCode+ '</p></td>'+
											'<td width="15%" align="center"><p>'+ tranche.abstractContent+ '</p></td>'+
											'<td width="6%" ><p align="right">'+ formatCurrency(tranche.borrowAmount)+ '</p></td>'+
											'<td width="6%" ><p align="right">'+ formatCurrency(tranche.loanAmount)+ '</p></td>'+
											'<td width="6%" ><p align="center">'+(tranche.begunAmountMoney != 0 ? balance.balanceDirection == 1 ? "借":"贷":"平") + '</p></td>'+
											'<td width="6%" ><p align="right">'+ formatCurrency(tranche.begunAmountMoney)+ '</p></td>'+
									'</tr>');
							$tbody.append($tr);
						});
						var $tr = $('<tr class="even"><td width="5%" align="center"><p>'+dum.formatDate(balance.createDate)+'</p></td>'+
								'<td width="15%" align="center"><p></p></td>'+
								'<td width="15%" align="center"><p>本期合计</p></td>'+
								'<td width="6%" ><p align="right">'+ formatCurrency(balance.monthAmountBorrow) + '</p></td>'+
								'<td width="6%" ><p align="right">'+ formatCurrency(balance.monthAmountLoan) + '</p></td>'+
								'<td width="6%" ><p align="center">'+ 
								(balance.currentMounthBegunAmount && 0 != balance.currentMounthBegunAmount ? balance.balanceDirection == 1 ? "借" : "贷" : '平')
								+ '</p></td>'+
								'<td width="6%" ><p align="right">'+  formatCurrency(balance.currentMounthBegunAmount) + '</p></td>'+
						'</tr>');
						$tbody.append($tr);
						var $tr = $('<tr class="odd"><td width="5%" align="center"><p>'+dum.formatDate(balance.createDate)+'</p></td>'+
								'<td width="15%" align="center"><p></p> </td>'+
								'<td width="15%" align="center"><p>本年累计</p> </td>'+
								'<td width="6%" ><p align="right">'+ formatCurrency(balance.yearAccumulatedBorrow) + '</p></td>'+
								'<td width="6%" ><p align="right">'+ formatCurrency(balance.yearAccumulatedLoan) + '</p></td>'+
								'<td width="6%" ><p align="center">'+ 
								(balance.yearBegunAmount && 0 != balance.yearBegunAmount ? balance.balanceDirection == 1 ? "借" : "贷" : "平")
								+ '</p></td>'+
								'<td width="6%" ><p align="right">'+ formatCurrency(balance.yearBegunAmount) + '</p></td>'+
						'</tr>');
						
						isColor++;
						$tbody.append($tr);
					});
			}
		},
        error: function(xhr) {
        }
	});
}

function exportDetailExcel(form) {
	var startPeriodId = $(".detailStartPeriod").val();
    var endPeriodId = $(".detailEndPeriod").val();
    $("#startDetaiId").val(startPeriodId);
    $("#endDetailId").val(endPeriodId);
	var url = dum.appName + "/cusReport/exportDetailExcel.html";
	$(form).attr("action", url);
	$(form).submit();
}

function exportLedgerExcel(form){
	var startPeriodId = $(".ledgerStartPeriod").val();
    var endPeriodId = $(".ledgerEndPeriod").val();
    $("#startLedgerId").val(startPeriodId);
    $("#endLedgerId").val(endPeriodId);
	var url = dum.appName + "/cusReport/exportLedgerExcel.html";
	$(form).attr("action", url);
	$(form).submit();
}

function exportBalanceExcel(form){
	var startPeriodId = $(".balanceStartPeriod").val();
    var endPeriodId = $(".balanceEndPeriod").val();
    $("#startBalanceId").val(startPeriodId);
    $("#endBalanceId").val(endPeriodId);
	var url = dum.appName + "/cusReport/exportBalanceExcel.html";
	$(form).attr("action", url);
	$(form).submit();
}

function lrbExport(form){
	var periodId = $(".lrbPeriodSel").val();
    $("#LRBPeriodId").val(periodId);
	var url = dum.appName + "/cusReport/lrbExport.html";
	$(form).attr("action", url);
	$(form).submit();
}

function zcfzbExport(form){
	var periodId = $(".zcfzbPeriodSel").val();
    $("#ZCFZBPeriodId").val(periodId);
	var url = dum.appName + "/cusReport/zcfzbExport.html";
	$(form).attr("action", url);
	$(form).submit();
}

function sfbExport(form){
	var periodId = $(".sfbPeriodSel").val();
    $("#SFBPeriodId").val(periodId);
	var url = dum.appName + "/cusReport/sfbExport.html";
	$(form).attr("action", url);
	$(form).submit();
}
