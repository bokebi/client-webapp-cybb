var temproa = 0; //ROA
var tempzzl = 0;//总资产周转率
var temproe = 0;//ROE
var tempjlv = 0;//净利率
var periodArray = ['2016-1','2016-2','2016-3','2016-4','2016-5'];
var mlvData = [30,40,50,60,70];
var jlvData = [20,30,40,50,60];
var zcfzlData = [30,40,50,60,70];
var ldblData = [20,30,40,50,60];
var zczzlData = [30,40,50,60,70];
var yszkzzlData = [20,30,40,50,60];
var srzzlData = [30,40,50,60,70];
var lrzzlData = [20,30,40,50,60];

$(function (){
	loadPeriod();
	// echarts路径配置
    require.config({
        paths: {
            echarts: 'http://echarts.baidu.com/build/dist'
        }
    });
    
    $(".bussinessSelect").change(function(){
    	showTitlePeriod();
    	queryGaugeData();
    });
    
    $('.margindiv').on('mouseenter','.js_pos',function(){
		$(".companyQuantity").removeClass('none');
	});
    
	$('.margindiv').on('mouseleave','.js_pos',function(){
		$(".companyQuantity").addClass('none');
	});

	$(".rateImg").click(function() {
		if ($(this).hasClass("gaugeChart")) {
			$(".cutoverShow", $(this).parents(".pr")).slideDown("slow");
		} else {
			$(this).next().slideDown("slow");
		}
	});
	$(".rateImg1").click(function() {
		$(this).parent().slideUp("slow");
	});
    
    //queryGaugeData();
    //queryLineData();
    initGauge();
    initLine();
});

function loadPeriod(){
	$.ajax({
		   type: "POST",
		   url: dum.appName+"/myCompany/queryPeriodList.html",
		   success: function(data){
			   if(data){
				   $(".bussinessSelect").empty();
				   var options = '';
				   $.each(data,function(index,value){
					   options += '<option value="'+value.id+'">'+value.periodYear+'-'+value.periodNumber+'</option>';
				   })
				   $(".bussinessSelect").append(options);
				   $(".bussinessSelect option:last").attr("selected","selected");
				   queryGaugeData();
				   queryLineData();
			   }
			   showTitlePeriod();
		   }
	});
}

function showTitlePeriod(){
	var periodTxt=$(".bussinessSelect").find("option:selected").text();
	if(periodTxt){
		var periodArray = periodTxt.split("-");
		var displayPeriod = periodArray[0]+"年"+periodArray[1]+"期";
		$(".businessTit").html(displayPeriod+'<span class="ml20">经营方向标</span>');
	}
}

