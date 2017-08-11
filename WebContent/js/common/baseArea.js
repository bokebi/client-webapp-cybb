var base = new Object();

$(function(page) {

  base.addArea = function(div, param, callback) {
    var title = div.addDiv();
    var p = title.addP({
      "class": "addressDisplay"
    });
    p.addOther("b", {
      "class": "icon commonImg"
    });
    if (param.isEdit) {
      div.hover(function() {
        var code = $(div).find("input[name='" + $(div).attr("areaname") + "']").val();
        if (code != "" && code != undefined && code != "undefined" && code != null) {
          param.areaCode = code.substr(0, code.length - 2);
        }
        base.initAddress(div, param, callback);
      }, function() {
        $(this).removeClass('choseing');
        $(this).find("div.addressChoose").hide();
      });
    }
    if (param.areaCode != "" && param.areaCode != undefined && param.areaCode != "undefined") {
      var item = null;
      if (param.areaCode.length <= 4) {
        item = page.findChildrenFirst(param.areaCode);
      } else {
        item = page.findById(param.areaCode);
      }
      p.addSpan().text(item.areaFullname);
      if (callback) {
        callback(item)
      }
      $('input[name="companyAreaCode"]').val(item.id);
    } else {
      p.addSpan().text("请选择地区");
    }
  }

  base.initAddress = function(div, param, callback) {
    div.addClass('choseing');
    if (div.find("div.addressChoose").length > 0) {
      div.find("div.addressChoose").show();
      return;
    }
    var address = div.addDiv({
      "class": "addressChoose"
    });
    var address1 = address.addDiv({
      "class": "addressChoose1"
    });
    var p = address1.addP({
      "class": "addressDisplay1"
    });
    p.addSpan().text("请选择");
    address1.addOther("b", {
      "class": "closeAddress"
    }).click(function() {
      address.remove();
    });
    var ul = address1.addUl({
      "class": "addressChooseUl"
    });
    var area = null;
    var list = null;
    if (param.areaCode != "" && param.areaCode != undefined && param.areaCode != "undefined") {
      area = page.findById(param.areaCode);
      list = page.listArea(area.id)
    } else {
      list = page.listArea()
    }
    page.nextArea(address, list, area, callback);
  }

  page.nextArea = function(address, list, area, callback) {
    var ul = $(address).find(".addressChooseUl");
    var p = $(address).find(".addressDisplay1");
    ul.empty();
    if (!list || list.length <= 0) {
      if (callback)
        callback(area);
      address.remove();
      return;
    }
    if (null != area) {
      var span = $(address).parent().find(".addressDisplay1").find("span");
      var names = area.areaFullname.split(" ");
      span.empty();
      $.each(names, function(i) {
        span.addA().text(names[i] + " ").click(
          function() {
            var par = page.findById(area.areaFullcode.substr(0, 2 + (i * 2)));
            if (i != 0) {
              page.nextArea(address, page.listArea(par.id), par, callback);
            } else {
              page.nextArea(address, page.listArea(), null, callback);
            }
          }).addOther("b", {
          "class": "icon commonImg"
        });
      });
    }
    $.each(list, function(i, item) {
      ul.addLi().text(item.areaName).click(
        function() {
          $(address).parent().find(".addressDisplay")
            .find("span").text(item.areaFullname);
          if ($('.waring')) {
            $('.waring').removeClass('waring');
          }
          if (item.areaLevel < 3) {
            if (callback)
              callback(item);
            page.nextArea(address, page.listArea(item.id),
              item, callback);
          } else {
            address.remove();
            if (callback)
              callback(item);
          }
        });
    });
  }

  page.listArea = function(parentId) {
    var list = new Array();
    var url = "/area/listByParentId.do?parentId=" + (parentId | 0);
    // var list = [{"id":3,"parentId":2,"areaName":"福田区","areaFullname":"广东省
    // 深圳市
    // 福田区","areaCode":"AA","areaFullcode":"AAAAAA","areaLevel":3,"recordStatus":"A","updateCount":0,"createDate":1419480363000,"creatorId":-4,"updateDate":1419480363000,"updaterId":-4},{"id":4,"parentId":2,"areaName":"罗湖区","areaFullname":"广东省
    // 深圳市
    // 罗湖区","areaCode":"AB","areaFullcode":"AAAAAB","areaLevel":3,"recordStatus":"A","updateCount":0,"createDate":1419480364000,"creatorId":-4,"updateDate":1419480364000,"updaterId":-4},{"id":5,"parentId":2,"areaName":"南山区","areaFullname":"广东省
    // 深圳市
    // 南山区","areaCode":"AC","areaFullcode":"AAAAAC","areaLevel":3,"recordStatus":"A","updateCount":0,"createDate":1419480364000,"creatorId":-4,"updateDate":1419480364000,"updaterId":-4},{"id":6,"parentId":2,"areaName":"盐田区","areaFullname":"广东省
    // 深圳市
    // 盐田区","areaCode":"AD","areaFullcode":"AAAAAD","areaLevel":3,"recordStatus":"A","updateCount":0,"createDate":1419480364000,"creatorId":-4,"updateDate":1419480364000,"updaterId":-4},{"id":7,"parentId":2,"areaName":"宝安区","areaFullname":"广东省
    // 深圳市
    // 宝安区","areaCode":"AE","areaFullcode":"AAAAAE","areaLevel":3,"recordStatus":"A","updateCount":0,"createDate":1419480364000,"creatorId":-4,"updateDate":1419480364000,"updaterId":-4},{"id":8,"parentId":2,"areaName":"龙岗区","areaFullname":"广东省
    // 深圳市
    // 龙岗区","areaCode":"AF","areaFullcode":"AAAAAF","areaLevel":3,"recordStatus":"A","updateCount":0,"createDate":1419480364000,"creatorId":-4,"updateDate":1419480364000,"updaterId":-4},{"id":9,"parentId":2,"areaName":"龙华新区","areaFullname":"广东省
    // 深圳市
    // 龙华新区","areaCode":"AG","areaFullcode":"AAAAAG","areaLevel":3,"recordStatus":"A","updateCount":0,"createDate":1419480364000,"creatorId":-4,"updateDate":1419480364000,"updaterId":-4},{"id":10,"parentId":2,"areaName":"光明新区","areaFullname":"广东省
    // 深圳市
    // 光明新区","areaCode":"AH","areaFullcode":"AAAAAH","areaLevel":3,"recordStatus":"A","updateCount":0,"createDate":1419480364000,"creatorId":-4,"updateDate":1419480364000,"updaterId":-4},{"id":11,"parentId":2,"areaName":"坪山新区","areaFullname":"广东省
    // 深圳市
    // 坪山新区","areaCode":"AI","areaFullcode":"AAAAAI","areaLevel":3,"recordStatus":"A","updateCount":0,"createDate":1419480364000,"creatorId":-4,"updateDate":1419480364000,"updaterId":-4},{"id":12,"parentId":2,"areaName":"大鹏新区","areaFullname":"广东省
    // 深圳市
    // 大鹏新区","areaCode":"AJ","areaFullcode":"AAAAAJ","areaLevel":3,"recordStatus":"A","updateCount":0,"createDate":1419480365000,"creatorId":-4,"updateDate":1419480365000,"updaterId":-4},{"id":773,"parentId":2,"areaName":"前海深港合作区","areaFullname":"广东省
    // 深圳市
    // 前海深港合作区","areaCode":"QH","areaFullcode":"AAAAQH","areaLevel":3,"recordStatus":"A","updateCount":0,"createDate":1438185600000,"creatorId":-4,"updateDate":1438185600000,"updaterId":-4}];
    dum.common.ajax({
      type: "post",
      url: url,
      data: {},
      async: false,
      dataType: "json",
      success: function(data) {
        list = data;
      }
    });
    return list;
  }

  page.findById = function(id) {
    var result = new Object();
    var url = "/area/findByCode.do?code=" + id;
    dum.common.ajax({
      type: "post",
      url: url,
      data: {},
      async: false,
      dataType: "json",
      success: function(data) {
        result = data;
      }
    });
    return result;
  }

  page.findChildrenFirst = function(area_code) {
    var result = new Object();
    var url = "/area/getChildrenFirst.do?code=" + area_code;
    dum.common.ajax({
      type: "post",
      url: url,
      data: {},
      async: false,
      dataType: "json",
      success: function(data) {
        result = data;
      }
    });
    return result;
  }

  base.reSetArea = function(div, param) {

    if (param.isEdit == false || param.isEdit == "false") {
      $(div).unbind("mouseenter").unbind("mouseleave");
    }
    if (param.areaCode) {
      var area = page.findById(param.areaCode);
      if (area) {
        $(div).find(".addressDisplay span").text(area.areaFullname);
        $(div).find("input[name='" + $(div).attr("areaname") + "']")
          .remove();
        if (area.areaLevel >= 3) {
          $(div).addInput({
            type: "hidden",
            name: $(div).attr("areaname")
          }).val(area.areaFullcode);
        }
      }
    }

  }

  base.initArea();

  $.fn.extend({
    setArea: function(param) {
      if (param.isEdit == false || param.isEdit == "false") {
        $(this).unbind("mouseenter").unbind("mouseleave");

        $(".addressDisplay b").remove();
        $(".addressDisplay").addClass("disabled");
      }

      if (param.areaCode) {
        var area = page.findById(param.areaCode);
        if (area) {
          $(this).find(".addressDisplay span")
            .text(area.areaFullname);
          $(this).find(
              "input[name='" + $(this).attr("areaname") + "']")
            .remove();
          if (area.areaLevel >= 3) {
            $(this).addInput({
              type: "hidden",
              name: $(this).attr("areaname")
            }).val(area.areaFullcode);
          }
        }
      }
    }
  });
});

