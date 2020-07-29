package com.polaris.blog.controller;

import com.polaris.blog.common.ResResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
public class ArticleController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @RequestMapping(value = "/api/blog/listArticle",method = RequestMethod.POST)
    public ResResult listArticle(HttpServletRequest res) {
        String a_id = res.getParameter("article_id");
        ResResult resResult = new ResResult();
//        if(a_id.isEmpty()){
//            resResult.setResultCode(400);
//            resResult.setResultMsg("id为空");
//            return resResult;
//        }
        String sql = "select * from p_account";
        List<Map<String,Object>> list = jdbcTemplate.queryForList(sql);
        resResult.setResultMsg("");
        resResult.setData(list);
        return resResult;
    }
}
