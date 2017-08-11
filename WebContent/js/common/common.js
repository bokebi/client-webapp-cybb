
$(function() {
	var appName = $("#home_app_Name").val();
	var currentId = $('#current_area_id').val();
	dum.appName = (null == appName || undefined == appName) ? "" : "/" == appName ? "" : appName;
	dum.currentId = (null == currentId || undefined == currentId) ? "" : "/" == currentId ? "" : currentId;
	dum.footer();
	dum.numbers('math');
});

var dum = {
	common : {
		ajax : function(param) {
			// 弹出锁屏层
			var complete;
			var success;
			if(param.complete) {
				complete = param.complete;
			}
			
			if(param.success) {
				success = param.success;
			}
			
			param.complete = function(data) {
				// 关闭层
				dum.isLoad(data);
				if(complete) {
					complete(data);
				}
			};
			
			param.success = function(data) {
				if(data && typeof data == "string") {
					if(/^{(.+:.+)+}*$/g.test(data)) {
						var result =  eval('(' + data + ')');
						if(result.sessionDestroyed == "true") {
							return true;
						}
						if(result.isLogin == true) {
							return true;
						}
					}
				}
				success(data);
			}
			param.url = dum.appName + param.url;
			$.ajax(param);
		},
		get : function(url, param, callback) {
			// 弹出锁屏层
			url += (url.indexOf(".do?") > 0) ? "&" : "?";
			url += "1=" + new Date();
			url = dum.appName + url;
			$.get(url,param,function(data) {
				// 关闭层
				dum.isLoad(data);
				callback(data);
			});
		},
		post : function(url, param, callback) {
			// 弹出锁屏层
			url = dum.appName + url;
			url += (url.indexOf(".do?") > 0) ? "&" : "?";
			url += "1=" + new Date();
			$.post(url,param,function(data) {
				// 关闭层
				dum.isLoad(data);
				callback(data);
			});
		},
		isNull : function(obj) {
			if(obj == undefined || obj == null || obj == "") {
				return true
			}
			return false;
		},
		getWebRootPath : function() {
		    var webroot=document.location.href;
		    webroot=webroot.substring(webroot.indexOf('//')+2,webroot.length);
		    webroot=webroot.substring(webroot.indexOf('/')+1,webroot.length);
		    webroot=webroot.substring(0,webroot.indexOf('/'));
		    var rootpath="/"+webroot;
		    return rootpath;
		},
		showDialog:function(width, height) {
			$("div[id='_showDialog']").remove();
			var div = $("body").eq(0).addDiv({id:"_showDialog"});
			div.addDiv({"class" : "theme-popover-mask"});
			var cen = div.addDiv({"class" : "theme-popover"});
			if(width) {
				cen.css({width:width});
			}
			if(height) {
				cen.css({height:height});
			}
			var title = $(cen).addDiv({"class":"theme-poptit"});
			var body = cen.addDiv({"class":"theme-popbod dform"});
			$(title).addA({"title":"关闭", "class":"close","href":"javascript:;"}).text("×").click(function() {
				if(body.beforeClose) {
					body.beforeClose();
				}
				dum.cache = {};
				div.remove();
			});
			body.closeCentext = function() {
				$("div.theme-popover", $(this).parent().parent()).remove();
			};
			body.setTitle = function(title) {
				var _title = $("<h3>");
				_title.text(title);
				$("div.theme-poptit", $(this).parent()).append(_title);
			};
			body.close = function() {
				// 非主动点击X关闭。不需要跳转首页
				$(this).parent().parent().remove();
			};
			body.closeTitle = function() {
				$("div.theme-poptit", $(this).parent()).remove();
			};
			body.resize = function() {
				var screenWidth = $(window).width();
				var screenHeight = $(window).height();
				var left = (screenWidth - $(cen).width())/2 ;         
				var top = (screenHeight - $(cen).height())/2;
				
				$(this).parent().css({left: left + 'px', top : ($(document).scrollTop() + top)+"px"});
				
			};
			
			body.onClose = function(close) {
				if(close) {
					body.beforeClose = close;
				}
			};
			body.setSize = function(width, height) {
				if(width) {
					cen.parent().css({width:width});
				}
				if(height) {
					cen.parent().css({height:height});
				}
				$(this).resize();
			};
			body.resize();
			return body;
		}
	},
	currentUser : function() {
		
	},
	/** 深圳市地址编码 */
	AREA_SZ_CODE: "AAA",
	forword : function(url, callback) {
		window.location.href = dum.appName + url;
    },
    isLoad : function(data) {
    	
    	if(data.responseText) {
    		data = data.responseText;
    	}
    	
    	if(data && typeof data == "string") {
			if(/^{(.+:.+)+}*$/g.test(data)) {
				var result =  eval('(' + data + ')');
				if(result.isLogin == true) {
					dum.login.showlogin();
					return true;
				}
			}
		}
    },
    // 缓存数据
    cache : {},
    formatDate: function(dd) {
    	if(!dd||dd=='undefined'){
    		return '';
    	}
    	var d=new Date(dd);
    	return d.getFullYear()
    		+"-"+dum.getTwoTime(d.getMonth()+1)
    		+"-"+dum.getTwoTime(d.getDate());
    },
    formatCNDate: function(dd) {
    	if(!dd||dd=='undefined'){
    		return '';
    	}
    	var d=new Date(dd);
    	return d.getFullYear()
    		+"年"+dum.getTwoTime(d.getMonth()+1)
    		+"月"+dum.getTwoTime(d.getDate())
    		+"日";
    },
    formatDateTime: function(dd) {
    	if(!dd||dd=='undefined'){
    		return '';
    	}
    	var d=new Date(dd);
    	return d.getFullYear()
    		+"-"+dum.getTwoTime(d.getMonth()+1)
    		+"-"+dum.getTwoTime(d.getDate())
    		+" "+dum.getTwoTime(d.getHours())
    		+":"+dum.getTwoTime(d.getMinutes())
    		+":"+dum.getTwoTime(d.getSeconds());
    },
  //获取两位数的时间
    getTwoTime : function(t){
    	if(t<10){
    		return "0"+t;
    	}
    	return t;
    },
    pagingPage : function(table, data, pageNo, callback) {
    	pageNo = parseInt(pageNo);
    	$("ul.recommenPaging", $(table).parent()).remove();
    	$("p.recommenBord", $(table).parent()).remove();
    	var ul = $("<ul class=\"recommenPaging\">");
    	$(table).after(ul);
    	$(table).after("<p class='recommenBord'>");
    	var pageCount = parseInt(data.totalCount/10) + (data.totalCount % 10 != 0 ? 1 : 0);
    	pageCount = pageCount == 0 ? 1 : pageCount;
    	ul.addLi().addA().text("首页").click(function() {
    		if(pageNo > 1) {
    			callback(1);
    		}
    	});
    	ul.addLi().addA().text("上一页").click(function() {
    		if(pageNo > 1) {
    			callback(--pageNo);
    		}
    	});
    	var start = (pageNo - 2) >= 1 ? (pageNo - 2) : (pageNo - 1) >= 1 ? (pageNo - 1) : pageNo;
    	var end = ((pageNo + 2) <= pageCount) ? (pageNo + 2) : ((pageNo + 1) <= pageCount) ? (pageNo + 1) : pageNo;
    	end = pageNo - 2 <= 0 ? (pageCount > 5 ? 5 : pageCount) : end;
    	start = pageNo + 2 >= pageCount ? (pageCount - 4) > 1 ? (pageCount - 4) : 1 : start;
    	for(var i = start; i <= end; i++) {
    		ul.addLi().addA().text(i).click(function() {
    			callback($(this).text());
    		});
    	}
    	ul.addLi().addA().text("下一页").click(function() {
    		if(pageNo < pageCount) {
    			callback(++pageNo);
    		}
    	});
    	ul.addLi().addA().text("末页").click(function(){
    		if(pageNo < pageCount) {
    			callback(pageCount);
    		}
    	});
    	ul.addLi().addA().text("共"+pageNo+"/"+pageCount+"页");
    },
	footer:function(){
		var bh = $('body').height(),wh = $(window).height();
		if(bh<wh){
			$('.footer').css({'position':'absolute','bottom':'0','width':'100%'})
		}
	},
	//校验手机号码
	isPhone : function (str){
		if(!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(str))){
			return false;
		}else{
			return true;
		}
	},
	verifiy:function(ele){
		var ele_obj = $('#'+ele),input_obj = ele_obj.find('input,textarea'),
		flags = [],flag = true;
		$.each(input_obj,function(i,item){
			var val = $(item).val();
			if(val == '' || val == undefined || typeof(val)=='undefined'){
				flags.push(false);
				$(item).parents('li').find('.tips').css({'display':'inline-block'});
			}else{
				if($(item).attr('verifiy') == 'phone'){
					if(dum.isPhone(val)){
						flags.push(true);
					}else{
						flags.push(false);
						$(item).parents('li').find('.tips').css({'display':'inline-block'})
					}
				}else{
					flags.push(true);
				}
			}
		});
		$.each(flags,function(i,item){
			item ? $(input_obj[i]).removeClass('waring'):$(input_obj[i]).addClass('waring');
			item && flag ? flag = true : flag = false;
		});
		input_obj.on('keyup',function(){
			if($(this).val())
				$(this).removeClass('waring');
				$(this).parents('li').find('.tips').hide();
		});
		return flag;
	},
	numbers:function(inputs){
		$('input.'+inputs).on('keydown',function(){
//			console.log(event.keyCode+'*******'+event.returnValue);
			var keyCode = event.keyCode,flag = false;
			keyCode <= 57 ? flag = true : 
				keyCode < 96 ? flag : 
					keyCode > 105 ? flag : flag = true;
			if(!flag){
				return false;
			}
		});
	}
}
// 设置Web应用名