function queryLineData(){
	$(".lineLoading").showLoading();
	var periodId = $(".bussinessSelect").val();
	var companyId = $("#companyId").val();
	$.ajax({
		   type: "POST",
		   url: dum.appName+"/information/queryAbilityData.html",
		   data: {"companyId":companyId,"periodId":periodId},
		   success: function(data){
			   if(data){
				   if(data.periodList){
					   periodArray = [];
					   $.each(data.periodList, function(index,value) {
						   periodArray[index] = value.periodYear+"-"+value.periodNumber;
					   });
				   }
				   if(data.abilityMap){
					   if(data.abilityMap.ylnl){
						   mlvData=[];
						   jlvData=[];
						   var mlvtotal = 0;
						   var jlvtotal = 0;
						   var loop = 0;
						   $.each(data.abilityMap.ylnl, function(index,value) {
							   loop = loop + 1;
							   mlvtotal = mlvtotal + value[0];
							   jlvtotal = jlvtotal + value[1];
							   mlvData[index] = value[0];
							   jlvData[index] = value[1];
						   });
						   
						   var yearMlv = (mlvtotal/loop).toFixed(2);
						   var yearJlv = (jlvtotal/loop).toFixed(2);
						   $("#mllPullDown").text(yearMlv +"%");
						   $("#jlvPullDown").text(yearJlv+"%");
						   var aveRate = ((Number(yearMlv)+Number(yearJlv))/2).toFixed(2);
						   changeRate($("#ylnlRate"),aveRate);
					   }
					   if(data.abilityMap.cznl){
						   zcfzlData = [];
						   ldblData = [];
						   var zcfzltotal = 0;
						   var ldbltotal = 0;
						   var loop = 0;
						   $.each(data.abilityMap.cznl, function(index,value) {
							   loop = loop + 1;
							   zcfzltotal = zcfzltotal + value[0];
							   ldbltotal = ldbltotal + value[1];
							   zcfzlData[index] = value[0];
							   ldblData[index] = value[1];
						   });
						   var yearzcfzl = (zcfzltotal/loop).toFixed(2);
						   var yearldbl = (ldbltotal/loop).toFixed(2);
						   $("#fzlPullDown").text(yearzcfzl +"%");
						   $("#ldblPullDown").text(yearldbl+"%");
						   
						   var aveRate = ((Number(yearzcfzl)+Number(yearldbl))/2).toFixed(2);
						   changeRate($("#cznlRate"),aveRate);
					   }
					   if(data.abilityMap.yynl){
						   zczzlData = [];
						   yszkzzlData = [];
						   var zczzltotal = 0;
						   var yszkzzltotal = 0;
						   var loop = 0;
						   $.each(data.abilityMap.yynl, function(index,value) {
							   loop = loop + 1;
							   zczzltotal = zczzltotal + value[0];
							   yszkzzltotal = yszkzzltotal + value[1];
							   zczzlData[index] = value[0];
							   yszkzzlData[index] = value[1];
						   });
						   
						   var yearzczzl = (zczzltotal/loop).toFixed(2);
						   var yearyszkzzl = (yszkzzltotal/loop).toFixed(2);
						   $("#zczzlPullDown").text(yearzczzl +"%");
						   $("#yszkzzlPullDown").text(yearyszkzzl+"%");
						   
						   var aveRate = ((Number(yearzczzl)+Number(yearyszkzzl))/2).toFixed(2);
						   changeRate($("#yynlRate"),aveRate);
					   }
					   if(data.abilityMap.fznl){
						   srzzlData = [];
						   lrzzlData = [];
						   var srzzltotal = 0;
						   var lrzzltotal = 0;
						   var loop = 0;
						   $.each(data.abilityMap.fznl, function(index,value) {
							   loop = loop + 1;
							   srzzltotal = srzzltotal + value[0];
							   lrzzltotal = lrzzltotal + value[1];
							   srzzlData[index] = value[0];
							   lrzzlData[index] = value[1];
						   });
						   
						   var yearsrzzl = (srzzltotal/loop).toFixed(2);
						   var yearlrzzl = (lrzzltotal/loop).toFixed(2);
						   $("#srzzlPullDown").text(yearsrzzl +"%");
						   $("#lrzzlPullDown").text(yearlrzzl+"%");
						   
						   var aveRate = ((Number(yearsrzzl)+Number(yearlrzzl))/2).toFixed(2);
						   changeRate($("#fznlRate"),aveRate);
					   }
				   }
				   initLine();
			   }
			   $(".lineLoading").hideLoading();
		   },
	       error: function(xhr) {
	           $(".lineLoading").hideLoading();
	       }
	});
}

function changeRate(obj,aveRate){
	   if(aveRate <= 25){
		   $(obj).attr("src",dum.appName+"/v1/images/img/rate3.png");
		   $(obj).parent().next().text("薄弱");
	   }else if(aveRate > 25 && aveRate <= 50){
		   $(obj).attr("src",dum.appName+"/v1/images/img/rate2.png");
		   $(obj).parent().next().text("一般");
	   }else if(aveRate > 50 && aveRate <= 75){
		   $(obj).attr("src",dum.appName+"/v1/images/img/rate1.png");
		   $(obj).parent().next().text("良好");
	   }else if(aveRate > 75 && aveRate <= 100){
		   $(obj).attr("src",dum.appName+"/v1/images/img/rate4.png");
		   $(obj).parent().next().text("优秀");
	   }
}

function queryGaugeData(){
	$(".rateDataLoading").showLoading();
	var companyId = $("#companyId").val();
	var periodId = $(".bussinessSelect").val();
	$.ajax({
		   type: "POST",
		   url: dum.appName+"/information/operateDirection.html",
		   data: {"companyId":companyId,"accntPeriodId":periodId},
		   success: function(data){
			   if(data){
				   if(data.zczj){
					   $(".zczj").text(data.zczj);
				   }
				   if(data.syzqyhj){
					   $(".syzqyhj").text(data.syzqyhj);
				   }
				   if(data.yysr){
					   $(".yysr").text(data.yysr);
				   }
				   if(data.hbzj){
					   $(".hbzj").text(data.hbzj);
				   }
				   if(data.jlr){
					   $(".jlr").text(data.jlr);
				   }				   
				   if(data.jll){
					   tempjlv = data.jll;
				   }
				   if(data.roa){
					   temproa = data.roa;
				   }
				   if(data.zzl){
					   tempzzl = data.zzl;
				   }
				   if(data.roe){
					   temproe = data.roe;
				   }
				   initGauge();
			   }
			   $(".rateDataLoading").hideLoading();
		   },
	       error: function(xhr) {
	           $(".rateDataLoading").hideLoading();
	       }
	});
}

/**
 * 初始化仪表盘数据
 */
function initGauge(){
	// 使用
    require(
        [
            'echarts',
            'echarts/theme/macarons',
            'echarts/chart/gauge' // 使用柱状图就加载bar模块，按需加载
        ],
        function (ec,theme) {
        	gaugejlr(ec,theme);
        	gaugeroa(ec,theme);
        	gaugezzl(ec,theme);
        	gaugeroe(ec,theme);
        }
    );
}

