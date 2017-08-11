package com.dyy.action.customer;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.utils.Connection;
import com.dyy.utils.CustomerUtils;

/**
  * @Description: 客户UI报表
  * @author zhongyang
  * @date 2016年2月25日 下午6:01:25
  *
 */
@RequestMapping("/cusReport")
@Controller
public class CusCompanyReportAction extends TopAction
{
    private Logger logger = LoggerFactory.getLogger(CusCompanyReportAction.class);
    
    /**
     *
     * @Description: 查看报表
     * @author zhongyang
     * @date 2016年2月25日
     *
     */
    @RequestMapping("/viewReport")
    public ModelAndView viewReport(HttpServletRequest request, Long companyId)
    {
        ModelAndView view = new ModelAndView("/userClient/companyReports");
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("id", companyId);
        Map<Object, Object> result = Connection.getInstance().getApi("/cusEnterprise/getCusEnterprise",param);
        if (result != null)
        {
            @SuppressWarnings("unchecked")
            Map<Object, Object> cusEnterprise = (Map<Object, Object>)result.get("values");
            if(cusEnterprise != null){
                view.addObject("companyInfo", cusEnterprise);
                CustomerUtils.getAccntBookByCompanyId(companyId);
                view.addObject("currentCompanyId", companyId);
            }
        }
        return view;
    }

    /**
     *
     * @Description: 明细账
     * @author zhongyang
     * @date 2016年2月19日
     *
     */
    @SuppressWarnings("unchecked")
    @RequestMapping("/queryDetailList")
    @ResponseBody
    public List<Map<String, Object>> queryDetailList(Long startPeriodId, Long endPeriodId, Long subjectId)
    {
        Long accntAccountBookId = CustomerUtils.getAccntBookIdFormSession();
        if (subjectId == null || accntAccountBookId == null)
        {
            return null;
        }
        try
        {
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("accountBookId", accntAccountBookId);
            param.put("startPeriodId", startPeriodId);
            param.put("endPeriodId", endPeriodId);
            param.put("subjectId", subjectId);
            Map<Object, Object> result = Connection.getInstance().getApi("/account/queryDetailList", param);
            return (List<Map<String, Object>>)(result != null ? result.get("values") : null);
        }
        catch (Exception e)
        {
            logger.error("==========远程调用做账系统查询明细账：============", e.getMessage());
        }
        return null;
    }

    /**
     *
     * @Description: 导出明细账
     * @author zhongyang
     * @date 2016年2月27日
     *
     */
    @RequestMapping("/exportDetailExcel")
    public void exportDetailExcel(HttpServletResponse response, String startDetaiId, String endDetailId)
        throws Exception
    {
        // 获取帐套信息
        Long accountBookId = CustomerUtils.getAccntBookIdFormSession();
        if (accountBookId != null)
        {
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("accountBookId", accountBookId);
            param.put("startDetaiId", startDetaiId);
            param.put("endDetailId", endDetailId);
            //Map<Object, Object> result = Connection.getInstance().getApi("/account/exportDetailExcel", param);
            byte[] bytes =  Connection.getInstance().getBetyArray("/account/exportDetailExcel", param);
            if (bytes != null)
            {
                SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
                String currentDate = df.format(new Date());
                byte[] fileNameByte = ("明细账列表_" + currentDate + ".xls").getBytes("GBK");
                String filename = new String(fileNameByte, "ISO8859-1");
                response.setContentType("application/x-msdownload");
                response.setContentLength(bytes.length);
                response.setHeader("Content-Disposition", "attachment;filename=" + filename);
                response.getOutputStream().write(bytes);
            }
        }
    }

    /**
     *
     * @Description: 查询公司总账报表数据
     * @author zhongyang
     * @date 2016年2月19日
     *
     */
    @SuppressWarnings("unchecked")
    @RequestMapping("/queryLedgerList")
    @ResponseBody
    public List<Map<String, Object>> queryLedgerList(Long startPeriodId, Long endPeriodId)
    {
        // 获取帐套信息
        Long accountBookId = CustomerUtils.getAccntBookIdFormSession();
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("accountBookId", accountBookId);
        param.put("startPeriodId", startPeriodId);
        param.put("endPeriodId", endPeriodId);
        Map<Object, Object> result = Connection.getInstance().getApi("/account/queryLedgerList", param);
        return (List<Map<String, Object>>)(result != null ? result.get("values") : null);
    }

