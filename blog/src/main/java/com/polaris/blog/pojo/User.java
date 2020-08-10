package com.polaris.blog.pojo;

import lombok.Data;

import java.util.Date;


@Data
public class User {
    private int user_id;
    private String user_name;
    private String password;
    private String u_head_img;
    private Date u_create_time;
    private String token;

    public User(int user_id, String user_name, String password, String u_head_img, Date u_create_time, String token) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.password = password;
        this.u_head_img = u_head_img;
        this.u_create_time = u_create_time;
        this.token = token;
    }
}
