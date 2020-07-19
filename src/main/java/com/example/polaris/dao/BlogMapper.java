package com.example.polaris.dao;

import com.example.polaris.pojo.Blog;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BlogMapper {
    List<Blog> listBlog(@Param("pageIndex") int pageIndex,@Param("pageSize") int pageSize);
    Blog getBlogById(@Param("b_id") String b_id);
}
