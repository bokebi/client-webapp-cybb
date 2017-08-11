$(function (){
	$(".clearing").click(function(){
		if($('#js_allCheck').prop('checked')){
			if(!$('#js_invoice').hasClass('js_saved')){
				dum.verifiy('js_invoice');
				alert('请保存发票信息');
				return false;
			};
		};
		$(this).parents("form").submit();
	});
	$('#print_ticket').click(function(){
		if($(this).hasClass('icon_uncheck')){
			$(this).addClass('icon_check').removeClass('icon_uncheck');
			$('.openInvoice').css({'visibility':'visible'});
		}else{
			$(this).removeClass('icon_check').addClass('icon_uncheck');
			$('.openInvoice').css({'visibility':'hidden'});
		};
	});
	$('.invoiceClose').click(function(){
		$('#print_ticket').click();
	});
	$(".invoiceInfo a").click(function(){
		if(!dum.verifiy('js_invoice')){
			$('input[name="invoiceTitle"]').addClass('waring');
		}else{
			$('.openInvoice').css({'visibility':'hidden'});
			$('#js_invoice').addClass('js_saved');
		}
	});
	$('#voucherList').change(chooseVoucher);
})
var oldTotalPrice;
var oldPreferentialPrice;
// 选择优惠劵
function chooseVoucher() {
	$('#js_aprice').text(oldTotalPrice);
	var _voucher = $('#voucherList :selected');
	if ('-1' != _voucher.val()) {
		oldPreferentialPrice = parseFloat(
				$('#js_bprice').text().replace('￥', '')).toFixed(2);
		oldTotalPrice = parseFloat($('#js_aprice').text()).toFixed(2);
		var voucherPrice = parseFloat(_voucher.val()).toFixed(2);
		var totalPrice = $.fn.accSub(oldTotalPrice, voucherPrice);
		if(totalPrice<0){
			totalPrice=0;
		}
		var preferentialPrice = $.fn.accAdd(oldPreferentialPrice, voucherPrice);
		$('#preferentialed').text('-￥' + voucherPrice).show();
		$('#js_aprice').text(totalPrice);
		//$('#js_bprice').text('￥' + preferentialPrice.toFixed(2));
		$('#voucherid').val(_voucher.attr('voucherid'));
	} else {
		$('#js_aprice').text(oldTotalPrice);
		//$('#js_bprice').text('￥' + oldPreferentialPrice);
		$('#voucherid').val('');
		$('#preferentialed').text('').hide();
	}
}
