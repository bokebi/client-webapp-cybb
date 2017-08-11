var payment = {};

payment = {
	toPayment : function(param) {
		if(!param || param.length <= 0) {
			return;
		}
		dum.cache.paymentParam = param;
		dum.common.get("/payment/toPayment.do", {} , function(data){
			$("#home_centext").eq(0).dumLoad(data);
		});
	}
};

dum.loginKeepUp = function(cache) {
	if(cache.paymentParam && cache.paymentParam.length > 0) {
		$("div.nav_top").dumLoad("/jsp/dum/common/top.jsp");
		payment.toPayment(cache.paymentParam);
	}else if(dum.loginingNoAction) {
		$("div.nav_top").dumLoad("/jsp/dum/common/top.jsp");
	} else {
		dum.forword("/jsp/services/reservServices.jsp");
	}
}