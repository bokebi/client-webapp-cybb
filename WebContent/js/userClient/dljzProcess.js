$(function(){
	var html=dljzProcess.loadZhangHtml();
	$(".statisticsTab").html(html);
	// echarts路径配置
    require.config({
        paths: {
            echarts: 'http://echarts.baidu.com/build/dist'
        }
    });
	var currentMonth=dljzProcess.getYearMonth(new Date());
	$("#currentMonth").val(currentMonth);
	dljzProcess.init();
	//dljzProcess.initPie(0,0,0,0,0);
	$(".statisticsConfirm").click(function(){
		var id=$(this).attr("zhangId");
		if(id){
			var data={id:id};
			dum.common.ajax({
				type : "post",
				url : "/orderProcess/updateConfirm.html",
				data:data,
				dataType : "json",
				success : function(data) 
				{
					$(".statisticsConfirm").remove();
				}
			});
		}
	});
	$("#sysServiceEvaluate").on("click",".statisticsConfirm1",dljzProcess.submitSysServiceEvaluate)
	$("#searchMonth").click(function(){ //查询
		dljzProcess.currentMonth=$("#currentMonth").val();
		$("#sysServiceEvaluate").html(dljzProcess.loadSysServiceEvaluateHtml());
		$("#processTab").html(dljzProcess.loadProcessHtml());
		dljzProcess.loadBusinessDataConventionalZhang();
		dljzProcess.loadSysServiceEvaluate();
		dljzProcess.findAccntAccountPeriod(dljzProcess.companyId);
		dljzProcess.countProcessNodeVo();
	})
})
var dljzProcess={
	init:function(){
		this.currentMonth=$("#currentMonth").val();
		this.orderId=$("#orderId").val();
		this.dljzProcessOrder();
		$(".statisticsTab").html(this.loadZhangHtml());
		this.loadBusinessDataConventionalZhang();
		$("#sysServiceEvaluate").html(this.loadSysServiceEvaluateHtml());
		this.loadSysServiceEvaluate();
		$("#processTab").html(this.loadProcessHtml());
		this.countProcessNodeVo();
	},
	currentMonth:'',
	orderId:'',
	companyId:'',
	dljzProcessOrder:function(){
		var data={id:this.orderId};
		dum.common.ajax({
			type : "post",
			url : "/orderProcess/dljzProcessOrder.html",
			data:data,
			dataType : "json",
			success : function(data) 
			{
				$("#companyName").html(data.companyName);
				$("#markCode").html(data.markCode);
				if(data.companyNature=='0'){
					$("#companyNature").html("一般纳税人");
				}else if(data.companyNature=='1'){
					$("#companyNature").html("小规模纳税人");
				}else{
					$("#companyNature").html("无");
				}
				$("#serviceStartTime").html(data.serviceStartTime?data.serviceStartTime:'未开启');
				if(data.sysService){
					$("#serviceName").html(data.sysService.serviceName);
					$("#serviceMobile").html(data.sysService.serviceMobile);
				}
				$("#flowName").html(data.flowName);
				$("#serviceCount").html(data.serviceCount);
				dljzProcess.findAccntAccountPeriod(data.companyId);
				dljzProcess.companyId=data.companyId;
				$(".viewReport").attr("href",dum.appName+"/cusReport/viewReport.html?leftNav=companyListdljz&companyId="+data.companyId+"&orderId="+data.cocId);
				$("#myRenewals").attr("onclick","serviceRenew('"+data.companyId+"','"+data.companyNature+"','"+data.companyAreaCode+"','"+data.companyName+"')");
			}
		});
	},
	loadBusinessDataConventionalZhang:function(){ //1.报税金额
		var data={id:this.orderId};
		data.createMonth= dljzProcess.currentMonth; 
		dum.common.ajax({
			type : "post",
			url : "/orderProcess/loadZhang.html",
			data:data,
			dataType : "json",
			success : function(data) 
			{
				if(data){
					var vat=data.vat?data.vat:'0';
					var enterpriseIncomeTax=data.enterpriseIncomeTax?data.enterpriseIncomeTax:'0';
					var valueAddedTax=data.valueAddedTax?data.valueAddedTax:'0';
					var individualIncomeTax=data.individualIncomeTax?data.individualIncomeTax:'0';
					$("#vat").html(vat);
					$("#enterpriseIncomeTax").html(enterpriseIncomeTax);
					$("#valueAddedTax").html(valueAddedTax);
					$("#individualIncomeTax").html(individualIncomeTax);
					var total=parseFloat(vat)+parseFloat(enterpriseIncomeTax)+parseFloat(valueAddedTax)+parseFloat(individualIncomeTax);
					$("#total").html(total);
					//$('#myStat_total').circliful();
					var vat_percentage=dljzProcess.Percentage(vat,total);
					//$("#myStat_vat").attr("data-text",vat_percentage+"%").attr("data-percent",vat_percentage).circliful();
					var enterpriseIncomeTax_percentage=dljzProcess.Percentage(enterpriseIncomeTax,total);
					//$("#myStat_enterpriseIncomeTax").attr("data-text",enterpriseIncomeTax_percentage+"%").attr("data-percent",enterpriseIncomeTax_percentage).circliful();
					var valueAddedTax_percentage=dljzProcess.Percentage(valueAddedTax,total);
					//$("#myStat_valueAddedTax").attr("data-text",valueAddedTax_percentage+"%").attr("data-percent",valueAddedTax_percentage).circliful();
					var individualIncomeTax_percentage=dljzProcess.Percentage(individualIncomeTax,total);
					//$("#myStat_individualIncomeTax").attr("data-text",individualIncomeTax_percentage+"%").attr("data-percent",individualIncomeTax_percentage).circliful();
					dljzProcess.initPie(total,vat_percentage,enterpriseIncomeTax_percentage,valueAddedTax_percentage,individualIncomeTax_percentage);
					$(".statisticsConfirm").attr("zhangId",data.id);
					var isConfirm=data.isConfirm;
					if(isConfirm=='0'){
						$(".statisticsConfirm").remove();
					}
				}
			}
		});
	},
	loadZhangHtml:function(){
		var html='';
		html+='<li>';
		html+='					<div id="main1" class="WidthDiv"></div>';
		html+='					<div>';
		html+='						<div class="fz14 color50">总计</div>';
		html+='						<p id="total" class="total">100</p>';
		html+='					</div>';
		html+='				</li>';
		html+='				<li>';
		html+='					<div id="main2" class="WidthDiv"></div>';
		html+='					<div>';
		html+='						<div class="fz14 color50">增值税</div>';
		html+='						<p id="vat" class="zzs">20</p>';
		html+='					</div>';
		html+='				</li>';
		html+='				<li>';
		html+='					<div id="main3" class="WidthDiv"></div>';
		html+='					<div>';
		html+='						<div class="fz14 color50">企业所得税</div>';
		html+='						<p id="enterpriseIncomeTax" class="qysds">30</p>';
		html+='					</div>';
		html+='				</li>';
		html+='				<li>';
		html+='					<div id="main4" class="WidthDiv"></div>';
		html+='					<div>';
		html+='						<div class="fz14 color50">增值附加税</div>';
		html+='						<p id="valueAddedTax" class="zzfjs">10</p>';
		html+='					</div>';
		html+='				</li>';
		html+='				<li>';
		html+='					<div id="main5" class="WidthDiv"></div>';
		html+='					<div>';
		html+='						<div class="fz14 color50">个人所得税</div>';
		html+='						<p id="individualIncomeTax" class="grsds">40</p>';
		html+='					</div>';
		html+='				</li>';
		return html;
	},
	Percentage:function(num,total){
		if(num=='0'&&total=='0'){
			return '0';
		}
	    return parseInt(Math.round(num / total * 10000) / 100.00);// 小数点后两位百分比
	},
	getYearMonth:function(date){
		 var year=date.getFullYear(); 
		 var month=date.getMonth()+1;
		 month =(month<10 ? "0"+month:month); 
		 var mydate = (year.toString()+"-"+month.toString());
		 return mydate;
	},
	loadSysServiceEvaluate:function(){ //2.服务评价
		var data={yearToMonth:dljzProcess.currentMonth,id:dljzProcess.orderId};
		dum.common.ajax({
			type : "post",
			url : "/orderProcess/loadSysServiceEvaluate.html",
			data:data,
			dataType : "json",
			success : function(data) 
			{
				if(data){
					$(".statisticsConfirm1").remove();
					$(".evaluateContent").val(data.evaluateContent).attr("disabled",true);
					$("#grade"+data.grade).attr("checked",true);
				}
			}
		});
	},
	loadSysServiceEvaluateHtml:function(){
		var html='';
		html+='<h4 class="titProcess mt20 mb20">每月评价</h4> ';
		html+='	<p class="color50"> ';
		html+='		<label class="mr30"><input type="radio" name="grade"  id="grade5" class="middle mr5" value="5" /><span class="middle">惊喜</span></label> ';
		html+='		<label class="mr30"><input type="radio" name="grade"  id="grade4" class="middle mr5" value="4" /><span class="middle">满意</span></label> ';
		html+='		<label class="mr30"><input type="radio" name="grade"  id="grade3" class="middle mr5" value="3"/><span class="middle">一般</span></label> ';
		html+='		<label class="mr30"><input type="radio" name="grade"  id="grade2" class="middle mr5" value="2"/><span class="middle">不满</span></label> ';
		html+='		<label class="mr30"><input type="radio" name="grade"  id="grade1" class="middle mr5" value="1" /><span class="middle">失望</span></label> ';
		html+='	</p> ';
		html+='	<p class="mt20 pr"> ';
		html+='		<span class="middleTop color50">评价服务</span> ';
		html+='		<textarea class="evaluate evaluateContent" name="evaluateContent"></textarea> ';
		html+='		<span class="size">0/200</span> ';
		html+='	</p> ';
		html+='	<p class="statisticsConfirm1" >提交评价</p> ';
		return html;
	},
	submitSysServiceEvaluate:function()
	{
		var grade=$("input[name=grade]:checked").val();
		var evaluateContent=$(".evaluateContent").val();
		if(grade&&evaluateContent){
			var form=$("#sysServiceEvaluate");
			var data=form.serialize();
			data+="&orderId="+dljzProcess.orderId;
			data+="&serviceMonth="+dljzProcess.currentMonth;
			dum.common.ajax({
			   type: "post",
			   url: "/orderProcess/saveSysServiceEvaluate.html",
			   data:  data,
			   dataType : "json",
			   success: function(data) {
				   $(".commentPrompt").show();
			   }
			});
		}
	},
	loadProcessHtml:function(){
		var html='';
		html+='<tr>';
		html+='					<td>';
		html+='						<p><img id="jzwcImg" src="'+dum.appName+'/v1/images/img/qrse1.png" /></p>';
		html+='						<p class="fw fz14 color50 mt5 mb5">记账完成</p>';
		html+='						<p class="fz14 color50 mt5" id="completeTime"></p>';
		html+='					</td>';
		html+='					<td class="middle">';
		html+='						<p class="point"><img src="'+dum.appName+'/v1/images/img/point.png" /></p>';
		html+='					</td>';
		html+='					<td>';
		html+='						<p><img  id="bscgImg"   src="'+dum.appName+'/v1/images/img/bscg1.png" /></p>';
		html+='						<p class="fw fz14 color50 mt5 mb5">报税成功</p>';
		html+='						<p class="fz14 color50 mt5" id="bscgDate"></p>';
		html+='					</td>';
		html+='</tr>';
		return html;
	},
	findAccntAccountPeriod:function(companyId){ //3.查找记账完成状态
		var data={companyId:companyId,yearMonth:dljzProcess.currentMonth};
		dum.common.ajax({
			   type: "post",
			   url: "/orderProcess/findAccntAccountPeriod.html",
			   data:  data,
			   dataType : "json",
			   success: function(data) {
				   if(data&&data.isCarryOver=='0')
				   {
					   $("#jzwcImg").attr("src",dum.appName+"/v1/images/img/qrse.png");
					    var date = new Date(data.updateDate);
						var mth = date.getMonth()+1;
						strDate = date.getFullYear()+'-'+mth+'-'+date.getDate();
						$('#completeTime').html(strDate);
				   }
			   }
			});
	},
	countProcessNodeVo : function(){ //4.查找报税情况
		var data={orderId:dljzProcess.orderId,createDate:dljzProcess.currentMonth};
		dum.common.ajax({
			   type: "post",
			   url: "/orderProcess/countProcessNodeVo.html",
			   data:  data,
			   dataType : "json",
			   success: function(data) {
				  if(data){
					  $("#bscgImg").attr("src",dum.appName+"/v1/images/img/bscg.png");
					  var date = new Date(data.cDate);
					 var mth = date.getMonth()+1;
					 strDate = date.getFullYear()+'-'+mth+'-'+date.getDate();
					 $("#bscgDate").html(strDate);
				  }
			   }
			});
	},
	initTotalPie : function(name,total,labelTop,labelFromatter,labelBottom){
		// 使用
	    require(
	        [
	            'echarts',
	            'echarts/theme/macarons',
	            'echarts/chart/pie' // 使用折线图模块，按需加载
	        ],
	        function (ec,theme) {
	        	var myPie = ec.init(document.getElementById('main1'),theme);
	        	var radius = [48, 55];
	        		option = {
	        		    legend: {
	        		        x : 'center',
	        		        y : 'center',
	        		        itemGap: 85,
	        		        padding:15,
	        		        data:[name]
	        		    },
	        		    title : {
	        		        x: 'center'
	        		    },
	        		    toolbox: {
	        		        show : false,
	        		        feature : {
	        		            dataView : {show: true, readOnly: false},
	        		            magicType : {
	        		                show: false, 
	        		                type: ['pie', 'funnel'],
	        		                option: {
	        		                    funnel: {
	        		                        width: '20%',
	        		                        height: '30%',
	        		                        itemStyle : {
	        		                            normal : {
	        		                                label : {
	        		                                    formatter : function (params){
	        		                                        return 'other\n' + params.value + '%\n'
	        		                                    },
	        		                                    textStyle: {
	        		                                        baseline : 'middle'
	        		                                    }
	        		                                }
	        		                            },
	        		                        } 
	        		                    }
	        		                }
	        		            },
	        		            restore : {show: true},
	        		            saveAsImage : {show: true}
	        		        }
	        		    },
	        		    series : [
	        		        {
	        		            type : 'pie',
	        		            center : ['50%', '50%'],
	        		            radius : radius,
	        		            x: '0%', // for funnel
	        		            itemStyle : labelFromatter,
	        		            data : [
	        		                {name:'other', value:100-total, itemStyle : labelBottom},
	        		                {name:'', value:total,itemStyle : labelTop}
	        		            ]
	        		        }
	        		    ]
	        		};
	        		// 为echarts对象加载数据 
	        	    myPie.setOption(option);
	        }
	    );
	},
	initVatPie: function(name,vatPercentage,labelTop,labelFromatter,labelBottom){
		// 使用
	    require(
	        [
	            'echarts',
	            'echarts/theme/macarons',
	            'echarts/chart/pie' // 使用折线图模块，按需加载
	        ],
	        function (ec,theme) {
	        	var myPie = ec.init(document.getElementById('main2'),theme);
	        	var radius = [48, 55];
	        		option = {
	        		    legend: {
	        		        x : 'center',
	        		        y : 'center',
	        		        itemGap: 85,
	        		        padding:15,
	        		        data:[name]
	        		    },
	        		    title : {
	        		        x: 'center'
	        		    },
	        		    toolbox: {
	        		        show : false,
	        		        feature : {
	        		            dataView : {show: true, readOnly: false},
	        		            magicType : {
	        		                show: false, 
	        		                type: ['pie', 'funnel'],
	        		                option: {
	        		                    funnel: {
	        		                        width: '20%',
	        		                        height: '30%',
	        		                        itemStyle : {
	        		                            normal : {
	        		                                label : {
	        		                                    formatter : function (params){
	        		                                        return 'other\n' + params.value + '%\n'
	        		                                    },
	        		                                    textStyle: {
	        		                                        baseline : 'middle'
	        		                                    }
	        		                                }
	        		                            },
	        		                        } 
	        		                    }
	        		                }
	        		            },
	        		            restore : {show: true},
	        		            saveAsImage : {show: true}
	        		        }
	        		    },
	        		    series : [
							{
							    type : 'pie',
							    center : ['50%', '50%'],
							    radius : radius,
							    x:'20%', // for funnel
							    itemStyle : labelFromatter,
							    data : [
							        {name:'other', value:100-vatPercentage, itemStyle : labelBottom},
							        {name:'', value:vatPercentage,itemStyle : labelTop}
							    ]
							}
	        		    ]
	        		};
	        		// 为echarts对象加载数据 
	        	    myPie.setOption(option);
	        }
	    );
	},
	initEntPie: function(name,enterpriseIncomeTaxPercentage,labelTop,labelFromatter,labelBottom){
		// 使用
	    require(
	        [
	            'echarts',
	            'echarts/theme/macarons',
	            'echarts/chart/pie' // 使用折线图模块，按需加载
	        ],
	        function (ec,theme) {
	        	var myPie = ec.init(document.getElementById('main3'),theme);
	        	var radius = [48, 55];
	        		option = {
	        		    legend: {
	        		        x : 'center',
	        		        y : 'center',
	        		        itemGap: 85,
	        		        padding:15,
	        		        data:[name]
	        		    },
	        		    title : {
	        		        x: 'center'
	        		    },
	        		    toolbox: {
	        		        show : false,
	        		        feature : {
	        		            dataView : {show: true, readOnly: false},
	        		            magicType : {
	        		                show: false, 
	        		                type: ['pie', 'funnel'],
	        		                option: {
	        		                    funnel: {
	        		                        width: '20%',
	        		                        height: '30%',
	        		                        itemStyle : {
	        		                            normal : {
	        		                                label : {
	        		                                    formatter : function (params){
	        		                                        return 'other\n' + params.value + '%\n'
	        		                                    },
	        		                                    textStyle: {
	        		                                        baseline : 'middle'
	        		                                    }
	        		                                }
	        		                            },
	        		                        } 
	        		                    }
	        		                }
	        		            },
	        		            restore : {show: true},
	        		            saveAsImage : {show: true}
	        		        }
	        		    },
	        		    series : [
							{
							    type : 'pie',
							    center : ['50%', '50%'],
							    radius : radius,
							    x:'40%', // for funnel
							    itemStyle : labelFromatter,
							    data : [
							        {name:'other', value:100-enterpriseIncomeTaxPercentage, itemStyle : labelBottom},
							        {name:'', value:enterpriseIncomeTaxPercentage,itemStyle : labelTop}
							    ]
							}
	        		    ]
	        		};
	        		// 为echarts对象加载数据 
	        	    myPie.setOption(option);
	        }
	    );
	},
	
	initValPie: function(name,valueAddedTaxPercentage,labelTop,labelFromatter,labelBottom){
		// 使用
	    require(
	        [
	            'echarts',
	            'echarts/theme/macarons',
	            'echarts/chart/pie' // 使用折线图模块，按需加载
	        ],
	        function (ec,theme) {
	        	var myPie = ec.init(document.getElementById('main4'),theme);
	        	var radius = [48, 55];
	        		option = {
	        		    legend: {
	        		        x : 'center',
	        		        y : 'center',
	        		        itemGap: 85,
	        		        padding:15,
	        		        data:[name]
	        		    },
	        		    title : {
	        		        x: 'center'
	        		    },
	        		    toolbox: {
	        		        show : false,
	        		        feature : {
	        		            dataView : {show: true, readOnly: false},
	        		            magicType : {
	        		                show: false, 
	        		                type: ['pie', 'funnel'],
	        		                option: {
	        		                    funnel: {
	        		                        width: '20%',
	        		                        height: '30%',
	        		                        itemStyle : {
	        		                            normal : {
	        		                                label : {
	        		                                    formatter : function (params){
	        		                                        return 'other\n' + params.value + '%\n'
	        		                                    },
	        		                                    textStyle: {
	        		                                        baseline : 'middle'
	        		                                    }
	        		                                }
	        		                            },
	        		                        } 
	        		                    }
	        		                }
	        		            },
	        		            restore : {show: true},
	        		            saveAsImage : {show: true}
	        		        }
	        		    },
	        		    series : [
							{
							    type : 'pie',
							    center : ['50%', '50%'],
							    radius : radius,
							    x:'40%', // for funnel
							    itemStyle : labelFromatter,
							    data : [
							        {name:'other', value:100-valueAddedTaxPercentage, itemStyle : labelBottom},
							        {name:'', value:valueAddedTaxPercentage,itemStyle : labelTop}
							    ]
							}
	        		    ]
	        		};
	        		// 为echarts对象加载数据 
	        	    myPie.setOption(option);
	        }
	    );
	},
	initIndivPie: function(name,individualIncomeTaxPercentage,labelTop,labelFromatter,labelBottom){
		// 使用
	    require(
	        [
	            'echarts',
	            'echarts/theme/macarons',
	            'echarts/chart/pie' // 使用折线图模块，按需加载
	        ],
	        function (ec,theme) {
	        	var myPie = ec.init(document.getElementById('main5'),theme);
	        	var radius = [48, 55];
	        		option = {
	        		    legend: {
	        		        x : 'center',
	        		        y : 'center',
	        		        itemGap: 85,
	        		        padding:15,
	        		        data:[name]
	        		    },
	        		    title : {
	        		        x: 'center'
	        		    },
	        		    toolbox: {
	        		        show : false,
	        		        feature : {
	        		            dataView : {show: true, readOnly: false},
	        		            magicType : {
	        		                show: false, 
	        		                type: ['pie', 'funnel'],
	        		                option: {
	        		                    funnel: {
	        		                        width: '20%',
	        		                        height: '30%',
	        		                        itemStyle : {
	        		                            normal : {
	        		                                label : {
	        		                                    formatter : function (params){
	        		                                        return 'other\n' + params.value + '%\n'
	        		                                    },
	        		                                    textStyle: {
	        		                                        baseline : 'middle'
	        		                                    }
	        		                                }
	        		                            },
	        		                        } 
	        		                    }
	        		                }
	        		            },
	        		            restore : {show: true},
	        		            saveAsImage : {show: true}
	        		        }
	        		    },
	        		    series : [
							{
	        		            type : 'pie',
	        		            center : ['50%', '50%'],
	        		            radius : radius,
	        		            x:'80%', // for funnel
	        		            itemStyle : labelFromatter,
	        		            data : [
	        		                {name:'other', value:100-individualIncomeTaxPercentage, itemStyle : labelBottom},
	        		                {name:'', value:individualIncomeTaxPercentage,itemStyle : labelTop}
	        		            ]
	        		        }
	        		    ]
	        		};
	        		// 为echarts对象加载数据 
	        	    myPie.setOption(option);
	        }
	    );
	},
	
	initPie : function (total,vatPercentage,enterpriseIncomeTaxPercentage,valueAddedTaxPercentage,individualIncomeTaxPercentage){
		//选择中颜色
		var totallabelTop = {
    		    normal : {
    		    	color: '#5e7ed7',
    		        label : {
    		            show : true,
    		            position : 'center',
    		            formatter : '{b}',
    		            textStyle: {
    		                baseline : 'bottom'
    		            }
    		        },
    		        labelLine : {
    		            show : false
    		        }
    		    }
    		};
		
		var vatPercentagelabelTop = {
    		    normal : {
    		    	color: '#16c6cc',
    		        label : {
    		            show : true,
    		            position : 'center',
    		            formatter : '{b}',
    		            textStyle: {
    		                baseline : 'bottom'
    		            }
    		        },
    		        labelLine : {
    		            show : false
    		        }
    		    }
    		};
		
		var enterpriseIncomelabelTop = {
    		    normal : {
    		    	color: '#f4bf4d',
    		        label : {
    		            show : true,
    		            position : 'center',
    		            formatter : '{b}',
    		            textStyle: {
    		                baseline : 'bottom'
    		            }
    		        },
    		        labelLine : {
    		            show : false
    		        }
    		    }
    		};
		
		var valueAddedTaxlabelTop = {
    		    normal : {
    		    	color: '#e2747d',
    		        label : {
    		            show : true,
    		            position : 'center',
    		            formatter : '{b}',
    		            textStyle: {
    		                baseline : 'bottom'
    		            }
    		        },
    		        labelLine : {
    		            show : false
    		        }
    		    }
    		};
		
		var individualIncomelabelTop = {
    		    normal : {
    		    	color: '#6eaee5',
    		        label : {
    		            show : true,
    		            position : 'center',
    		            formatter : '{b}',
    		            textStyle: {
    		                baseline : 'bottom'
    		            }
    		        },
    		        labelLine : {
    		            show : false
    		        }
    		    }
    		};
			//背景
    		var labelFromatter = {
    		    normal : {
    		        label : {
    		            formatter : function (params){
    		                return 100 - params.value + '%'
    		            },
    		            textStyle: {
    		                baseline : 'top'
    		            }
    		        }
    		    },
    		}
    		var totalLabelBottom = {
    		    normal : {
    		        color: '#5e7ed7',
    		        label : {
    		            show : true,
    		            position : 'center'
    		        },
    		        labelLine : {
    		            show : false
    		        }
    		    },
    		    emphasis: {
    		        color: 'rgba(0,0,0,0)'
    		    }
    		};
    		var vatPercentageLlabelBottom = {
        		    normal : {
        		        color: '#acdddd',
        		        label : {
        		            show : true,
        		            position : 'center'
        		        },
        		        labelLine : {
        		            show : false
        		        }
        		    },
        		    emphasis: {
        		        color: 'rgba(0,0,0,0)'
        		    }
        		};
    		var enterpriseIncomeTaxPercentageLlabelBottom = {
        		    normal : {
        		        color: '#f8e1a1',
        		        label : {
        		            show : true,
        		            position : 'center'
        		        },
        		        labelLine : {
        		            show : false
        		        }
        		    },
        		    emphasis: {
        		        color: 'rgba(0,0,0,0)'
        		    }
        		};
    		var valueAddedTaxPercentageLlabelBottom = {
        		    normal : {
        		        color: '#f3a59d',
        		        label : {
        		            show : true,
        		            position : 'center'
        		        },
        		        labelLine : {
        		            show : false
        		        }
        		    },
        		    emphasis: {
        		        color: 'rgba(0,0,0,0)'
        		    }
        		};
    		var labelBottom = {
        		    normal : {
        		        color: '#e5f7ff',
        		        label : {
        		            show : true,
        		            position : 'center'
        		        },
        		        labelLine : {
        		            show : false
        		        }
        		    },
        		    emphasis: {
        		        color: 'rgba(0,0,0,0)'
        		    }
        		};
    		dljzProcess.initTotalPie("",total,totallabelTop,labelFromatter,totalLabelBottom);
    		dljzProcess.initVatPie("",vatPercentage,vatPercentagelabelTop,labelFromatter,vatPercentageLlabelBottom);
    		dljzProcess.initEntPie("",enterpriseIncomeTaxPercentage,enterpriseIncomelabelTop,labelFromatter,enterpriseIncomeTaxPercentageLlabelBottom);
    		dljzProcess.initValPie("",valueAddedTaxPercentage,valueAddedTaxlabelTop,labelFromatter,valueAddedTaxPercentageLlabelBottom);
    		dljzProcess.initIndivPie("",individualIncomeTaxPercentage,individualIncomelabelTop,labelFromatter,labelBottom);
	}
}