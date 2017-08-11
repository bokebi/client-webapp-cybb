package com.dyy.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Utils
{
    
    public static final String KEY_MD5 = "MD5";  

     
    /** 
     * @Description MD5加密
     * @author 魏红军
     * @param plainText
     * @return  
     */
    public static String  encryptMD5(String plainText) 
    {
        StringBuffer buf = new StringBuffer("");
        try
        {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(plainText.getBytes());
            byte b[] = md.digest();
            int i;
            
            for (int offset = 0; offset < b.length; offset++)
            {
                i = b[offset];
                if (i < 0)
                    i += 256;
                if (i < 16)
                    buf.append("0");
                buf.append(Integer.toHexString(i));
            }
        }
        catch (NoSuchAlgorithmException e)
        {
            e.printStackTrace();
        }
        return buf.toString();
    }
    
    /** 
     * @Description MD5加密
     * @author 魏红军
     * @param byte []
     * @return  
     */
    public static String  encryptMD5(byte [] bytes) 
    {
        StringBuffer buf = new StringBuffer("");
        try
        {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(bytes);
            byte b[] = md.digest();
            int i;
            
            for (int offset = 0; offset < b.length; offset++)
            {
                i = b[offset];
                if (i < 0)
                    i += 256;
                if (i < 16)
                    buf.append("0");
                buf.append(Integer.toHexString(i));
            }
        }
        catch (NoSuchAlgorithmException e)
        {
            e.printStackTrace();
        }
        return buf.toString();
    }
    
}
