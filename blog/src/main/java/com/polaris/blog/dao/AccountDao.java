package com.polaris.blog.dao;

import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.sql.Statement;

public interface AccountDao {

//    public int addBlog(Blog blog) {
//        KeyHolder keyHolder = new GeneratedKeyHolder();
//        String sql = "insert into blog(blogger_id,title,content,blog_type) values (?,?,?,?)";
//        PreparedStatementCreator preparedStatementCreator = con -> {
//            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
//            ps.setInt(1,blog.getBlogger_id());
//            ps.setString(2,blog.getTitle());
//            ps.setString(3,blog.getContent());
//            return ps;
//        };
//        template.update(preparedStatementCreator, keyHolder);
//        int bloggerId = keyHolder.getKey().intValue();//获取最终插入的自增的id
//        return bloggerId;
//    }
}