function gaugejlr(ec,theme){
	// 基于准备好的dom，初始化echarts图表
    var myChart = ec.init(document.getElementById('main'),theme); 
    var option = {
    	    tooltip : {
    	        formatter: "{a} <br/>{b} : {c}%"
    	    },
    	    toolbox: {
    	        show : false,
    	        feature : {
    	            mark : {show: true},
    	            restore : {show: true},
    	            saveAsImage : {show: true}
    	        }
    	    },
    	    series : [
    	        {
    	            name:'净利率',
    	            type:'gauge',
    	            detail : {formatter:'{value}%',
    	            	show : true,
    	                textStyle: {
    	                	 color: '#e2747d',
    	                    fontSize : 15
    	                }
    	            },
    	            data:[{value: tempjlv, name: ''}]
    	        }
    	    ]
    	};
    // 为echarts对象加载数据 
    myChart.setOption(option);
    $("#jllPullDown").text(tempjlv.toFixed(2));
}

function gaugeroa(ec,theme){
	// 基于准备好的dom，初始化echarts图表
    var myChart = ec.init(document.getElementById('main1'),theme); 
    var option = {
    	    tooltip : {
    	        formatter: "{a} <br/>{b} : {c}%"
    	    },
    	    toolbox: {
    	        show : false,
    	        feature : {
    	            mark : {show: true},
    	            restore : {show: true},
    	            saveAsImage : {show: true}
    	        }
    	    },
    	    series : [
    	        {
    	            name:'ROA投资回报率',
    	            type:'gauge',
    	            detail : {formatter:'{value}%',
    	            	show : true,
    	                textStyle: {
    	                	 color: '#e2747d',
    	                    fontSize : 15
    	                }
    	            },
    	            data:[{value: temproa, name: ''}]
    	        }
    	    ]
    	};
    // 为echarts对象加载数据 
    myChart.setOption(option);
    $("#roaPullDown").text(temproa.toFixed(2));
}

function gaugezzl(ec,theme){
	// 基于准备好的dom，初始化echarts图表
    var myChart = ec.init(document.getElementById('main2'),theme); 
    
    var option = {
    	    tooltip : {
    	        formatter: "{a} <br/>{b} : {c}%"
    	    },
    	    toolbox: {
    	        show : false,
    	        feature : {
    	            mark : {show: true},
    	            restore : {show: true},
    	            saveAsImage : {show: true}
    	        }
    	    },
    	    series : [
    	        {
    	            name:'资产周转率',
    	            type:'gauge',
    	            detail : {formatter:'{value}%',
    	            	show : true,
    	                textStyle: {
    	                	 color: '#e2747d',
    	                    fontSize : 15
    	                }
    	            },
    	            data:[{value: tempzzl, name: ''}]
    	        }
    	    ]
    	};
    // 为echarts对象加载数据 
    myChart.setOption(option); 
}
function gaugeroe(ec,theme){
	// 基于准备好的dom，初始化echarts图表
    var myChart = ec.init(document.getElementById('main3'),theme); 
    
    var option = {
    	    tooltip : {
    	        formatter: "{a} <br/>{b} : {c}%"
    	    },
    	    toolbox: {
    	        show : false,
    	        feature : {
    	            mark : {show: true},
    	            restore : {show: true},
    	            saveAsImage : {show: true}
    	        }
    	    },
    	    series : [
    	        {
    	            name:'ROE股东权益报酬率',
    	            type:'gauge',
    	            detail : {formatter:'{value}%',
    	            	show : true,
    	                textStyle: {
    	                    color: '#e2747d',
    	                    fontSize : 15
    	                }
    	            },
    	            data:[{value: temproe, name: ''}]
    	        }
    	    ]
    	};
    // 为echarts对象加载数据 
    myChart.setOption(option);
    $("#roePullDown").text(temproe.toFixed(2));
}


function initylnl(ec,theme){
	// 基于准备好的dom，初始化echarts图表
    var myChart = ec.init(document.getElementById('ylnlChart'),theme);
    var option = {
    	    title : {
    	        text: '盈利能力',
    	    },
    	    tooltip : {
    	        trigger: 'axis'
    	    },
    	    legend: {
    	        data:['毛利率','净利率']
    	    },
    	    toolbox: {
    	        show : false,
    	        feature : {
    	            mark : {show: true},
    	            dataView : {show: true, readOnly: false},
    	            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
    	            restore : {show: true},
    	            saveAsImage : {show: true}
    	        }
    	    },
    	    calculable : true,
    	    xAxis : [
    	        {
    	            type : 'category',
    	            boundaryGap : false,
    	            data : periodArray
    	        }
    	    ],
    	    yAxis : [
    	        {
    	            type : 'value'
    	        }
    	    ],
    	    series : [
    	        {
    	            name:'毛利率',
    	            type:'line',
    	            smooth:true,
    	            data:mlvData
    	        },
    	        {
    	            name:'净利率',
    	            type:'line',
    	            smooth:true,
    	            data:jlvData
    	        }
    	    ]
    	};
    
    // 为echarts对象加载数据 
    myChart.setOption(option);
}