base.initArea = function(div) {
  var param = new Object();
  if (div) {
    if (!$(div).html() || $(div).html() == "") {
      param.isEdit = ($(div).attr("isedit") == false || $(div).attr(
        "isedit") == "false") ? false : true;
      param.areaCode = $(div).attr("areacode");
      base.addArea($(div), param, function(area) {
        $(div).find("input[name='" + $(div).attr("areaname") + "']")
          .remove();
        if (area.areaLevel >= 2) {
          $(div).addInput({
            type: "hidden",
            name: $(div).attr("areaname")
          }).val(area.areaFullcode);
        }
      });
    }
  } else {
    $.each($("div.areaSelectText"), function(i, obj) {
      if (!$(this).html() || $(this).html() == "") {
        param.isEdit = ($(obj).attr("isedit") == false || $(obj).attr(
          "isedit") == "false") ? false : true;
        param.areaCode = $(this).attr("areacode");
        base.addArea($(obj), param, function(area) {
          $(obj).find("input[name='" + $(obj).attr("areaname") + "']").remove();
          if (area.areaLevel >= 2) {
            $("div.areaSelectText").removeClass('choseing');
            $(obj).addInput({
              type: "hidden",
              name: $(obj).attr("areaname")
            }).val(area.areaFullcode);
            // 执行选择地址完成后的select方法
            var areaSelectFunction = $(obj).attr("areaSelect");
            if (areaSelectFunction && areaSelectFunction != "") {
              eval(areaSelectFunction + "('" + area.areaFullname + "')");
            }
          }
        });
      }
    })
  }
}