package com.polaris.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {

    @RequestMapping(value = "/web/*")
    public String toWeb1() {
        return "/index";
    }
    @RequestMapping(value = "/web/*/*")
    public String toWeb2() {
        return "/index";
    }
}
