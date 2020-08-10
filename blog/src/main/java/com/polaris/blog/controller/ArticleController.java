package com.polaris.blog.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.polaris.blog.Util.MybatisUtil;
import com.polaris.blog.Util.Utils;
import com.polaris.blog.common.ResResult;
import com.polaris.blog.dao.mapper.ArticleMapper;
import com.polaris.blog.pojo.Article;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.util.Enumeration;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@Api(tags = "文章相关接口")
@RequestMapping("api/blog/article")
public class ArticleController {
    private Enumeration enumeration;
    private Map<String,Object> params;

    @RequestMapping(value = "/listArticle")
    public ResResult listArticle(HttpServletRequest request, HttpServletResponse response){
        enumeration = request.getParameterNames();
        params = Utils.generateMap(request,enumeration);
        if(!params.containsKey("pageIndex") || !params.containsKey("pageSize")){
            return new ResResult(null,400,"缺少参数");
        }
        int pageIndex = Integer.parseInt(params.get("pageIndex").toString());
        int pageSize = Integer.parseInt(params.get("pageSize").toString());
        SqlSession sqlSession = null;
        try {
            sqlSession = MybatisUtil.getSqlSession();
            Page page = PageHelper.startPage((pageIndex-1)*pageSize,pageSize,true);
            sqlSession.selectList("listArticleByPage",params);
            List list = page.getResult();
            if(list.isEmpty()){
                return new ResResult(null,400,"请求错误");
            }
            Map<String,Object> data = new LinkedHashMap<String,Object>();
            System.out.println(page);
            data.put("list",list);
            data.put("total",page.getTotal());
            return new ResResult(data,200,"返回成功");
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            sqlSession.close();
        }
    }

    @RequestMapping(value = "/getArticle")
    public ResResult getArticle(@RequestParam(value = "article_id" ,required = true) int article_id){
        if(article_id == 0){
            return new ResResult(null,400,"缺少article_id");
        }
        SqlSession sqlSession =null;
        try {
            sqlSession = MybatisUtil.getSqlSession();
            ArticleMapper articleMapper = sqlSession.getMapper(ArticleMapper.class);
            Article article = articleMapper.getArticle(article_id);
            return new ResResult(article,200,"返回成功");
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            sqlSession.close();
        }
    }

    @RequestMapping(value = "/upsertArticle")
    @ApiOperation(value = "文章新增或更新")
    @ApiResponse(code=400,message = "参数未填",response = ResResult.class)
    public ResResult upsertArticle(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        enumeration = request.getParameterNames();
        params = Utils.generateMap(request,enumeration);
        if(params.isEmpty() || !params.containsKey("user_id")){
            return new ResResult(null,400,"缺少user_id");
        }
        SqlSession sqlSession = MybatisUtil.getSqlSession();
        int count;
        try {
            if(params.containsKey("article_id")){
                //更新
                count = sqlSession.update("updateArticle",params);
            }else{
                //新增
                count = sqlSession.insert("insertArticle",params);
            }
            if(count == 1) {
                return new ResResult(params,201,"返回成功");
            }else{
                return new ResResult(null,201,"返回失败");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            sqlSession.close();
        }
    }
    @RequestMapping(value = "/delArticle",method = RequestMethod.POST)
    public ResResult delArticle(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int article_id = Utils.stringToInt(request.getParameter("article_id"));
        SqlSession sqlSession = MybatisUtil.getSqlSession();
        int count = 0;
        try {
            count = sqlSession.delete("delArticle",article_id);
            return new ResResult(count,204,"返回成功");
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            sqlSession.close();
        }
    }
}
