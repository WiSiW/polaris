package com.polaris.blog.pojo;

import lombok.Data;

import java.util.List;

@Data
public class Menu {
    private int menu_id;
    private int menu_parent_id;
    private String menu_title;
    private String menu_key;
    private int menu_sort_index;
    private String menu_icon;
    private String menu_introduction;
    private String menu_path;
    private List<Menu> menuList;

}
