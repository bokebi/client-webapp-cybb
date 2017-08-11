$(function(){
		guide.init();
	});
	var guide = {
		init:function(){
			
			guide.handleIsZeroRegister();
			
			/*是否有外地机构*/
			$('#wdjgService span.fieldAgenciesSpan').click(function(){
				if($(this).hasClass("fieldAgenciesHover")){//否
					$('#service_kz .deleteService').show();
					$('#service_kz .deleteService').trigger('click');
					
					$(this).removeClass("fieldAgenciesHover");
					$('.qysz_select').attr('business_code','ZCGS_012');
					$('.fpzyz_select').attr('business_code','ZCGS_005');
					
					var businessArr = [];
					if($('#service_kz .select .LabelHover').length>0){
						$('#service_kz .select .LabelHover').each(function(i,e){
							businessArr.push($(this).attr('business_code'));
						});
						$('#service_kz .total').text('￥'+guide.getPrice(businessArr));
					}else{
						$('#service_kz .selectTypes .selectTypesHover').each(function(i,e){
							businessArr.push($(this).attr('business_code'));
						});
						$('#service_kz .totalSum').text('￥'+guide.getPrice(businessArr));
					}
				}else{
					$(this).addClass("fieldAgenciesHover");	
					$('#service_kz .deleteService').hide();
					
					$('#businessList input[value="'+$('.qysz_select').attr('business_code')+'"]').remove();
					$('#businessList input[value="'+$('.fpzyz_select').attr('business_code')+'"]').remove();
					
					$('.qysz_select').attr('business_code','ZCGS_018');
					$('.fpzyz_select').attr('business_code','ZCGS_019');
					if($('#service_kz .select .selectTypesHover').length>0){
						var businessArr = [];
						$('#service_kz .select .selectTypesHover').each(function(i,e){
							businessArr.push($(this).attr('business_code'));
						});
						for(var index in businessArr){
							if($('#businessList input[value="'+businessArr[index]+'"]').length == 0){
								$('#businessList').append($("<input />").attr({'type':'checkbox','name':'businessType','checked':true,'value':businessArr[index]}).css({'display':'none'}));
							}
						}
						
						$('#service_kz .total').text('￥'+guide.getPrice(businessArr));
					}else{
						$('#service_kz .no').hide();
						$('#service_kz .yes').trigger('click');
						//$('#service_kz .service_confirm').trigger('click');
					}
				}
				guide.allPrice();
				$('.tips_li').hide();
			});
			
			/*需要服务*/
			$('.yes').click(function(){
				var _topParent = $(this).parents(".serviceItemChoose");
				
				console.log(this);
				/*var businessArr = [];
				var business_code = _topParent.attr('business_code');
				if(dum.common.isNull(business_code)){
					$.each(_topParent.find('.serviceItem .selectTypes .selectTypesHover'),function(i,e){
						var bus_code = $(e).attr('business_code');
						if(!dum.common.isNull(bus_code)){
							businessArr.push(bus_code);
						}
					});
				}else{
					businessArr.push(business_code);
				}*/
				var price = guide.getPrice($(this).attr("value"));
				
				if(_topParent.find(".serviceItem").length > 0){
					_topParent.find('.totalSum').text('￥'+price);
					_topParent.siblings(".serviceItemChoose").find(".serviceItem").hide();
					_topParent.siblings(".serviceItemChoose").find('.serviceItem').removeClass('serviceItemRed');
					_topParent.siblings(".serviceItemChoose").find('.noSelectMsg').hide();
					_topParent.find(".serviceItem").show();
				}else{
					_topParent.addClass('choosed');
					$(this).addClass("LabelHover").children('.icon_select').show();
					_topParent.find('.Provision .ProvisionConet').eq(0).hide();
					_topParent.find('.Provision .ProvisionConet').eq(1).show().find('.total').text('￥'+price);
					guide.allPrice();
					for(var index in businessArr){
						if($('#businessList input[value="'+businessArr[index]+'"]').length == 0){
							$('#businessList').append($("<input />").attr({'type':'checkbox','name':'businessType','checked':true,'value':businessArr[index]}).css({'display':'none'}));
						}
					}
				}
				_topParent.find(".canHidePreferential").show();
				_topParent.find(".no").removeClass('LabelHover').children('.icon_select').hide();
				$('.tips_li').hide();
			});
			
			/*选择具体服务或周期*/
			$('.serviceItemChoose .serviceItem .selectTypes label').click(function(){
				if($(this).hasClass('selectTypesHover')){
					if($(this).hasClass('cancel_able')){
						$(this).removeClass('selectTypesHover').children('.icon_select').hide();
					}
				}else{
					var multi_select = $(this).parent().attr('multi-select');
					if(!dum.common.isNull(multi_select) && 'false' == multi_select){
						$(this).siblings('label').removeClass('selectTypesHover').children('.icon_select').hide();
					}
					$(this).addClass('selectTypesHover').children('.icon_select').show();
				}
			});
			
			/*不需要服务*/
			$('.no').click(function(){
				var _topParent = $(this).parents(".serviceItemChoose");
				_topParent.addClass('choosed');
				_topParent.find(".serviceItem").hide();
				$(this).addClass("LabelHover").children('.icon_select').show();
				_topParent.find(".yes").removeClass('LabelHover').children('.icon_select').hide();
				
				_topParent.find('.Provision .ProvisionConet').eq(0).show();
				_topParent.find('.Provision .ProvisionConet').eq(1).hide().find('.total').text('￥0.00');
				_topParent.find(".canHidePreferential").hide();
				$('.tips_li').hide();
	
				var businessArr = [];
				var business_code = _topParent.attr('business_code');
				if(dum.common.isNull(business_code)){
					$.each(_topParent.find('.serviceItem .selectTypes .selectTypesHover'),function(i,e){
						var bus_code = $(e).attr('business_code');
						if(!dum.common.isNull(bus_code)){
							businessArr.push(bus_code);
						}
					});
				}else{
					businessArr.push(business_code);
				}
				if(businessArr.length == 0){
					_topParent.find('.serviceItem').addClass('serviceItemRed');
					_topParent.find('.noSelectMsg').show();
					return;
				}else{
					if(_topParent.find('.serviceItem .business_type').length>0){
						if(_topParent.find('.serviceItem .business_type label.selectTypesHover').length == 0){
							_topParent.find('.serviceItem').addClass('serviceItemRed');
							_topParent.find('.noSelectMsg').show();
							return;
						}
					}
					
				}
				for(var index in businessArr){
					$('#businessList input[value="'+businessArr[index]+'"]').remove();
				}
				
				guide.allPrice();
			});
			
			$('#service_kz_cd .fpzyz_select').click(function(){
				$(this).addClass('selectTypesHover LabelHover');
				$(this).find(".icon_select").attr('style','display:inline');
				var _topParent = $(this).parents(".serviceItemChoose");
				var business_code = _topParent.attr('business_code');
				_topParent.find('.Provision .ProvisionConet').eq(0).hide();
				_topParent.find('.Provision .ProvisionConet').eq(1).show().find('.total').text(guide.getPrice(business_code));
				guide.allPrice();
				$('#businessList').append($("<input />").attr({'type':'checkbox','name':'businessType','checked':true,'value':business_code}).css({'display':'none'}));
			});
			
			/*选择服务、确定*/
			$('.service_confirm').click(function(){
				var _topParent = $(this).parents(".serviceItemChoose");
				
				var businessArr = [];
				var business_code = _topParent.attr('business_code');
				if(dum.common.isNull(business_code)){
					$.each(_topParent.find('.serviceItem .selectTypes .selectTypesHover'),function(i,e){
						var bus_code = $(e).attr('business_code');
						if(!dum.common.isNull(bus_code)){
							businessArr.push(bus_code);
						}
					});
				}else{
					businessArr.push(business_code);
				}
				if(businessArr.length == 0){
					_topParent.find('.serviceItem').addClass('serviceItemRed');
					_topParent.find('.noSelectMsg').show();
					return;
				}else{
					if(_topParent.find('.serviceItem .business_type').length>0){
						if(_topParent.find('.serviceItem .business_type label.selectTypesHover').length == 0){
							_topParent.find('.serviceItem').addClass('serviceItemRed');
							_topParent.find('.noSelectMsg').show();
							return;
						}
					}
					
				}
				
				_topParent.addClass('choosed');
				_topParent.find('.serviceItem').hide()
				_topParent.find('.select label').hide();
				_topParent.find('.select label.selectTypesHover').remove();
				if(_topParent.find('.show_bus_text').length>0){
					var html = $('<label />').attr({'class':'LabelHover'}).text(_topParent.find('.show_bus_text').text()).append($('<span />').attr({'class':'icon_select'}).css({'display':'inline'}).append($('<img />').attr({'src':dum.appName+'/images/img/guideSelect.png'}))).prop('outerHTML');
					_topParent.find('.select').append(html);
				}else{
					$.each(_topParent.find('.selectTypes label.selectTypesHover'),function(i,e){
							_topParent.find('.select').append($(e).addClass('LabelHover').prop('outerHTML'));
					});
				}
				
				_topParent.find('.Provision .ProvisionConet').eq(0).hide();
				_topParent.find('.Provision .ProvisionConet').eq(1).show().find('.total').text(_topParent.find('.totalSum').text());
				
				guide.allPrice();
				for(var index in businessArr){
					if($('#businessList input[value="'+businessArr[index]+'"]').length == 0){
						$('#businessList').append($("<input />").attr({'type':'checkbox','name':'businessType','checked':true,'value':businessArr[index]}).css({'display':'none'}));
					}
				}
			});
			
			/*删除选中服务*/
			$('.deleteService').click(function(){
				//判断是否为成都地区的删除
				if($(this).attr('id')=='deleteCdService'){
					var _topParent = $(this).parents(".serviceItemChoose");
					$('#businessList input[value="'+_topParent.attr('business_code')+'"]').remove();
					//_topParent.removeClass('choosed');
					_topParent.find('.Provision .ProvisionConet').eq(0).show();
					_topParent.find('.Provision .ProvisionConet').eq(1).hide().find('.total').text('￥0.00');
					$("#service_kz_cd .fpzyz_select").removeClass('selectTypesHover LabelHover')
					$("#service_kz_cd .fpzyz_select .icon_select").remove()
					_topParent.find('.price_month').text('0.00');				
					_topParent.find('.month_number').text('0');
					guide.allPrice()
				}else{
					var _topParent = $(this).parents(".serviceItemChoose");
					_topParent.removeClass('choosed');
					
					var businessArr = [];
					var business_code = _topParent.attr('business_code');
					if(dum.common.isNull(business_code)){
						if(_topParent.find('.select .LabelHover').length>0){
							$.each(_topParent.find('.select .LabelHover'),function(i,e){
								
								businessArr.push($(this).attr('business_code'));
							});
						}else{
							$.each(_topParent.find('.serviceItem .selectTypes .selectTypesHover'),function(i,e){
								var bus_code = $(e).attr('business_code');
								if(!dum.common.isNull(bus_code)){
									businessArr.push(bus_code);
								}
							});
						}
					}else{
						businessArr.push(business_code);
					}
					for(var index in businessArr){
						$('#businessList input[value="'+businessArr[index]+'"]').remove();
					}
					
					_topParent.find('.Provision .ProvisionConet').eq(0).show();
					_topParent.find('.Provision .ProvisionConet').eq(1).hide().find('.total').text('￥0.00');
					_topParent.find('.select label.selectTypesHover:visible').remove();				
					_topParent.find('.selectTypes label').removeClass('selectTypesHover').children('.icon_select').hide();	
					_topParent.find('.selectTypes label.default_select').addClass('selectTypesHover').children('.icon_select').show();
					_topParent.find('.select label:hidden').show();				
					_topParent.find('.price_month').text('0.00');				
					_topParent.find('.month_number').text('0');
					if($('#companyAreaCode input[name="companyAreaCode"]:hidden').val().substring(0,4) != 'AAAA'){
						$(this).parents('#service_kz').removeClass('choosed').find('.no').hide();
						$(this).parents('#dljzService').removeClass('choosed').find('.no').hide();
					}
					
					guide.handleIsZeroRegister();
					
					guide.allPrice();
				}
			});
			
			/*刻章选择*/
			$('#service_kz .serviceItem .selectTypes label').click(function(){
				var _this = $(this);
				var businessArr = [];
				$.each($('#service_kz .serviceItem .selectTypes .selectTypesHover'),function(i,e){
					var bus_code = $(e).attr('business_code');
					if(!dum.common.isNull(bus_code)){
						businessArr.push(bus_code);
					}
				}); 
				_this.parents('.serviceItemChoose').find('.totalSum').text('￥'+guide.getPrice(businessArr));
			});
			
			/*记账报税选择*/
			$('#dljzService .serviceItem .selectTypes label').click(function(){
				var _this = $(this);
				var type = _this.parents('.serviceItemChoose').find('.business_type .selectTypesHover').attr('value');
				var cycle = _this.parents('.serviceItemChoose').find('.business_cycle .selectTypesHover').attr('value');
				var business_code = _this.parents('.serviceItemChoose').find('*[business_code^="JZBS_"].selectTypesHover').attr('business_code');
				$('#dljzService .serviceItem').removeClass('serviceItemRed');
				$('#dljzService .noSelectMsg').hide();
				if(!dum.common.isNull(type)){
					$('#companyType').val(type);
				}
				if(!dum.common.isNull(cycle)){
					_this.parents('.serviceItemChoose').find('.month_number').text(cycle);
				}
				if(!dum.common.isNull(type) && !dum.common.isNull(cycle)){
					var price = guide.getPrice(business_code);
					_this.parents('.serviceItemChoose').find('.price_month').text((price/cycle).toFixed(2));
					_this.parents('.serviceItemChoose').find('.totalSum').text('￥'+price);
				}
			});
			
			$('#define_buyNow').click(function(){
				if($(this).hasClass('defineHover')){
					var areaCode = $('div[areaname="companyAreaCode"] :hidden[name="companyAreaCode"]').val();
					if(dum.common.isNull(areaCode)){
						$('.tips_li').text('公司区域选择错误').show();
						$('div[areaname="companyAreaCode"]').addClass('borderRed');
						return false;
					}else{
						$('.tips_li').hide();
						$('div[areaname="companyAreaCode"]').removeClass('borderRed');
						var ids = '92,';
						//记账报税
						if($("#product_1").css("display")=='none'){
							ids+="93,"
						}
						//企业三章
						if($("#product_2").css("display")=='none'){
							ids+="106,"
						}
						
						checkCustomer(function(){
							window.location.href=dum.appName + "/payment/choPayOpt.do?zcgs=true&ids="+ids;
						});
						
					}
				}
			});
		},
		handleIsZeroRegister : function() {// 处理已经0元注册过(绑定记账报税服务)
			var isBuy = $('#isBuy').val();
			if (!dum.common.isNull(isBuy) && '0' == isBuy){
				$('#dljzService .no').hide();
			}
		},
		handleArea:function(item){//不同地区处理
			$('div[areaname="companyAreaCode"]').removeClass('borderRed');
			$('.tips_li').hide();
			if(!dum.common.isNull(item) && item.indexOf('前海深港')>=0){//前海挂靠
				$('#qhgkService').addClass('choosed').show();
				
				var businessArr = [];
				var business_code = $('#qhgkService').attr('business_code');
				if(dum.common.isNull(business_code)){
					$.each($('#qhgkService .serviceItem .selectTypes .selectTypesHover'),function(i,e){
						var bus_code = $(e).attr('business_code');
						if(!dum.common.isNull(bus_code)){
							businessArr.push(bus_code);
						}
					});
				}else{
					businessArr.push(business_code);
				}
				for(var index in businessArr){
					if($('#businessList input[value="'+businessArr[index]+'"]').length == 0){
						$('#businessList').append($("<input />").attr({'type':'checkbox','name':'businessType','checked':true,'value':businessArr[index]}).css({'display':'none'}));
					}
				}
				
				guide.allPrice();
			}else{
			//成都注册公司根据区域不同,收不同价格
				if(!dum.common.isNull(item) &&item.indexOf('成都')>=0){
					$('#service_kz').removeClass('choosed').hide();
					$('#service_kz_cd').addClass('choosed').show();
					$("#czgsService").find('.total').text(guide.getPrice($('#service_kz_cd .LabelHover').attr('business_code')));
					$('#businessList').append($("<input />").attr({'type':'checkbox','name':'businessType','checked':true,'value':$('#service_kz_cd .LabelHover').attr('business_code')}).css({'display':'none'}));
				}else{
					$('#service_kz').removeClass('choosed').show();
					$('#service_kz_cd').addClass('choosed').hide();
					$("#czgsService").find('.total').text('￥');
				}
				$('#qhgkService').removeClass('choosed').hide();
				
				var businessArr = [];
				var business_code = $('#qhgkService').attr('business_code');
				if(dum.common.isNull(business_code)){
					$.each($('#qhgkService .serviceItem .selectTypes .selectTypesHover'),function(i,e){
						var bus_code = $(e).attr('business_code');
						if(!dum.common.isNull(bus_code)){
							businessArr.push(bus_code);
						}
					});
				}else{
					businessArr.push(business_code);
				}
				for(var index in businessArr){
					$('#businessList input[value="'+businessArr[index]+'"]').remove();
				}
				
				guide.allPrice();
			}
			if(!dum.common.isNull(item) && item.indexOf('深圳')>=0){//深圳地区处理
				$('#wdjgService').show();//外地机构选项
				$('#dljzService .preferential').show();//显示立减200
				if($('#dljzService .select .selectTypesHover').length<=0){
					$('#dljzService .no').show()
				}
				if($('#service_kz .select .selectTypesHover').length<=0){
					$('#service_kz .no').show();
				}
			}else if(!dum.common.isNull(item) && item.indexOf('深圳')<0){
				if($('#wdjgService span.fieldAgenciesSpan').hasClass("fieldAgenciesHover")){
					$('#wdjgService span.fieldAgenciesSpan').trigger('click');
				}
				$('#wdjgService').hide();
				
				/*if($('#service_kz .yes:hidden').length > 0){
					$('#service_kz .deleteService').show().trigger('click');
				}*/
				$('#dljzService .preferential').hide();
				$('#service_kz .no').hide();$('#service_kz').removeClass('choosed');
				$('#dljzService .no').hide();$('#dljzService').removeClass('choosed');
			}
			if($('#dljzService .select .selectTypesHover').length>0){
				var businessArr = [];
					$.each($('#dljzService .select .selectTypesHover'),function(i,e){
						var bus_code = $(e).attr('business_code');
						if(!dum.common.isNull(bus_code)){
							businessArr.push(bus_code);
						}
					});
					$('#dljzService .total').text('￥'+guide.getPrice(businessArr));
					$('#dljzService').addClass('choosed');
					guide.allPrice();
			}
			if($('#service_kz .select .selectTypesHover').length>0){
				var businessArr = [];
					$.each($('#service_kz .select .selectTypesHover'),function(i,e){
						var bus_code = $(e).attr('business_code');
						if(!dum.common.isNull(bus_code)){
							businessArr.push(bus_code);
						}
					});
					$('#service_kz .total').text('￥'+guide.getPrice(businessArr));
					$('#service_kz').addClass('choosed');
					guide.allPrice();
			}
		},
		getPrice:function(businessStr){//获取业务价格
			/*if(!$.isArray(businessArr)){
				businessArr = businessArr.split(',');
			}
			var businessStr ="";
			for(var i in businessArr){
				if("" != businessStr){
					businessStr+=",";
				}
				businessStr+= businessArr[i] + "|1";
			}*/
			return Number(getBusinessPrice(businessStr)).toFixed(2);
		},
		allPrice:function(){//计算总价
			var isAllChoose = true;
			var totalPrice = 0.00;
			$.each($('.serviceItemChoose:visible'),function(i,e){
				var _this = $(e);
				if(_this.hasClass('choosed')){
					if(_this.find('.total').length>0){
						var price = _this.find('.total').text().replace('￥','');
						totalPrice+=Number(price);
					}
				}else{
					isAllChoose = false;
				}
			});
			
			$('#allPrice').text('￥'+totalPrice.toFixed(2));
			if(isAllChoose){
				$('#define_buyNow').removeClass('btn_disabled').addClass('defineHover');
			}else{
				$('#define_buyNow').addClass('btn_disabled').removeClass('defineHover');
			}
		}
	};