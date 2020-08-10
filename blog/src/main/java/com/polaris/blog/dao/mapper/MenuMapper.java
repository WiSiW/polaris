package com.polaris.blog.dao.mapper;

import com.polaris.blog.pojo.Menu;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MenuMapper {
    List<Menu> listMenu(@Param("menu_parent_id") int menu_parent_id);
    Menu getMenu(@Param("menu_id") int Menu_id);
    int insertMenu(@Param("menu") Menu menu);
    int updateMenu(@Param("Menu") Menu menu);
    int delMenu(@Param("menu_id") int menu_id);
}
