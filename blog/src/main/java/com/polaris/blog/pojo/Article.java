package com.polaris.blog.pojo;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.util.Date;

@Data
@ApiModel(value = "文章类",description = "请求参数")
public class Article {
    private int article_id;
    private int user_id;
    private String user_name;
    private int a_type;
    private String a_title;
    private String a_introduce;
    private String a_content;
    private Date a_create_time;
    private String a_head_img;
}
