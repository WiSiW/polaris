package com.polaris.blog.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.polaris.blog.Util.MybatisUtil;
import com.polaris.blog.Util.TokenProccessor;
import com.polaris.blog.Util.Utils;
import com.polaris.blog.common.ResResult;
import com.polaris.blog.pojo.User;
import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.util.Enumeration;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("api/blog/user")
public class UserController {
    private Enumeration enumeration;
    private Map<String,Object> params;
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public ResResult login(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        enumeration = request.getParameterNames();
        params = Utils.generateMap(request,enumeration);
        String codeImg=(String) request.getSession().getAttribute("text");
        if(params.containsKey("user_name") || params.containsKey("password")){
            return new ResResult(null,400,"用户名或者密码错误");
        }
        if(codeImg.equals("") || codeImg.equals("null")){
            return new ResResult(null,400,"验证码错误，请刷新重试");
        }
        SqlSession sqlSession = null;
        try {
            sqlSession = MybatisUtil.getSqlSession();
            int user_id = sqlSession.selectOne("login",params);
            System.out.println(user_id);
            if(user_id == 0){
                return new ResResult(null,400,"用户名或者密码错误");
            }
            String user_name = params.get("user_name").toString();
            String password = params.get("password").toString();
            String token = TokenProccessor.token(user_name, password);
            User user = new User(user_id,user_name,password,"",null,token);
            System.out.println(user);
            user_id = sqlSession.update("updateUser",params);
            System.out.println(user_id);
            if(user_id == 0){
                return new ResResult(user,200,"登录成功");
            }else{
                return new ResResult(null,400,"登录失败");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            sqlSession.close();
        }
    }
    @RequestMapping(value = "/listUser",method = RequestMethod.POST)
    public ResResult listUser(HttpServletRequest request, HttpServletResponse response){
        enumeration = request.getParameterNames();
        params = Utils.generateMap(request,enumeration);
        if(!params.containsKey("pageIndex") || !params.containsKey("pageSize")){
            return new ResResult(null,400,"缺少参数");
        }
        SqlSession sqlSession = null;
        Map<String,Object> data = new LinkedHashMap<String,Object>();
        try {
            int pageIndex = Integer.parseInt(params.get("pageIndex").toString());
            int pageSize = Integer.parseInt(params.get("pageSize").toString());
            sqlSession = MybatisUtil.getSqlSession();
            Page page = PageHelper.startPage((pageIndex-1)*pageSize,pageSize,true);
            sqlSession.selectList("listUser",params);
            data = new LinkedHashMap<String,Object>();
            System.out.println(page);
            data.put("list",page.getResult());
            data.put("total",page.getTotal());
            return new ResResult(data,200,"返回成功");
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            sqlSession.close();
        }
    }
    @RequestMapping(value = "/getUser")
    public ResResult getUser(HttpServletRequest request, HttpServletResponse response){
        enumeration = request.getParameterNames();
        params = Utils.generateMap(request,enumeration);
        if(!params.containsKey("user_id") && !params.containsKey("user_name")){
            return new ResResult(null,400,"缺少必要参数");
        }
        SqlSession sqlSession = null;
        try {
            sqlSession = MybatisUtil.getSqlSession();
            User user = sqlSession.selectOne("getUser",params);
            return new ResResult(user,200,"返回成功");
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            sqlSession.close();
        }
    }
    @RequestMapping(value = "/upsertUser",method = RequestMethod.POST)
    public ResResult upsertUser(HttpServletRequest request, HttpServletResponse response) throws ParseException {
        enumeration = request.getParameterNames();
        params = Utils.generateMap(request,enumeration);
        SqlSession sqlSession = null;
        int count = 0;
        try {
            sqlSession = MybatisUtil.getSqlSession();
            User user = new User(
                    params.containsKey("user_id")?Integer.parseInt(params.get("user_id").toString()):null,
                    params.containsKey("user_name")?params.get("user_name").toString():null,
                    params.containsKey("password")?params.get("password").toString():null,
                    params.containsKey("u_head_img")?params.get("u_head_img").toString():null,
                    params.containsKey("u_create_time")?Utils.stringToDate(params.get("u_create_time").toString()):null,
                    params.containsKey("token")?params.get("token").toString():null
            );
            if(params.containsKey("user_id")){
                System.out.println("更新");
                count = sqlSession.update("updateUser",user);
            }else{
                System.out.println("新增");
                count = sqlSession.insert("insertUser",user);
            }
            if(count == 1) {
                return new ResResult(user,201,"返回成功");
            }else{
                return new ResResult(user,201,"失败");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            sqlSession.close();
        }
    }
    @RequestMapping(value = "/delUser",method = RequestMethod.POST)
    public ResResult delUser(@RequestParam(value = "user_id") int user_id) {
        SqlSession sqlSession = null;
        int count = 0;
        try {
            sqlSession = MybatisUtil.getSqlSession();
            count = sqlSession.delete("delUser",user_id);
            return new ResResult(count,204,"删除成功");
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            sqlSession.close();
        }
    }
}
