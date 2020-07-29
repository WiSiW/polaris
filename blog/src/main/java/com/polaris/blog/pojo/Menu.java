package com.polaris.blog.pojo;

import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
public class Menu {
    private String title;
    private Menu menuList;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Menu getMenuList() {
        return menuList;
    }

    public void setMenuList(Menu menuList) {
        this.menuList = menuList;
    }

    @Override
    public String toString() {
        return "Menu{" +
                "title='" + title + '\'' +
                ", menuList=" + menuList +
                '}';
    }
}
