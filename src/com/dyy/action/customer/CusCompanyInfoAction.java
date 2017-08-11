package com.dyy.action.customer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.utils.Connection;
import com.dyy.utils.Constant;
import com.dyy.utils.CustomerUtils;
import com.dyy.utils.WebUtils;

/**
  * 描述:<p>我的公司</p>
  * @ClassName: CusCompanyInfoAction
  * @author weihongjun
  * @date 2016年4月7日 下午5:47:26
  *
*/
@Controller
@RequestMapping("/myCompany")
public class CusCompanyInfoAction extends TopAction
{
    
    @RequestMapping("/index")
    public ModelAndView index()
    {
        ModelAndView view = new ModelAndView("/userClient/myCompany");
        return view;
    }
    
    @RequestMapping("/companyList{type}")
    public ModelAndView companyList(@PathVariable String type)
    {
        ModelAndView view = new ModelAndView("/userClient/companyData");
        Map<Object, Object> result = Connection.getInstance().getApi("/cusEnterprise/findAllEnterprises");
        if (result != null)
        {
            view.addObject("companyList", result.get("values"));
        }
        return view;
    }
    
    /**
     * 我的全部公司页面
     */
    @RequestMapping(value="/myEnterprise")
    public ModelAndView myEnterprise(){
    	ModelAndView view = new ModelAndView("/userClient/myEnterprise");
        Map<Object, Object> result = Connection.getInstance().getApi("/cusEnterprise/findAllCusEnterpriseList");
        if (result != null)
        {
            view.addObject("myEnterprise", result.get("values"));
        }
        return view;
    }
    
    /**
     * 全部公司信息
     * @return
     */
    @SuppressWarnings("unchecked")
	@RequestMapping(value="/myEnterpriseAll")
    public @ResponseBody Map<Object,Object> myEnterpriseAll(Long page,Long rows){
    	Map<String,Object> param = new HashMap<String, Object>();
    	if(null != rows) param.put("rows",rows);
    	if(null != page) param.put("page",page);
    	Map<Object, Object> result = Connection.getInstance().getApi("/cusEnterprise/enterpriseList",param);
    	Map<Object, Object> m = (Map<Object, Object>)result.get("values");
    	if(null != m && m.containsKey("total")){
    		m.put("total",(m.containsKey("records")) ? m.get("records") : 0);
    	}
    	return m;
    }
    
    /**
     * 我的公司信息
     * @return
     */
    @RequestMapping(value="/myCompanyInfo/{enterpriseId}")
    public ModelAndView myCompanyInfo(@PathVariable Long enterpriseId){
    	ModelAndView view = new ModelAndView("/userClient/myCompanyInfo");
    	Map<String,Object> param = new HashMap<String, Object>();
    	param.put("id", enterpriseId);
    	Map<Object, Object> result = Connection.getInstance().getApi("/cusEnterprise/getCusEnterprise",param);
    	view.addObject("cusEnterprise",result.get("values"));
    	
    	result = Connection.getInstance().getApi("/cusCompanyTax/getCusCompanyTaxByCompanyId/"+enterpriseId);
    	view.addObject("cusCompanyTax", result.get("values"));
    	
    	view.addObject("currentuser", CustomerUtils.getCurrentCustomer());
    	
    	view.addObject("enterpriseId",enterpriseId);
    	return view;
    }
    
    /**
     * 新增公司信息
     * @return
     */
    @RequestMapping(value="/addCompanyInfo")
    public ModelAndView addCompanyInfo(){
    	ModelAndView view = new ModelAndView("/userClient/addCompanyInfo");
    	view.addObject("currentuser", CustomerUtils.getCurrentCustomer());
    	return view;
    }
    
    /**
     * 股东信息
     * @return
     */
    @SuppressWarnings("unchecked")
	@RequestMapping(value="/myCompanyInfo/shareholderList/{id}")
    public @ResponseBody Map<Object,Object> shareholderList(@PathVariable Long id,Long page,Long rows){
    	Map<String,Object> param = new HashMap<String, Object>();
    	param.put("enterpriseId", id);
    	if(null != rows) param.put("rows",rows);
    	if(null != page) param.put("page",page);
    	Map<Object, Object> result = Connection.getInstance().getApi("/cusCompanyShareholder/shareholderList",param);
    	Map<Object, Object> m = (Map<Object, Object>)result.get("values");
    	if(null != m && m.containsKey("total")){
    		m.put("total",(m.containsKey("records")) ? m.get("records") : 0);
    	}
    	return m;
    }
    