function inityynl(ec,theme){
	// 基于准备好的dom，初始化echarts图表
    var myChart = ec.init(document.getElementById('ylnlChart1'),theme);
    var option = {
    	    title : {
    	        text: '运营能力',
    	    },
    	    tooltip : {
    	        trigger: 'axis'
    	    },
    	    legend: {
    	        data:['总资产周转率','应收账款周转率']
    	    },
    	    toolbox: {
    	        show : false,
    	        feature : {
    	            mark : {show: true},
    	            dataView : {show: true, readOnly: false},
    	            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
    	            restore : {show: true},
    	            saveAsImage : {show: true}
    	        }
    	    },
    	    calculable : true,
    	    xAxis : [
    	        {
    	            type : 'category',
    	            boundaryGap : false,
    	            data : periodArray
    	        }
    	    ],
    	    yAxis : [
    	        {
    	            type : 'value'
    	        }
    	    ],
    	    series : [
    	        {
    	            name:'总资产周转率',
    	            type:'line',
    	            smooth:true,
    	            data:zczzlData
    	        },
    	        {
    	            name:'应收账款周转率',
    	            type:'line',
    	            smooth:true,
    	            data:yszkzzlData
    	        }
    	    ]
    	};
    
    // 为echarts对象加载数据 
    myChart.setOption(option); 
}
function initcznl(ec,theme){
	// 基于准备好的dom，初始化echarts图表
    var myChart = ec.init(document.getElementById('ylnlChart2'),theme);
    var option = {
    	    title : {
    	        text: '偿债能力',
    	    },
    	    tooltip : {
    	        trigger: 'axis'
    	    },
    	    legend: {
    	        data:['资产负债率','流动比率']
    	    },
    	    toolbox: {
    	        show : false,
    	        feature : {
    	            mark : {show: true},
    	            dataView : {show: true, readOnly: false},
    	            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
    	            restore : {show: true},
    	            saveAsImage : {show: true}
    	        }
    	    },
    	    calculable : true,
    	    xAxis : [
    	        {
    	            type : 'category',
    	            boundaryGap : false,
    	            data : periodArray
    	        }
    	    ],
    	    yAxis : [
    	        {
    	            type : 'value'
    	        }
    	    ],
    	    series : [
    	        {
    	            name:'资产负债率',
    	            type:'line',
    	            smooth:true,
    	            data:zcfzlData
    	        },
    	        {
    	            name:'流动比率',
    	            type:'line',
    	            smooth:true,
    	            data:ldblData
    	        }
    	    ]
    	};
    
    // 为echarts对象加载数据 
    myChart.setOption(option); 
}

function initfznl(ec,theme){
	// 基于准备好的dom，初始化echarts图表
    var myChart = ec.init(document.getElementById('ylnlChart3'),theme);
    var option = {
    	    title : {
    	        text: '发展能力',
    	    },
    	    tooltip : {
    	        trigger: 'axis'
    	    },
    	    legend: {
    	        data:['收入增长率','利润增长率']
    	    },
    	    toolbox: {
    	        show : false,
    	        feature : {
    	            mark : {show: true},
    	            dataView : {show: true, readOnly: false},
    	            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
    	            restore : {show: true},
    	            saveAsImage : {show: true}
    	        }
    	    },
    	    calculable : true,
    	    xAxis : [
    	        {
    	            type : 'category',
    	            boundaryGap : false,
    	            data : periodArray
    	        }
    	    ],
    	    yAxis : [
    	        {
    	            type : 'value'
    	        }
    	    ],
    	    series : [
    	        {
    	            name:'收入增长率',
    	            type:'line',
    	            smooth:true,
    	            data:srzzlData
    	        },
    	        {
    	            name:'利润增长率',
    	            type:'line',
    	            smooth:true,
    	            data:lrzzlData
    	        }
    	    ]
    	};
    
    // 为echarts对象加载数据 
    myChart.setOption(option); 
}

/**
 * 初始化折线图数据
 */
function initLine(){
	// 使用
    require(
        [
            'echarts',
            'echarts/theme/macarons',
            'echarts/chart/line' // 使用折线图模块，按需加载
        ],
        function (ec,theme) {
        	initylnl(ec,theme);
        	inityynl(ec,theme);
        	initcznl(ec,theme);
        	initfznl(ec,theme);
        }
    );
}

