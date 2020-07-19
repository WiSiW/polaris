package com.example.polaris.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import com.example.polaris.controller.Article;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
public class ArticleController {

//    @Autowired
//    private final Article article;
//
//    public ArticleController(Article article) {
//        this.article = article;
//    }
    @Autowired
    private JdbcTemplate jdbcTemplate;
//    @RequestMapping(value = "/listBlog",method = RequestMethod.POST)
//    public Object hello(HttpServletRequest request){
//        String b_id = request.getParameter("b_id");
//        String sql = "select * from book where b_id = " + b_id;
//        List<Map<String,Object>> list = jdbcTemplate.queryForList(sql);
//        return list;
//    }
}
