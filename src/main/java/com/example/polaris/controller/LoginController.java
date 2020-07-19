package com.example.polaris.controller;

import com.example.polaris.common.Response;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class LoginController {

    private JdbcTemplate jdbcTemplate;
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public Response login(HttpServletRequest request){
        String userName = request.getParameter("userName");
        String password = request.getParameter("password");
        Response res = new Response();
        if(userName.isEmpty()){
            res.setResultMsg("请填写用户名");
            return res;
        }
        if(password.isEmpty()){
            res.setResultMsg("请填写密码");
            return res;
        }
        String sql = "";
        int data = jdbcTemplate.update(sql);
        return res;
    }
}