    /**
     * 
     * @Title: exportExcel
     * @Description: 导出总账列表
     * @author: zhongyang
     *
     * @param request
     * @param response
     * @param param
     * @throws Exception
     */
    @RequestMapping("/exportLedgerExcel")
    public void exportLedgerExcel(HttpServletResponse response, String startLedgerId, String endLedgerId)
        throws Exception
    {
        // 获取帐套信息
        Long accountBookId = CustomerUtils.getAccntBookIdFormSession();
        if (accountBookId != null)
        {
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("accountBookId", accountBookId);
            param.put("startLedgerId", startLedgerId);
            param.put("endLedgerId", endLedgerId);
            byte[] bytes = Connection.getInstance().getBetyArray("/account/exportLedgerExcel", param);
            // 添加操作日志
            if (bytes != null)
            {
                SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
                String currentDate = df.format(new Date());
                byte[] fileNameByte = ("总账列表_" + currentDate + ".xls").getBytes("GBK");
                String filename = new String(fileNameByte, "ISO8859-1");
                response.setContentType("application/x-msdownload");
                response.setContentLength(bytes.length);
                response.setHeader("Content-Disposition", "attachment;filename=" + filename);
                response.getOutputStream().write(bytes);
            }
        }
    }

    /**
     *
     * @Description: 科目余额
     * @author zhongyang
     * @date 2016年2月19日
     *
     */
    @SuppressWarnings("unchecked")
    @RequestMapping("/balanceList")
    @ResponseBody
    public Map<String, Object> queryBalanceList(Long startPeriodId, Long endPeriodId)
    {
        // 获取帐套信息
        Long accountBookId = CustomerUtils.getAccntBookIdFormSession();
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("accountBookId", accountBookId);
        param.put("startPeriodId", startPeriodId);
        param.put("endPeriodId", endPeriodId);
        Map<Object, Object> result = Connection.getInstance().getApi("/account/balanceList", param);
        return (Map<String, Object>)result.get("values");
    }

    /**
     * 
     * @Title: exportExcel
     * @Description: 科目余额报表导出
     * @author: zhongyang
     *
     * @param request
     * @param response
     * @param param
     * @throws Exception
     */
    @RequestMapping("/exportBalanceExcel")
    public void exportBalanceExcel(HttpServletResponse response, String startBalanceId, String endBalanceId)
        throws Exception
    {
        // 获取帐套信息
        Long accountBookId = CustomerUtils.getAccntBookIdFormSession();
        if (accountBookId != null)
        {
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("accountBookId", accountBookId);
            param.put("startBalanceId", startBalanceId);
            param.put("endBalanceId", endBalanceId);
            byte[] bytes = Connection.getInstance().getBetyArray("/account/exportBalanceExcel", param);
            if (bytes != null)
            {
                SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
                String currentDate = df.format(new Date());
                byte[] fileNameByte = ("科目余额表_" + currentDate + ".xls").getBytes("GBK");
                String filename = new String(fileNameByte, "ISO8859-1");
                response.setContentType("application/x-msdownload");
                response.setContentLength(bytes.length);
                response.setHeader("Content-Disposition", "attachment;filename=" + filename);
                response.getOutputStream().write(bytes);
            }
        }
    }

    /**
     *
     * @Description: 资产负载表
     * @author zhongyang
     * @date 2016年2月19日
     *
     */
    @SuppressWarnings("unchecked")
    @RequestMapping("/searchZCFZB")
    @ResponseBody
    public Map<String, String> searchZCFZB(Long periodId)
    {
        // 获取帐套信息
        Long accountBookId = CustomerUtils.getAccntBookIdFormSession();
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("accountBookId", accountBookId);
        param.put("periodId", periodId);
        Map<Object, Object> result = Connection.getInstance().getApi("/account/searchZCFZB", param);
        return (Map<String, String>)result.get("values");
    }

    /**
     *
     * @Description: 利润表
     * @author zhongyang
     * @date 2016年2月19日
     *
     */
    @SuppressWarnings("unchecked")
    @RequestMapping("/searchLRB")
    @ResponseBody
    public Map<String, String> searchLRB(Long periodId)
    {
        // 获取帐套信息
        Long accountBookId = CustomerUtils.getAccntBookIdFormSession();
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("accountBookId", accountBookId);
        param.put("periodId", periodId);
        Map<Object, Object> result = Connection.getInstance().getApi("/account/searchLRB", param);
        return (Map<String, String>)result.get("values");
    }

