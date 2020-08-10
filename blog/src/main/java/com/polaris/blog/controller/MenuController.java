package com.polaris.blog.controller;

import com.polaris.blog.Util.MybatisUtil;
import com.polaris.blog.Util.Utils;
import com.polaris.blog.common.ResResult;
import com.polaris.blog.pojo.Menu;
import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/blog/menu")
public class MenuController {

    private Enumeration enumeration;
    private Map<String,Object> params;

    @RequestMapping(value = "/listMenu")
    public ResResult listMenu(HttpServletRequest request, HttpServletResponse response){
        enumeration = request.getParameterNames();
        params = Utils.generateMap(request,enumeration);
        if(!params.containsKey("menu_parent_id")){
            params.put("menu_parent_id",0);
        }
        SqlSession sqlSession = null;
        try {
            sqlSession = MybatisUtil.getSqlSession();
            System.out.println(params);
            List<Menu> menuList = sqlSession.selectList("listMenu",Integer.parseInt(params.get("menu_parent_id").toString()));
            System.out.println(menuList);
            for (Menu menu:menuList){
                List<Menu> children = sqlSession.selectList("listMenu",menu.getMenu_id());
                menu.setMenuList(children);
            }
            return new ResResult(menuList,200,"返回成功");
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            sqlSession.close();
        }
    }
    @RequestMapping(value = "/getMenu")
    public ResResult getMenu(HttpServletRequest request, HttpServletResponse response){
        enumeration = request.getParameterNames();
        params = Utils.generateMap(request,enumeration);
        if(!params.containsKey("menu_id") && !params.containsKey("menu_title")){
            return new ResResult(null,400,"缺少必要参数");
        }
        SqlSession sqlSession = null;
        try {
            sqlSession = MybatisUtil.getSqlSession();
            Menu menu = sqlSession.selectOne("getMenu",params);
            return new ResResult(menu,200,"返回成功");
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            sqlSession.close();
        }
    }
    @RequestMapping(value = "/upsertMenu",method = RequestMethod.POST)
    public ResResult upsertMenu(HttpServletRequest request, HttpServletResponse response) throws ParseException {
        enumeration = request.getParameterNames();
        params = Utils.generateMap(request,enumeration);
        if(!params.containsKey("menu_key")){
            return new ResResult(null,400,"缺少menu_key");
        }
        SqlSession sqlSession = null;
        int count = 0;
        try {
            sqlSession = MybatisUtil.getSqlSession();
            if(params.containsKey("menu_id")
                    && (params.get("menu_id").toString().equals("null")
                    || params.get("menu_id").toString().equals("undefined")
                    || params.get("menu_id").toString().equals(""))){
                params.remove("menu_id");
            }
            if(params.containsKey("menu_id")){
                params.put("menu_parent_id",0);
                System.out.println("更新");
                count = sqlSession.update("updateMenu",params);
            }else{
                System.out.println("新增");
                count = sqlSession.insert("insertMenu",params);
            }
            if(count == 1) {
                return new ResResult(params,201,"返回成功");
            }else{
                return new ResResult(params,400,"失败");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            sqlSession.close();
        }
    }
    @RequestMapping(value = "/delMenu",method = RequestMethod.POST)
    public ResResult delMenu(@RequestParam(value = "menu_id") int menu_id) {
        SqlSession sqlSession = null;
        int count = 0;
        try {
            sqlSession = MybatisUtil.getSqlSession();
            count = sqlSession.delete("delMenu",menu_id);
            return new ResResult(count,204,"删除成功");
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            sqlSession.close();
        }
    }
}
