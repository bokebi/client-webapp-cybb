package com.dyy.utils;

public class ApiUrlConstant {
	
	/**
	 * 对api url进行统一管理
	 */
	
	/**
	 * 关于我们
	 */
	public static String ABOUTUS_CONTENT = "/aboutUs/getAboutUsByParam/"; //获取关于我们信息	
	
	
	/**
	 * 文章相关
	 */
	public static String ARTICLE_ALLTYPE = "/article/getArticleAllType";//获取文章分类
	public static String ARTICLE_ALLTYPE_DETAIL = "/article/getArticleTypeByParam";//获取所有文章类型及相关文章
	public static String ARTICLE_PARAM 	 = "/article/articleList";//根据查询条件获取文章
	public static String ARTICLE_KEYCODE = "/article/getKeyWordList";//获取文字关键词
	public static String ARTICLE_DETAIL  = "/article/getArticleDetail"; //根据id获取最新详情	
	public static String ARTICLE_ALL     = "/article/getArticleAllList";//获取所有文章
	public static String ARTICLE_LABEL   = "/article/getArticleByLabel";//根据标签获取文章
	public static String ARTICLE_ALLLABEL= "/article/getAllArticleLabel";//获取所有标签
	
	/**
	 * 站点设置相关
	 */
	public static String WEBSITE_AD = "/website/getAdByParam";//根据条件获取广告
	public static String WEBSITE_BANNER = "/banner/bannerList"; //获取banner
	public static String WEBSITE_LINK   = "/link/linkList";//获取友情链接
	public static String WEBSITE_SEO	= "/website/getSeoCodeByParam";//获取seo配置
	public static String WEBSITE_EXTERNAL = "/website/getexternalCodeByParam";//获取外部代码
	public static String WEBSITE_AGREEMENT = "/website/getAgreementByParam";//注册协议
	
	
	/**
	 * 产品相关
	 */
	public static String PRODUCSKU_PRODUCTID ="/product/findProducSkuByProductId";//根据产品id查询商品
	public static String PRODUCSKU_SKUID ="/product/productSku";//根据商品id查询商品
	public static String PRODUCSKU_PARAM = "/product/productSkuVO";//根据服务id、地区、所选服务属性查询商品
	public static String PRODUCTSKU_LIST = "/product/productSkuList";//根据条件查询产品列表 服务id 地区id
	public static String PRODUCT_LIST = "/product/productList";//根据条件查询产品列表 服务id 地区id
	public static String PRODUCTSKU_BY_STATUS = "/product/findProductSkuByStatus";//根据位置查询商品
	public static String PRODUCTSKU_BY_TYPE = "/product/findServiceCategorySkuByType";//根据位置查询商品
	
	/**
	 * 套餐相关
	 */
	public static String PRODUCT_COMBOVO_LIST = "/productCombo/findProductComboVoList";//根据条件查询套餐列表
	public static String PRODUCT_COMBOVO_BYID="/productCombo/findProductComboVoById";//套餐详情
	
	/**
	 * 服务相关
	 */
	public static String SERVICE_CATEGORY_TREEE = "/service/loadCategoryTreee";//获取服务分类树


	/**
	 * 购物车
	 */
	public static String DEL_CART_ITEM = "/ordCart/delCartItem";//删除购物车
	public static String APPEND_ORD_CART = "/ordCart/appendOrdCart";//加入购物车
	public static String GET_ORD_CART = "/ordCart/getOrdCart";//获取购物车
	public static String GET_ORD_CART_NUM = "/ordCart/getOrdCartNum";//获取购物车数
	public static String ORD_CART_ITEMS_CONFIRM = "/ordCart/ordCartItemsConfirm";//确认购物车
	public static String SUBMIT_ORDER = "/ordPaymentOrder/submitOrder";//提交订单

	
	/**
	 * 用户相关
	 */
	public static String CUSTOMER_CHECKNAMELIST = "/customer/checkNameList"; //查询核名数据
	public static String CUSTOMER_MYADVISELIST = "/customer/myCusAdviseList";//我的反馈信息
	
	/**
	 * 我的服务
	 */
	public static String ORD_SERVICE_LIST = "/ordService/ordServiceList";//客户订单列表
	
	/**
	 * 公司信息
	 */
	public static String ENTERPRISE_LIST = "/cusEnterprise/enterpriseList";//获取用户公司列表
	
	/**
	 * 问答相关
	 */
	public static String QUESTION_NEW = "/sysQuestion/getNewQestionAnswere"; //最新问答
	public static String QUESTION_YJJDJJGXS = "/sysQuestion/getQuestionByType";//已解决，未解决，高悬赏问题
	public static String QUESTION_COUNT = "/sysQuestion/getResolvedAndTdAnswerCount";//问答数量统计
	public static String QUESTION_GUNDONGLIST = "/sysQuestion/getMiaskGdQuestion/";//问答首页滚动列表
	public static String QUESTION_WTKBYPARAM = "/sysQuestion/getSysquestionByStock";//问题库-按条件查找数据
	public static String QUESTION_QTYPEBYCODE = "/sysQuestionType/getSysQuestionTypeByCode";//根据code获取问题类型
	public static String QUESTION_ALLQTYPE = "/sysQuestionType/getSysQuestionTypeList";//获取所有的问题类型
	public static String QUESTION_USERCOUNT = "/cusTomerInfo/getCustomerCountById"; //获取用户问答相关统计信息
	public static String QUESTION_DETAIL = "/sysQuestion/getSysQuestionDetailInfo"; //获取问题详情
	public static String QUESTION_QHOT = "/sysQuestion/getHotQuestion";//热门问题
	public static String QUESTION_LISTBYPARAM = "/sysQuestion/sysQuestionList";//根据条件查询问题列表
	public static String QUESTION_PRAISESTEP = "/sysQuestion/savePraiseStep/";//赞踩操作
	
	/**
	 * 推荐会计
	 */
	public static String ASKRECOMMEND_LISTBYPARAM = "/askRecommendAccount/getAskRecommendAccountList";//根据条件查询推荐会计列表
	public static String ASKRECOMMEND_BYID = "/askRecommendAccount/getAskRecommendAccountById";//根据id获取会计信息
	public static String ASKRECOMMEND_ANSWERINFOBYID = "/sysQuestion/getAnswerByAccountId";//根据会计id获取回复信息
	
	/**
	 * 问答用户
	 */
	public static String QUESTIONUSER_NEWINFOBYID = "/sysQuestion/getAnswerByCusTomerId";//根据条件查找用户问答最新动态
	public static String QUESTIONUSER_QUESTIONBYID = "/sysQuestion/getQuestionByCusTomerId"; //根据条件查找用户的提问信息
	public static String QUESTIONUSER_ANSWERBYID = "/sysQuestion/getAnswerByCustomerId";//根据用户id获取用户的回答信息
	public static String QUESTIONUSER_BYID = "/cusTomerInfo/findUserInfoById";//根据用户id获取用户
		
	/**
	 * 优惠券
	 */
	public static String FIND_MY_SYSVOUCHER_INFO_LIST = "/voucher/findMySysVoucherInfoList";//获取当前用户的优惠劵信息
	public static String DONATION_SYSVOUCHER="/voucher/donationSysVoucher";//转赠优惠券
	
			
}
