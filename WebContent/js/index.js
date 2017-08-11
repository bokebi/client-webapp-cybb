;
var _baseServer = 'https://general.yirendai.com',
_www = 'https://www.yirendai.com/LandingPage/mhd/success/index.html',
cookieUrl = '.yirendai.com',
path = '/',
configUrl = {
    activityMark: '79779557-562c-3edb-a24e-1c8ca12fabab',
    wapRegisterUrl: _baseServer + '/loan/wapRegister',
    wapSendMsg: _baseServer + '/loan/wapSendMsg',
    wapReSendMsg: _baseServer + '/loan/wapReSendMsg',
    getVerify: _baseServer + '/loan/getVerify',
};
var uuid = new Date().getTime();
function setCookie(i, a, t, n) {
    var e = new Date(),
    r = '';
    e.setTime(e.getTime() + (60 * 365 * 60 * 24 * 1000));
    r = ';expires=' + e.toUTCString();
    t = t || '.yirendai.com';
    i = i || '_uid';
    n = '/';
    document.cookie = i + '=' + a + r + ';domain=' + t + ';path=' + n
};
function isMobile(i) {
    var t = /^1\d{10}$/;
    if (t.test(i)) {
        return ! 0
    } else {
        return ! 1
    }
};
function UrlSearch() {
    var r, a, n = location.href,
    t = n.indexOf('?');
    n = n.substr(t + 1);
    var e = n.split('&');
    for (var i = 0; i < e.length; i++) {
        t = e[i].indexOf('=');
        if (t > 0) {
            r = e[i].substring(0, t);
            a = e[i].substr(t + 1);
            this[r] = a
        }
    }
};
$(function() {
    var o = null,
    t = 60,
    e, r = new UrlSearch(),
    a = r.utm_source;
    $('#lp-input-span-month, .lp-input-month-cont a').on('click',
    function() {
        $('.lp-input-month-cont-ul').slideToggle(300)
    });
    $('.lp-input-month-cont-ul p').on('click',
    function() {
        $('#lp-input-month').val($(this).attr('data-m'));
        $('#lp-input-span-month').text($(this).text());
        $('.lp-input-month-cont-ul').slideUp(300)
    });
    $('.lp-input-subimt-btn').on('click',
    function() {
        $.ajax({
			type : "post",
			url : "/customer/checkname.api",
			data : $('#queryCompanyNameForm').serialize()+"&sourceId=1",
			dataType : "json",
			success : function(data) {
				if(data.executeStatus == '0'){
					$('#queryCompanyNameForm')[0].reset();
					alert("申请成功!");
				}
			}
		});
    });
    function n() {
        e = setInterval(function() {
            if (t == 0) {
                clearInterval(e);
                t = 60;
                $('.lp-fixed-input a').show().css({
                    'display': 'inline-block'
                });
                $('.lp-fixed-input b').hide()
            };
            t--;
            $('.lp-fixed-input b').text(t + '秒后再次获取')
        },
        1000)
    };
    function l(i) {
        var t = /(\d{3})\d{4}(\d{4})/;
        i = i.replace(t, '$1****$2');
        return i
    };
    $('#fixCodeBtn').on('click',
    function() {
        $('.lp-input-tips').text('');
        var i = $.trim($('#lp-mobile').val()),
        t = $('#lp-pw').val(),
        e = $.trim($('#lp-imgCode').val());
        $.ajax({
            url: configUrl.wapReSendMsg,
            data: {
                mobile: $.trim(i),
                activityMark: configUrl.activityMark,
                uuid: uuid
            },
            dataType: 'jsonp',
            type: 'POST',
            success: function() {
                n();
                $('.lp-fixed-input a').hide();
                $('.lp-fixed-input b').show().css({
                    'display': 'inline-block'
                })
            }
        })
    });
    $('#fixCode').focus(function() {
        $('.lp-fixed-input i').hide().text('')
    });
    $('#lp-fixed-submit').on('click',
    function() {
        if ($('#fixCode').val() == '') {
            $('.lp-fixed-input i').show().text('请输入验证码');
            return
        };
        var i = $.trim($('#lp-mobile').val()),
        t = $('#lp-pw').val(),
        e = $.trim($('#lp-imgCode').val());
        $.ajax({
            url: configUrl.wapRegisterUrl,
            data: {
                code: $.trim($('#fixCode').val()),
                mobile: $.trim(i),
                password: $.trim(t),
                activityMark: configUrl.activityMark,
                clientType: 'pc',
                source: a
            },
            dataType: 'jsonp',
            type: 'GET',
            success: function(t) {
                if (t.error.code != 0) {
                    $('.lp-fixed-input i').show().text(t.error.message)
                } else {
                    var e = $.trim(i),
                    n = e.substr(3, 4);
                    setCookie('_uid', t.data.userId, cookieUrl, path);
                    window.location.href = _www + '?u=' + e.replace(n, '****') + '&userId=' + t.data.userId
                }
            }
        })
    });
    function i() {
        uuid = new Date().getTime();
        var i = configUrl.getVerify + '?uuid=' + uuid + '&activityMark=' + configUrl.activityMark;
        $('#lpCode').attr('src', i)
    };
    $('#lpCode').on('click',
    function() {
        i()
    });
    i();
    $('#fixedClose').on('click',
    function() {
        $('.lp-d-main').fadeOut(300);
        clearInterval(e);
        t = 60;
        $('.lp-fixed-input a').hide();
        $('.lp-fixed-input b').show().css({
            'display': 'inline-block'
        })
    });
    $('.lp-register, #pc-lp-banner3a, .pc-lp-calculator-cont-a').on('click',
    function() {
        if ($('html').scrollTop()) {
            $('html').animate({
                scrollTop: 100
            },
            500);
            return ! 1
        };
        $('body').animate({
            scrollTop: 100
        },
        500);
        return ! 1
    })
})