// 扩展方法
$.fn.extend({
	addTable : function(attr) {
		var table = $("<table>");
		if(attr) {
			table.attr(attr);
		}
		$(this).append(table);
		return table;
	},
	addTr : function(attr) {
		var tr = $("<tr>");
		if(attr) {
			tr.attr(attr);
		}
		$(this).append(tr);
		return tr;
	},
	addTd : function(attr) {
		var td = $("<td>");
		if(attr) {
			td.attr(attr);
		}
		$(this).append(td);
		return td;
	},
	addDiv : function(attr) {
		var div = $("<div>");
		if(attr) {
			div.attr(attr);
		}
		$(this).append(div);
		return div;
	},
	addUl : function(attr) {
		var ul = $("<ul>");
		if(attr) {
			ul.attr(attr);
		}
		$(this).append(ul);
		return ul;
	},
	addLi : function(attr) {
		var li = $("<li>");
		if(attr) {
			li.attr(attr);
		}
		$(this).append(li);
		return li;
	},
	addInput : function(attr) {
		var input = $("<input>");
		if(attr) {
			input.attr(attr);
		}
		$(this).append(input);
		return input;
	},
	addP : function(attr) {
		var p = $("<p>");
		if(attr) {
			p.attr(attr);
		}
		$(this).append(p);
		return p;
	},
	addSpan : function(attr) {
		var span = $("<span>");
		if(attr) {
			span.attr(attr);
		}
		$(this).append(span);
		return span;
	},
	addSelect : function(attr) {
		var select = $("<select>");
		if(attr) {
			select.attr(attr);
		}
		$(this).append(select);
		return select;
	},
	addForm : function(attr) {
		var form = $("<form>");
		if(attr) {
			form.attr(attr);
		}
		$(this).append(form);
		return form;
	},
	addOption : function(attr) {
		var option = $("<option>");
		if(attr) {
			option.attr(attr);
		}
		$(this).append(option);
		return option;
	},
	addLabel : function(attr) {
		var label = $("<label>");
		if(attr) {
			label.attr(attr);
		}
		$(this).append(label);
		return label;
	},
	addImg : function(attr) {
		var img = $("<img>");
		if(attr) {
			img.attr(attr);
		}
		$(this).append(img);
		return img;
	},
	addA : function(attr) {
		var a = $("<a>");
		if(attr) {
			a.attr(attr);
		}
		$(this).append(a);
		return a;
	},
	addTbody : function(attr) {
		var tbody = $("<tbody>");
		if(attr) {
			tbody.attr(attr);
		}
		$(this).append(tbody);
		return tbody;
	},
	addOther: function(title, attr) {
		var other = $("<"+title+">");
		if(attr) {
			other.attr(attr);
		}
		$(this).append(other);
		return other;
	} ,
	dumLoad : function(url, callback) {
		var _this = $(this);
		$.ajax({
	        type: "post",
	        url: dum.appName + "/home/onLoad.do",
	        data:{url:url},
	        dataType: "text",
	        success: function(data){
	        	if(dum.isLoad(data)) return;
	        	$(_this).html(data);
	        	if(callback) {
	        		callback($(_this));
	        	}
	        }
	    });
	},
	/**
	 ** 加法函数，用来得到精确的加法结果
	 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
	 ** 调用：accAdd(arg1,arg2)
	 ** 返回值：arg1加上arg2的精确结果
	 **/
	 accAdd:function(arg1, arg2) {
	    var r1, r2, m, c;
	    try {
	        r1 = arg1.toString().split(".")[1].length;
	    }
	    catch (e) {
	        r1 = 0;
	    }
	    try {
	        r2 = arg2.toString().split(".")[1].length;
	    }
	    catch (e) {
	        r2 = 0;
	    }
	    c = Math.abs(r1 - r2);
	    m = Math.pow(10, Math.max(r1, r2));
	    if (c > 0) {
	        var cm = Math.pow(10, c);
	        if (r1 > r2) {
	            arg1 = Number(arg1.toString().replace(".", ""));
	            arg2 = Number(arg2.toString().replace(".", "")) * cm;
	        } else {
	            arg1 = Number(arg1.toString().replace(".", "")) * cm;
	            arg2 = Number(arg2.toString().replace(".", ""));
	        }
	    } else {
	        arg1 = Number(arg1.toString().replace(".", ""));
	        arg2 = Number(arg2.toString().replace(".", ""));
	    }
	    return (arg1 + arg2) / m;
	},


	/**
	 ** 减法函数，用来得到精确的减法结果
	 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
	 ** 调用：accSub(arg1,arg2)
	 ** 返回值：arg1加上arg2的精确结果
	 **/
	 accSub : function (arg1, arg2) {
	    var r1, r2, m, n;
	    try {
	        r1 = arg1.toString().split(".")[1].length;
	    }
	    catch (e) {
	        r1 = 0;
	    }
	    try {
	        r2 = arg2.toString().split(".")[1].length;
	    }
	    catch (e) {
	        r2 = 0;
	    }
	    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
	    n = (r1 >= r2) ? r1 : r2;
	    return ((arg1 * m - arg2 * m) / m).toFixed(n);
	},


	/**
	 ** 乘法函数，用来得到精确的乘法结果
	 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
	 ** 调用：accMul(arg1,arg2)
	 ** 返回值：arg1乘以 arg2的精确结果
	 **/
	accMul:function (arg1, arg2) {
	    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	    try {
	        m += s1.split(".")[1].length;
	    }
	    catch (e) {
	    }
	    try {
	        m += s2.split(".")[1].length;
	    }
	    catch (e) {
	    }
	    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	},


	/** 
	 ** 除法函数，用来得到精确的除法结果
	 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
	 ** 调用：accDiv(arg1,arg2)
	 ** 返回值：arg1除以arg2的精确结果
	 **/
	accDiv:function(arg1, arg2) {
	    var t1 = 0, t2 = 0, r1, r2;
	    try {
	        t1 = arg1.toString().split(".")[1].length;
	    }
	    catch (e) {
	    }
	    try {
	        t2 = arg2.toString().split(".")[1].length;
	    }
	    catch (e) {
	    }
	    with (Math) {
	        r1 = Number(arg1.toString().replace(".", ""));
	        r2 = Number(arg2.toString().replace(".", ""));
	        return (r1 / r2) * pow(10, t2 - t1);
	    }
	},
	dumJson : function(data, name) {
		if(null != data && undefined != data) {
			var from = this;
			var name = name || "";
		    var teststr = JSON.stringify(data);
		    var type = teststr[0] == '{' && teststr[teststr.length - 1] == '}' 
		    	? "class" : teststr[0] == '[' && teststr[teststr.length - 1] == ']' 
		    	?  "array" : "other";

			if(type === "array") {
				$.each(data,function(i) {
					from.justarsJson(this, name+"["+i+"]");
				});
			} else if(type === "class"){
				for(key in data) {
					from.justarsJson(data[key], (name ? name + "." : "") + key);
				}
			} else {
				var el = from.find("name='"+name+"'");
				if(el[0].tagName === "LABEL"){
					el.text(data);
				} else {
					el.val(data);
				}
				var el = from.find("name='"+name+"'");
				
				from.find("name='"+name+"'").val(data);
			}
		} else {
			var data = {}; o = {};
			var a = $(this).serializeArray();
			$.each(a, function() {
				if (o[this.name] !== undefined) {
					if (!o[this.name].push) {
						o[this.name] = [o[this.name]];
					}
					o[this.name].push(this.value || '');
				} else {
					o[this.name] = this.value || '';
				}
			});
			for(var item in o) {
				if(/.+\[\d+\]\..+/.test(item)){
					var arr = item.split(/\[|\]\./);
					if(!data.hasOwnProperty($.trim(arr[0]))) {
						data[$.trim(arr[0])] = new Array();
					}
					for(var i = data[$.trim(arr[0])].length; i <= arr[1]; i++) {
						data[$.trim(arr[0])].push(new Object());
					}
					data[$.trim(arr[0])][arr[1]][$.trim(arr[2])] = o[item]; 
				} else if(/.+\..+/.test(item)) {
					var arr = item.split(/\./);
					if(!data.hasOwnProperty($.trim(arr[0]))) {
						data[$.trim(arr[0])] = {};
					}
					data[$.trim(arr[0])][$.trim(arr[1])] = o[item];
				} else {
					data[item] = o[item];
				}
			}
			
			return data;
		}
	}

});