    /**
     *
     * @Description: 导出利润表
     * @author zhongyang
     * @date 2016年2月27日
     *
     */
    @RequestMapping("/lrbExport")
    public void lrbExport(HttpServletRequest request, HttpServletResponse response, Long LRBPeriodId)
        throws Exception
    {
        // 获取帐套信息
        Long accountBookId = CustomerUtils.getAccntBookIdFormSession();
        if (accountBookId != null)
        {
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("accountBookId", accountBookId);
            param.put("LRBPeriodId", LRBPeriodId);
            byte[] bytes = Connection.getInstance().getBetyArray("/account/lrbExport", param);
            if (bytes != null)
            {
                SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
                String currentDate = df.format(new Date());
                byte[] fileNameByte = ("利润表_" + currentDate + ".xls").getBytes("GBK");
                String filename = new String(fileNameByte, "ISO8859-1");
                response.setContentType("application/x-msdownload");
                response.setContentLength(bytes.length);
                response.setHeader("Content-Disposition", "attachment;filename=" + filename);
                response.getOutputStream().write(bytes);
            }
        }
    }

    /**
     *
     * @Description: 导出资产负债表
     * @author zhongyang
     * @date 2016年2月27日
     *
     */
    @RequestMapping("/zcfzbExport")
    public void zcfzbExport(HttpServletRequest request, HttpServletResponse response, Long ZCFZBPeriodId)
        throws Exception
    {
        // 获取帐套信息
        Long accountBookId = CustomerUtils.getAccntBookIdFormSession();
        if (accountBookId != null)
        {
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("accountBookId", accountBookId);
            param.put("ZCFZBPeriodId", ZCFZBPeriodId);
            byte[] bytes = Connection.getInstance().getBetyArray("/account/zcfzbExport", param);
            if (bytes != null)
            {
                SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
                String currentDate = df.format(new Date());
                byte[] fileNameByte = ("资产负债表_" + currentDate + ".xls").getBytes("GBK");
                String filename = new String(fileNameByte, "ISO8859-1");
                response.setContentType("application/x-msdownload");
                response.setContentLength(bytes.length);
                response.setHeader("Content-Disposition", "attachment;filename=" + filename);
                response.getOutputStream().write(bytes);
            }
        }
    }

    /**
     *
     * @Description: 电子凭证首页
     * @author zhongyang
     * @date 2016年2月25日
     *
     */
    @SuppressWarnings("unchecked")
    @RequestMapping("/voucherIndex")
    @ResponseBody
    public Map<String, Object> voucherIndex(Long periodId)
    {
        // 获取帐套信息
        Long accountBookId = CustomerUtils.getAccntBookIdFormSession();
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("accountBookId", accountBookId);
        param.put("periodId", periodId);
        Map<Object, Object> result = Connection.getInstance().getApi("/account/voucherIndex", param);
        return (Map<String, Object>)result.get("values");
    }

    /**
     *
     * @Description: 客户UI查询凭证
     * @author zhongyang
     * @date 2016年2月25日
     *
     */
    @SuppressWarnings("unchecked")
    @RequestMapping("/queryCusUIVoucher")
    @ResponseBody
    public Map<String, Object> queryCusUIVoucher(Long voucherId, Long periodId)
    {
        Long accountBookId = CustomerUtils.getAccntBookIdFormSession();
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("accountBookId", accountBookId);
        param.put("periodId", periodId);
        Map<Object, Object> result = Connection.getInstance().getApi("/account/queryCusUIVoucher", param);
        return (Map<String, Object>)result.get("values");
    }

    /**
     *
     * @Description: 凭证汇总表
     * @author zhongyang
     * @date 2016年2月25日
     *
     */
    @SuppressWarnings("unchecked")
    @RequestMapping("/queryVoucherSumReport")
    @ResponseBody
    public Map<String, Object> queryVoucherSumReport(Long periodId)
    {
        Long accountBookId = CustomerUtils.getAccntBookIdFormSession();
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("accountBookId", accountBookId);
        param.put("periodId", periodId);
        Map<Object, Object> result = Connection.getInstance().getApi("/account/queryVoucherSumReport", param);
        return (Map<String, Object>)result.get("values");
    }

    /**
     *
     * @Description: 加载科目列表
     * @author zhongyang
     * @date 2016年2月27日
     *
     */
    @SuppressWarnings("unchecked")
    @RequestMapping("/loadSubject")
    @ResponseBody
    public List<Map<String, Object>> loadSubject(Long endPeriodId)
    {
        Long accountBookId = CustomerUtils.getAccntBookIdFormSession();
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("accountBookId", accountBookId);
        param.put("endPeriodId", CustomerUtils.getCurrentAccntPeriodId());
        param.put("currentAccntPeriodId", endPeriodId);
        Map<Object, Object> result = Connection.getInstance().getApi("/account/loadSubject", param);
        return (List<Map<String, Object>>)result.get("values");
    }
}
