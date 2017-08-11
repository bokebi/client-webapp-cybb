$(function() {
	coupon.init();
});

var coupon = {
	turnAddVoucherId : null,// 正在转增优惠劵id
	init : function() {
		coupon.loadVoucher();

	},
	// 加载用户优惠劵
	loadVoucher : function() {
		dum.common.ajax({
			type : "get",
			url : "/voucher/findMySysVoucherInfo.html",
			success : function(data) {
				coupon.buildVoucherHtml($('#voucherList'), data);

				// 转增优惠劵窗口
				$('#voucherList div.donation').click(function() {
					coupon.turnAddVoucherId = $(this).attr('id');
					$('div.donationDiv').show();
				});
				// 关闭转增优惠劵窗口
				$('div.donationDivColse').click(function() {
					$('div.donationDiv').hide();
					$('div.donationDiv :text.donationText').val('');
					$('div.donationSuccess').hide();
					coupon.turnAddVoucherId = null;
				});
				// 转增优惠劵
				$('div.donationDiv .donatiDetermine').click(coupon.turnAdd);
			}
		});
	},
	// 优惠劵状态
	buildVouchState : function(state, startTime, endTime) {
		var obj = {};
		if ('1' == state) {
			obj['key'] = false;
			obj['value'] = '已使用';
			return obj;
		}
		if (coupon.isNull(endTime)) {
			obj['key'] = true;
			obj['value'] = '永久有效';
			return obj;
		}
		if (Date.parse(coupon.formatSeparatorDate(endTime))
				- Date.parse(coupon.formatSeparatorDate(new Date())) < 0) {
			obj['key'] = false;
			obj['value'] = '使用时间已失效';
			return obj;
		}
		if (!coupon.isNull(state) && !coupon.isNull(startTime)
				&& !coupon.isNull(endTime) && '0' == state) {
			obj['key'] = true;
			obj['value'] = '有效期:' + coupon.formatSeparatorDate(startTime, '.')
					+ '-' + coupon.formatSeparatorDate(endTime, '.');
			return obj;
		}
	},
	// 构造优惠劵html
	buildVoucherHtml : function(container, data) {
		var availableHtml = '';
		var disabledHtml = '';
		for (var i = 0; i < data.length; i++) {
			var obj = coupon.buildVouchState(data[i].voucherStatus,
					data[i].sysVoucher.voucherInfo.startTime, data[i].sysVoucher.voucherInfo.endTime);
			var tmpHtml = '';
			tmpHtml += '<li id="voucher_' + data[i].sysVoucher.voucherInfo.id + '" class="'
					+ (obj['key'] ? "couponSelect" : "noCouponSelect") + '">';
			tmpHtml += '<div>';
			tmpHtml += '<div class="couponSum"><span>￥</span>' + data[i].sysVoucher.amount
					+ '</div>';
			tmpHtml += '<p class="fl ml10">' + obj['value'];
			/*if (obj['key']) {
				tmpHtml += '<div class="fr donation" id=' + data[i].sysVoucher.voucherInfo.id
						+ '>转赠</div>';
				tmpHtml += '<div class="cb"></div>';
			}*/
			tmpHtml += '</div>';
			tmpHtml += '</li>';
			if (obj['key']) {
				availableHtml += tmpHtml;
			} else {
				disabledHtml += tmpHtml;
			}
		}
		container.html('').html(availableHtml + disabledHtml);
	},
	// 转增优惠劵
	turnAdd : function() {
		if (null != coupon.turnAddVoucherId) {
			var mobile = $('div.donationDiv :text.donationText').val();
			if (!dum.isPhone(mobile)) {
				$('div.donationSuccess').html('请填写正确的手机号码!').show().delay(1500)
						.hide(0);
				return;
			}
			if (mobile == $('#custMobile').val()) {
				$('div.donationSuccess').html('不可以转增自己!').show().delay(1500)
						.hide(0);
				return;
			}
			dum.common.ajax({
				type : "post",
				url : "/voucher/turnAdd.do",
				data : {
					'receivingMobile' : mobile,
					'voucherId' : coupon.turnAddVoucherId
				},
				dataType : "json",
				success : function(data) {
					if ('1' == data['state']) {
						$('div.donationSuccess').html('转赠成功！').show().delay(
								1500).hide(0);
						window.setTimeout(function() {
							$('div.donationDivColse').click();
						}, 2000);

						$('#voucher_' + coupon.turnAddVoucherId).hide(1500);
						coupon.turnAddVoucherId = null;

					} else if ('0' == data['state']) {
						$('div.donationSuccess').html(data['msg']).show()
								.delay(1500).hide(0);
					}
				}
			});
		}

	},
	formatSeparatorDate : function(date, separator) {
		if (coupon.isNull(date)) {
			return '';
		}
		separator = coupon.isNull(separator) ? '-' : separator;
		var d = new Date(date);
		return d.getFullYear() + separator + dum.getTwoTime(d.getMonth() + 1)
				+ separator + dum.getTwoTime(d.getDate());
	},
	isNull : function(obj) {
		if (obj == undefined || obj == null || obj == "") {
			return true
		}
		return false;
	}
	
};
