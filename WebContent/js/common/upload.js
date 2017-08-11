

$(document).ready(function(){
	dum.file = {
			upload : function(param, callback) {
			var multiple = param.multiple == true ? true : false;
			var files = new Array();
			var uploader = WebUploader.create({
			    auto:true,
				// swf文件路径
				swf: dum.appName + "/file/swf/Uploader.swf",
			    // 文件接收服务端。
			    server: dum.appName + "/file/upload.do?"+new Date(),
			    // 选择文件的按钮。可选。
			    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
			    pick: {id:$(param.picker).addDiv({"class":"webUploader_Pan"}), label:param.label,multiple:multiple},
			    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
			    accept:{
			    	title: 'HTML',
			    	//extensions: 'gif,jpg,jpeg,bmp,png',
			        mimeTypes: param.extensions
			    },
			    fileSingleSizeLimit:1024*1204*50, // 最大可以上传2M的文件
			    resize: false,
			    duplicate : true,
			    formData:{attachType:param.docType},
			    fileVal :"Upload"
			});
			
			uploader.on("filesQueued", function(filelist) {
				files.length = 0;
			});
			uploader.on("uploadSuccess", function(file, data) {
				files.push(data);
			});
			uploader.on("uploadComplete", function(file) {
			    $('#'+file.id).find('.progress').fadeOut();
				uploader.removeFile(file);
			});
			uploader.on("uploadFinished", function(file) {
				if(multiple) {
					callback(files);
				} else {
					callback(files[0]);
				}
			});
		}
	}
	$.each($("div.upload[autoInit]"), function() {
		var attachemtId = $(this).attr("attachemtId");
		var _this = this;
		dum.file.upload({
			picker : $(this),
			extensions : $(this).attr("extensions"),
			docType : "JPG",
			label : $(this).attr("fileTitle")
		}, function(data) {
			var div = $("#uploadShow", $(_this)).length > 0 ? $("#uploadShow", $(_this)) : $(_this).addSpan({id:"uploadShow"});
			div.html("");
			div.addInput({type:"hidden",name:$(_this).attr("fileName")}).val(data.id);
			div.addA({href:dum.appName+"/file/download.do?id="+data.id}).text(data.fileName).addClass("fileDownload");
		});
		
		$(this).on("click", ".webuploader-pick" , function() {
			$(this).next().find('input').trigger('click');
		});
		
		if(attachemtId) {
			dum.common.ajax({
				type : "post",
				url : "/file/findById.do?id=" + attachemtId,
				data:{},
				async:false,
				dataType: "json",
				success : function(data) {
					var div = $("#uploadShow", $(_this)).length > 0 ? $("#uploadShow", $(_this)) : $(_this).addSpan({id:"uploadShow"});
					div.html("");
					div.addInput({type:"hidden",name:$(_this).attr("fileName")}).val(data.id);
					div.addA({href:dum.appName+"/file/download.do?id="+data.id}).text(data.fileName).addClass("fileDownload");
				}
			});
		}
	});
});