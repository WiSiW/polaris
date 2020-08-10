package com.polaris.blog.Util;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.regex.Pattern;

public class Utils {

    //判断数值字符串是否为空，不为空则转化为int，为空则返回0
    public static int stringToInt(String s){
        return (s == null || "".equals(s) || "null".equals(s))?0:Integer.parseInt(s);
    }
    //返回默认值
    public static int stringToInt(String s,int defaultValue){
        return (s == null || "".equals(s) || "null".equals(s))?defaultValue:Integer.parseInt(s);
    }

    //判断是否是数字
    public static boolean isInt(String s){
        return s.matches("^-?[1-9]\\d*$");
    }

    //获取map
    public static Map generateMap(HttpServletRequest request,Enumeration enumeration){
        Map<String,Object> params = new LinkedHashMap<String,Object>();
        while (enumeration.hasMoreElements()){
            String name = (String)enumeration.nextElement();
            String value = request.getParameter(name);
            if(!"".equals(value) && !"null".equals(value)){
                System.out.println(name + ":" + value);
                params.put(name,value);
            }
        }
        return params;
    }

    //正则判断是否为数字
    public static boolean isInteger(String str) {
        Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");
        return pattern.matcher(str).matches();
    }

    public static Date stringToDate(String s) throws ParseException {
        System.out.println(s);
        if (s == null || "".equals(s) || "null".equals(s)){
            System.out.println(111);
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            return sdf.parse(s);
        }catch (ParseException e){
            e.printStackTrace();
        }
        return  new Date();
    }
}
