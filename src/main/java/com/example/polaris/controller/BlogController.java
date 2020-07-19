package com.example.polaris.controller;

import com.example.polaris.common.Response;
import com.example.polaris.dao.BlogMapper;
import com.example.polaris.pojo.Blog;
import com.example.polaris.util.MybatisUtil;
import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class BlogController {
    @RequestMapping(value = "/listBlog",method = RequestMethod.POST)
    public Response listBlog(HttpServletRequest request, HttpServletResponse response){
        SqlSession sqlSession = MybatisUtil.getSqlSession();
        BlogMapper blogMapper = sqlSession.getMapper(BlogMapper.class);
        List<Blog> blog = blogMapper.listBlog(2,2);
        System.out.println(blog);
        sqlSession.close();
        Response res = new Response();
        res.setData(blog.toString());
        res.setResultCode(400);
        res.setResultMsg("返回成功");
        return res;
    }
    @RequestMapping(value = "/getBlog",method = RequestMethod.POST)
    public Response getBlog(HttpServletRequest request, HttpServletResponse response){
        String b_id = request.getParameter("b_id");
        SqlSession sqlSession = MybatisUtil.getSqlSession();
        BlogMapper blogMapper = sqlSession.getMapper(BlogMapper.class);
        Blog blog = blogMapper.getBlogById(b_id);
        System.out.println(blog);
        Response res = new Response();
        res.setData(blog.toString());
        res.setResultCode(400);
        res.setResultMsg("返回成功");
        sqlSession.close();
        return res;
    }
}