    /**
     * 主要成员
     */
    @SuppressWarnings("unchecked")
	@RequestMapping(value="/myCompanyInfo/legalpersonList/{id}")
    public @ResponseBody Map<Object,Object> legalpersonList(@PathVariable Long id,Long page,Long rows){
    	Map<String,Object> param = new HashMap<String, Object>();
    	param.put("enterpriseId", id);
    	if(null != rows) param.put("rows",rows);
    	if(null != page) param.put("page",page);
    	Map<Object, Object> result = Connection.getInstance().getApi("/companyLegalperson/legalpersonList",param);
    	Map<Object, Object> m = (Map<Object, Object>)result.get("values");
    	if(null != m && m.containsKey("total")){
    		m.put("total",(m.containsKey("records")) ? m.get("records") : 0);
    	}
    	return m;
    }
    
    /**
     * 企业变更记录
     */
    @SuppressWarnings("unchecked")
	@RequestMapping(value="/myCompanyInfo/companyChangeList/{id}")
    public @ResponseBody Map<Object,Object> companyChangeList(@PathVariable Long id,Long page,Long rows){
    	Map<String,Object> param = new HashMap<String, Object>();
    	param.put("enterpriseId", id);
    	if(null != rows) param.put("rows",rows);
    	if(null != page) param.put("page",page);
    	Map<Object, Object> result = Connection.getInstance().getApi("/companyChange/companyChangeList",param);
    	Map<Object, Object> m = (Map<Object, Object>)result.get("values");
    	if(null != m && m.containsKey("total")){
    		m.put("total",(m.containsKey("records")) ? m.get("records") : 0);
    	}
    	return m;
    }
    
    /**
     * 进出口信息
     */
    @SuppressWarnings("unchecked")
	@RequestMapping(value="/myCompanyInfo/cusCompanyVpdnList/{id}")
    public @ResponseBody Map<Object,Object> cusCompanyVpdnList(@PathVariable Long id,Long page,Long rows){
    	Map<String,Object> param = new HashMap<String, Object>();
    	param.put("enterpriseId", id);
    	if(null != rows) param.put("rows",rows);
    	if(null != page) param.put("page",page);
    	Map<Object, Object> result = Connection.getInstance().getApi("/cusCompanyVpdn/cusCompanyVpdnList",param);
    	Map<Object, Object> m = (Map<Object, Object>)result.get("values");
    	if(null != m && m.containsKey("total")){
    		m.put("total",(m.containsKey("records")) ? m.get("records") : 0);
    	}
    	return m;
    }
    
    /**
     * 查询行业树
     */
    @SuppressWarnings("unchecked")
	@RequestMapping(value="/myCompanyInfo/buildIndustryTree")
    public @ResponseBody List<Object> buildIndustryTree(){
    	Map<Object, Object> result = Connection.getInstance().getApi("/cusEnterprise/buildIndustryTree");
    	return (List<Object>) result.get("values");
    }
    
    /**
      * 描述:<p>公司列表</P>
      * @author weihongjun
      * @param cusCompay
      * @param page
      * @return
      * @return List<CusCompany>
      * @throws
    */
    @RequestMapping("/companyList")
    public @ResponseBody Map<Object, Object>  companyLisSt()
    {
        return null;
        /*cusCompay.setCustomterId(CustomerUtils.getCurrentCustomerId());
        PagingResult<CusCompany> dataList = cusCompanyService.findCompanyList(cusCompay, page);
        return dataList;*/
    }
    
    /**
      * 描述:<p>公司详情</P>
      * @author weihongjun
      * @return ModelAndView
      * @throws
    */
    @RequestMapping("/companyDetail")
    public ModelAndView companyDetail(Long id)
    {
        ModelAndView view = new ModelAndView("/userClient/info/companyDetail");
        return view;
    }
    
    /**
      * 描述:<p>未被使用过的服务</P>
      * @author weihongjun
      * @return
      * @return List<OrdService>
      * @throws
    */
    @RequestMapping("/ordServiceList")
    public @ResponseBody Map<Object, Object> ordServiceList()
    {
        return null;
        /*ordService.setCustomerId(CustomerUtils.getCurrentCustomerId());
        List<OrdService> dataList=ordServiceService.findOrdService(ordService);
        return dataList;*/
    }
    
    private Map<Object, Object> findCompanyListByCus()
    {
        return null;
        /*com.jxhc.common.entity.CusCustomer customer = CustomerUtils.getCurrentCustomer();
        List<com.jxhc.common.entity.CusUICompanyListVO> companyList = null;
        if (customer != null && customer.getId() != null)
        {
            companyList = cusCompanyService.findCusUICompanyListByCusId(customer.getId());
        }
        return companyList;*/
    }
    
    /**
    *
    * @Description: 查询期间列表
    * @author zhongyang
    * @date 2016年2月24日
    *
   */
    @SuppressWarnings("unchecked")
    @RequestMapping("/queryPeriodList")
    @ResponseBody
    public List<Map<String, Object>> queryPeriodList()
    {
        List<Map<String, Object>> peridList = (List<Map<String, Object>>)WebUtils.getHttpSession().getAttribute(Constant.ACCOUNT_PERIOD_LIST_SESSION);
        return peridList;
    }

}
