package com.dyy.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;



public class CustomerUtils 
{
	public static String SESSION_KEY="user";

	public static Object getCurrentCustomer()
	{
		HttpSession session = getCurrentSession();
		if(session==null){
			return null;
		}
		return  session.getAttribute(SESSION_KEY);
	}
	
	public static HttpSession getCurrentSession()
	{
		HttpSession session =WebUtils.getHttpSession();
		return session;
	}
	
	public static void saveCurrentCutomer(Object customer)
	{
		HttpSession session = getCurrentSession();
		session.setAttribute(SESSION_KEY, customer);
	}
	
    public static void saveAccntBook(Map<String, Object> bookInfo)
    {
        if (bookInfo != null)
        {
            WebUtils.getHttpSession().setAttribute(Constant.ACCOUNT_BOOK_SESSION, bookInfo.get("accntBook"));
            WebUtils.getHttpSession().setAttribute(Constant.ACCOUNT_PERIOD_SESSION, bookInfo.get("currentPeriod"));
            WebUtils.getHttpSession().setAttribute(Constant.ACCOUNT_PERIOD_LIST_SESSION, bookInfo.get("periodList"));
        }
    }
    
    @SuppressWarnings("unchecked")
    public static List<Map<String, Object>> getPeriodList()
    {
        Object accountBookMap = WebUtils.getHttpSession().getAttribute(Constant.ACCOUNT_PERIOD_LIST_SESSION);
        if (accountBookMap == null)
        {
            return null;
        }
        return (List<Map<String, Object>>)accountBookMap;
    }
    
    /**
      * 描述:<p>查询账套信息</P>
      *
      * @author zhongyang
      * @param companyId
      * @return
      * @return Map<String,Object>
      * @throws
    */
    @SuppressWarnings("unchecked")
    public static Map<String, Object> getAccntBookByCompanyId(Long companyId)
    {
        if (companyId != null)
        {
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("companyId", companyId);
            Map<Object, Object> result = Connection.getInstance().getApi("/account/getAccntBookByCompanyId", param);
            if (result != null)
            {
                Map<String, Object> map = (Map<String, Object>)result.get("values");
                saveAccntBook(map);
                return map;
            }
        }
        return null;
    }
    
    
    /**
     *
     * @Description: 获取账套
     * @author zhongyang
     * @date 2016年2月22日
     *
     */
    @SuppressWarnings("unchecked")
    public static Map<String, Object> getAccntBookFormSession()
    {
        Object accountBookMap = WebUtils.getHttpSession().getAttribute(Constant.ACCOUNT_BOOK_SESSION);
        if (accountBookMap == null)
        {
            return null;
        }
        return (Map<String, Object>)accountBookMap;
    }
    
    public static Long getAccntBookIdFormSession()
    {
        Map<String, Object> bookMap = getAccntBookFormSession();
        if (bookMap == null)
        {
            return null;
        }
        return Long.valueOf(bookMap.get("id").toString());
    }

    /**
     *
     * @Description: 获取当前期间对象
     * @author zhongyang
     * @date 2016年2月22日
     *
     */
    @SuppressWarnings("unchecked")
    public static Map<String, Object> getCurrentAccntAccountPeriod()
    {
        Object accntPeriodMap = WebUtils.getHttpSession().getAttribute(Constant.ACCOUNT_PERIOD_SESSION);
        if (accntPeriodMap == null)
        {
            return null;
        }
        return (Map<String, Object>)accntPeriodMap;
    }
    
    /**
      * 描述:<p>获取当前期间ID</P>
      *
      * @author zhongyang
      * @return
      * @return Long
      * @throws
    */
    public static Long getCurrentAccntPeriodId()
    {
        Map<String, Object> accntPeriodMap = getCurrentAccntAccountPeriod();
        if (accntPeriodMap == null)
        {
            return null;
        }
        return Long.valueOf(accntPeriodMap.get("id").toString());
    }
	
}
