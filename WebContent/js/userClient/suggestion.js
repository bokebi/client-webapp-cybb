$(function() {

	/* 清除错误提示 */
	$('input[name="adviseTitle"],textarea[name="adviseContent"]').focus(
			function() {
				$(this).next('span.tips').text('');
			});

	/* 提交投诉建议 */
	$('#submitSugg').click(
			function() {
				var adviseTitle = $('input[name="adviseTitle"]').val();
				var adviseContent = $('textarea[name="adviseContent"]').val();
				if (null == adviseTitle || '' == adviseTitle) {
					$('input[name="adviseTitle"]').next('span.tips').html(
							'<span class="icon"></span>请输入您要投诉的问题');
					return;
				}
				if (null == adviseContent || '' == adviseContent) {
					$('textarea[name="adviseContent"]').next('span.tips').html(
							'<span class="icon"></span>请输入您要投诉的内容');
					return;
				}
				if (adviseContent.length > adviseContentMaxInput) {
					$('textarea[name="adviseContent"]').next('span.tips').html(
							'<span class="icon"></span>最多只能输入500字内容');
					return;
				}
				dum.common.ajax({
					url : "/customer/customerCusAdviseEdit.api",
					type : "post",
					data : {
						'adviseTitle' : adviseTitle,
						'adviseContent' : adviseContent
					},
					success : function(data) {
						window.location.reload();
					}
				})
			});

	/* 统计输入字符 */
	$('textarea[name="adviseContent"]').keydown(limit).keyup(limit)
	.click(limit).focus(function() {
		window.document.oncontextmenu = function() {
			return false;
		}
	}).blur(function() {
		window.document.oncontextmenu = function() {
			return true;
		}
	});

});
var adviseContentMaxInput = 500;

function limit(e) {
var value = $(this).val();
if (value.length > adviseContentMaxInput && e.keyCode!=8) {
	$(this).val(value.substring(0,499));
	$(".limit").text("500/500");
e.preventDefault();
}
	$(this).siblings('span.limit').text(
			value.length + "/" + adviseContentMaxInput);
}