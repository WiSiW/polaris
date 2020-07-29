package com.polaris.blog.controller;

import com.polaris.blog.common.ResResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

@RestController
public class AccountController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @RequestMapping(value = "/api/blog/listAccount", method = RequestMethod.POST)
    public ResResult listAccount(HttpServletRequest res) {
        String account_id = res.getParameter("account_id");
        String user_name = res.getParameter("user_name");
        String account_phone = res.getParameter("account_phone");
        System.out.println(user_name);
        ResResult resResult = new ResResult();
        String sql = "select * from p_account where account_id=? and user_name=? and account_phone=?";
        List<Map<String, Object>> list = jdbcTemplate.queryForList(sql, account_id, user_name);
        resResult.setResultMsg("");
        resResult.setData(list);
        return resResult;
    }

//    @RequestMapping(value = "/api/blog/addAccount", method = RequestMethod.POST)
//    public ResResult addAccount(HttpServletRequest res) {
//        String user_name = res.getParameter("user_name");
//        String password = res.getParameter("password");
//        String account_phone = res.getParameter("account_phone");
//        String nick_name = res.getParameter("nick_name");
//        String sex = res.getParameter("sex");
//        String email = res.getParameter("email");
//        String head_img = res.getParameter("head_img");
//        String creater = res.getParameter("creater");
//        String create_time = res.getParameter("create_time");
//        ResResult resResult = new ResResult();
//        KeyHolder keyHolder = new GeneratedKeyHolder();
//        String sql = "insert into " +
//                "p_account(user_name,password,account_phone,nick_name,sex,email,head_img,creater,create_time,is_delete) " +
//                "values (?,?,?,?,?,?,?,?,NOW(),0)";
//        System.out.println(sql);
//        try {
//            int id = jdbcTemplate.update(new PreparedStatementCreator() {
//                public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
//                    PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
//                    ps.setString(1, smsbean.getTitle());
//                    ps.setString(2, smsbean.getContent());
//                    ps.setString(3, smsbean.getForm());
//                    ps.setString(4, smsbean.getSffs());
//                    /*
//                     * by1 存放的是 草稿主人的ID
//                     * 当消息为发送。清楚by1的ID
//                     */
//                    ps.setString(5, "");
//                    ps.setString(6, smsbean.getBy2());
//                    ps.setString(7, smsbean.getBy3());
//                    return ps;
//                }
//            }, keyHolder);
////            int id = jdbcTemplate.update(sql, user_name, password, account_phone, nick_name, sex, email, head_img, creater, create_time);
//            resResult.setResultMsg("");
//            resResult.setData(id);
//            return resResult;
//        } catch (Error e) {
//            return resResult;
//        }
//    }

    @RequestMapping(value = "/api/blog/updateAccount", method = RequestMethod.POST)
    public ResResult updateAccount(HttpServletRequest res) {
        System.out.println(111);
        String account_id = res.getParameter("account_id");
        String user_name = res.getParameter("user_name");
        String password = res.getParameter("password");
        ResResult resResult = new ResResult();
        String sql = "update p_account(user_name,password) values (?,?) where account_id=?";
        System.out.println(sql);
        try {
            int id = jdbcTemplate.update(sql, user_name, password);
            resResult.setResultMsg("");
            resResult.setData(id);
            return resResult;
        } catch (Error e) {
            return resResult;
        }
    }

    @RequestMapping(value = "/api/blog/delAccount", method = RequestMethod.POST)
    public ResResult delAccount(HttpServletRequest res) {
        String account_id = res.getParameter("account_id");
        ResResult resResult = new ResResult();
        String sql = "update p_account set is_delete = 1 where account_id=?";
        System.out.println(sql);
        try {
            int id = jdbcTemplate.update(sql, account_id);
            resResult.setResultMsg("");
            resResult.setData(id);
            return resResult;
        } catch (Error e) {
            return resResult;
        }
    }
}
