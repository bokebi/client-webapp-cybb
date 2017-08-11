/**
 * 描述:<p></p>
 * @Title: CusRecommendAction.java
 * @Package com.dyy.action.customer
 * 
 * @author zhongyang
 * @date 2017年2月23日 下午2:56:18
*/


package com.dyy.action.customer;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.utils.Connection;

/**
 * 描述:<p></p>
 * @ClassName: CusRecommendAction
 * @author zhongyang
 * @date 2017年2月23日 下午2:56:18
 *
*/
@RestController
@RequestMapping("/recommend")
public class CusRecommendAction extends TopAction
{
    public final static String MOBILE_REG = "1[3|4|5|7|8][0-9]{9}";
    
    /**
     * 消息中心首页
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest request) {
        ModelAndView view = new ModelAndView("/userClient/recommend");
        Map<Object, Object> result = Connection.getInstance().getApi("/cusRecommend/countCusRecommend");
        view.addObject("countRecommed", result.get("values"));
        
        
        /*CusCustomer customer = CustomerUtils.getCurrentCustomer();
        Map<String, String> querymyRecommend = recommendService.querymyRecommend(customer.getId());
        java.text.DecimalFormat df = new java.text.DecimalFormat("#0.0");
        querymyRecommend.put("Integral", df.format(commissionService .findIntegralByCusId(customer.getId())));
        request.setAttribute("querymyRecommend", querymyRecommend);

        int row = 0;
        SysParameter parameter = parameterService.getParameter("qrcode_url");
        view.addObject("rowSize", row);
        view.addObject("parameter", parameter);*/
        return view;
    }

    @RequestMapping("/add")
    @ResponseBody
    public Integer addRecommend(HttpServletRequest request,String needUserLinkTime1) {

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        /*Date date = null;
        try {
            date = format.parse(needUserLinkTime1);
        } catch (ParseException e) {
            // 不需要处理
        }
        recomm.setNeedUserLinkTime(date);
        CusCustomer customer = CustomerUtils.getCurrentCustomer();
        CusCustomer cus = new CusCustomer();
        cus.setCustomerMobile(recomm.getCustomerMobile());
        // 当推荐用户存在时， 不做处理
        if (null != customerService.getCustomer(cus)) {
            return 0;
        }
        cus.setCustomerName(recomm.getCustomerName());
        cus.setIsRegister("1");
        customerService.saveCusCustomer(cus);
        // 设置为用户推荐
        recomm.setRecommendType("1"); // 客户推荐
        recomm.setRecommendId(customer.getId());
        recomm.setRecommendChannel("0"); // 手动添加
        recomm.setIsServiceFollow("0");// 默认需要跟进
        recomm.setIsKown(null == recomm.getIsKown() ? "N" : "Y".equals(recomm
                .getIsKown()) ? "Y" : "N");
        recomm.setCustomerId(cus.getId());
        if (recomm.getFlowName() != null) {
            String flowNames = "";
            for (String flowName : recomm.getFlowName()) {
                if (!"".equals(flowNames)) {
                    flowNames += ",";
                }
                flowNames += flowName;
            }
            recomm.setNeedService(flowNames);
        }

        recommendService.addRecommend(recomm);*/
        return 0;
    }

    /**
     * 获取推荐明细
     * 
     * @param request
     * @param search
     * @return
     */
    @RequestMapping("/listRecommend")
    @ResponseBody
    public List<Map<Object, Object>> listRecommend(HttpServletRequest request, String search, Integer pageNo)
    {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        if (search != null && !"".equals(search))
        {
            paramMap.put("searchValue", search);
        }
        paramMap.put("pageNo", pageNo == null ? 1 : pageNo);
        Map<Object, Object> result = Connection.getInstance().postApi("/cusRecommend/listCusRecommend", paramMap);
        return (List<Map<Object, Object>>)result.get("values");
    }

    /**
     * 获取付费明细
     * 
     * @param request
     * @param search
     * @return
     */
    @RequestMapping("/listPayment")
    @ResponseBody
    public Map<Object, Object> listPayment(HttpServletRequest request,String search) 
    {
        return null;
        /*CusCustomer customer = CustomerUtils.getCurrentCustomer();
        return commissionService.listPayment(customer.getId(), search, page);*/
    }

    /**
     * 根据客户获取付费提成明细
     * 
     * @param id
     * @return
     */
    @RequestMapping("/listRecommendByCus")
    @ResponseBody
    public List<Map<String, Object>> listRecommendByCus(Long id) {
        return null;
    }

    /**
     * 获取客户的跟进记录
     * 
     * @author luoxin
     * @param customerId
     * @return
     */
    @RequestMapping("listTraceByCus")
    public @ResponseBody Map<Object, Object> listTraceByCus(Long customerId) 
    {
        return null;
    }

    
    @RequestMapping("/wapAddRecommend")
    @ResponseBody
    public Map<Object, Object> wapAddRecommend() {
        return null;
        /*Result<CusRecommend> result=new Result<CusRecommend>();
        CusCustomer customer = CustomerUtils.getCurrentCustomer();
        CusCustomer cus = new CusCustomer();
        cus.setCustomerMobile(recomm.getCustomerMobile());
        if(Strings.isEmpty(recomm.getCustomerMobile())){
            result.setMsg("手机号码不能为空！");
            return result;
        }
        if(!recomm.getCustomerMobile().matches(MOBILE_REG)){
            result.setMsg("手机号码格式不正确！");
            return result;
        }
        // 当推荐用户存在时， 不做处理
        if (null != customerService.getCustomer(cus)) 
        {
            result.setMsg(recomm.getCustomerMobile()+"的客户已经是系统客户！");
            return  result;
        }
        cus.setCustomerName(recomm.getCustomerName());
        cus.setIsRegister("1");
        customerService.saveCusCustomer(cus);
        // 设置为用户推荐
        recomm.setRecommendType("1"); // 客户推荐
        recomm.setRecommendId(customer.getId());
        recomm.setRecommendChannel("0"); // 手动添加
        recomm.setIsServiceFollow("0");// 默认需要跟进
        recomm.setIsKown(null == recomm.getIsKown() ? "N" : "Y".equals(recomm.getIsKown()) ? "Y" : "N");
        recomm.setCustomerId(cus.getId());
        if (recomm.getFlowName() != null) {
            String flowNames = "";
            for (String flowName : recomm.getFlowName()) 
            {
                if (!"".equals(flowNames)) {
                    flowNames += ",";
                }
                flowNames += flowName;
            }
            recomm.setNeedService(flowNames);
        }
        recommendService.addRecommend(recomm);
        result.success();
        return result;*/
    }
    
    /**
      * 描述:<p>推荐人数统计</P>
      * @author weihongjun
      * @return Result<Map<String,String>>
    */
    @RequestMapping("/wapRecommendCount")
    @ResponseBody
    public Map<Object, Object> wapRecommendCount()
    {
        return null;
        /*Result<Map<String,String>> result=new Result<Map<String,String>>();
        CusCustomer customer = CustomerUtils.getCurrentCustomer();
        Map<String, String> querymyRecommend = recommendService.querymyRecommend(customer.getId());
        result.setData(querymyRecommend);
        result.success();
        return result;*/
    }
    
    /**
      * 描述:<p>付费明细</P>
      *
      * @author weihongjun
      * @param request
      * @param search
      * @return
      * @return Result<List<Map<String,String>>>
      * @throws
    */
    @RequestMapping("/paymentDetail")
    @ResponseBody
    public Map<Object, Object>  paymentDetail(HttpServletRequest request, String search)
    {
        return null;
        /*Result<List<Map<String, String>>> result=new Result<List<Map<String,String>>>();
        CusCustomer customer = CustomerUtils.getCurrentCustomer();
        List<Map<String, String>> dataList = commissionService.listPaymentByCusId(customer.getId());
        result.setData(dataList);
        result.success();
        return result;*/
    }
}
