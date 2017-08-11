/**
 * 描述:<p></p>
 * @Title: CusSuggestionAction.java
 * @Package com.dyy.action.customer
 * 
 * @author zhongyang
 * @date 2017年2月23日 下午3:03:54
*/


package com.dyy.action.customer;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.dyy.action.TopAction;
import com.dyy.annotation.AuthLoginAnnotation;
import com.dyy.service.CustomerService;

/**
 * 描述:<p></p>
 * @ClassName: CusSuggestionAction
 * @author zhongyang
 * @date 2017年2月23日 下午3:03:54
 *
 */
@RestController
@AuthLoginAnnotation
@RequestMapping("/suggestion")
public class CusSuggestionAction  extends TopAction
{
	@Autowired
	private CustomerService customerService;
	
    @RequestMapping("/index")
    public ModelAndView index(HttpSession session)
    {
        ModelAndView view = new ModelAndView("/userClient/suggestions");
        view.addObject("dataList", customerService.getMyAdviseList());       
        return view;
    }
    
    @RequestMapping("/submitForm")
    public void submitForm(HttpServletResponse response)
    {
        /*cusAdvise.setAdviseType("0"); // 0表示投诉建议
        cusAdvise.setIsRead("1");
        int saveCusAdvise = adviseService.saveCusAdvise(cusAdvise);
        try
        {
            PrintWriter printWriter = response.getWriter();
            printWriter.print(String.valueOf(saveCusAdvise));
            printWriter.close();
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }*/
    }
    
    @RequestMapping("/wapSugges")
    public @ResponseBody Map<Object, Object> wapSugges()
    {
        return null;
        /*cusAdvise.setAdviseType("0"); // 0表示投诉建议
        cusAdvise.setIsRead("1");
        adviseService.saveCusAdvise(cusAdvise);
        Result<CusAdvise> result = new Result<CusAdvise>();
        result.setData(cusAdvise);
        result.success();
        return result;*/
    }
    
    @RequestMapping("/wapSuggesList")
    public @ResponseBody Map<Object, Object> wapSuggesList()
    {
        return null;
        /*Result<List<CusAdvise>> result = new Result<List<CusAdvise>>();
        CusCustomer customer = CustomerUtils.getCurrentCustomer();
        List<CusAdvise> dataList = adviseService.finAll(customer.getId());
        result.setData(dataList);
        result.success();
        return result;*/
    }
}
