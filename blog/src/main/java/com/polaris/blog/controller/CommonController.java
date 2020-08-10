package com.polaris.blog.controller;

import com.polaris.blog.common.ResResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RequestMapping("/api/blog/")
public class CommonController {
    @RequestMapping(value = "/listEnum",method = RequestMethod.GET)
    public ResResult listEnum(HttpServletResponse response){
        List[] data;
        return new ResResult(null,400,"缺少参数");
    }
}
