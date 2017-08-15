$(function() {
	//首页导航默认显示出来
	$(".childNav").show();
	$(".childNavDl").show();
	$(".clildNavDiv").hide();
	
	$(".title .close").click(function() {
		$(".propBox").hide();
		$("input[name=nuclearText]").val("");
	});

	// 创业资讯选项卡切换2017-04-05
	$(".message-side").slide({
		titCell : ".message-title a",
		mainCell : ".message-side-box",
		trigger : "mouseover",
		autoPlay : true,
		autoPage : false,
		delayTime : 800,
		titOnClassName : "active",
		effect : "left"
	});
})
$("#login-btn").removeAttr("disabled").css({
	"backgroundColor" : "#ffc107",
	"cursor" : "pointer"
});


//上部banner处提交查询公司7-14
$(".queryCompanyBtn").click(function() {
	var that = this;
	if (dum.verifiy('queryCompanyNameForm')) {
	} else {
		return false;
	}
	dum.common.ajax({
		type : "post",
		url : "/customer/checkname.api",
		data : $('#queryCompanyNameForm').serialize() + "&sourceId=1",
		dataType : "json",
		success : function(data) {
			if (data.executeStatus == '0') {
				$(".propBox").hide();
				$("#queryName").val("");
				$('#queryCompanyNameForm')[0].reset();
				$(".propBox1").show();

			}
		}
	});
});

// 修改公司核名7-14
$(function() {
	$('.ksxc1').click(function() {
		var hmTxt = $(".inquire_btn").val();
		var hmTxt2 = $(".inquire_btn2").val();
		if (!hmTxt) {
			hmTxt = hmTxt2;
		}
		$("#companyName").val(hmTxt);
		$('.propBox').show();
	})
	$('.close').click(function() {
		$('.propBox').hide();
		$(".inquire_btn").val('')
		$('.propBox1').hide();
	})
	$('.hmcx2').mouseover(function() {
		$('.hmcx4').show();
	}).mouseleave(function() {
		$('.hmcx4').hide();
	});
	$(".hmcx4>span").click(function() {
		$('.hmcx3').html($(this).text());
		$('.hmcx4').hide();
	})
})

//新增分公司切换展示
jQuery(".picScroll-left").slide({
	titCell:".hd ul",
	mainCell:".bd ul",
	autoPage:true,
	effect:"leftLoop",
	autoPlay:true,
	vis:4,
	trigger:"click"
});