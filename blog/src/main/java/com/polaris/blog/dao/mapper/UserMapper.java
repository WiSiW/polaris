package com.polaris.blog.dao.mapper;

import com.polaris.blog.pojo.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {
    Integer login(@Param("user_name") String user_name,@Param("password") String password);
    List<User> listUser(@Param("pageIndex") int pageIndex, @Param("pageSize") int pageSize);
    User getUser(@Param("user_id") int user_id);
    int insertUser(@Param("user") User user);
    int updateUser(@Param("user") User user);
    int delUser(@Param("user_id") int user_id);
}
