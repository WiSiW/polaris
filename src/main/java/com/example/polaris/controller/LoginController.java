package com.example.polaris.controller;

import com.example.polaris.common.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class LoginController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @RequestMapping(value = "api/login",method = RequestMethod.POST)
    public Response login(HttpServletRequest request){
        String user_name = request.getParameter("user_name");
        String password = request.getParameter("password");
        Response res = new Response();
        System.out.println(user_name);
        System.out.println(password);
        if(user_name.isEmpty()){
            res.setResultMsg("请填写用户名");
            return res;
        }
        if(password.isEmpty()){
            res.setResultMsg("请填写密码");
            return res;
        }
        String sql = "select password from p_account where user_name=" + user_name;
        System.out.println(sql);
        SqlRowSet data = jdbcTemplate.queryForRowSet(sql);
        System.out.println(data.getString("password"));
        return res;
    }
}
