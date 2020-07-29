package com.polaris.blog.controller;

import com.polaris.blog.common.ResResult;
import com.polaris.blog.pojo.Menu;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MenuController {

    @RequestMapping(value = "/api/menu/listMenu",method = RequestMethod.GET)
    public ResResult listMenu(){
        System.out.println(111);
        Menu menu = new Menu();
        menu.setTitle("一级目录");
        menu.setMenuList(new Menu());
        ResResult rr = new ResResult();
        rr.setData(menu);
        return rr;
    }
}
