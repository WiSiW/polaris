package com.polaris.blog.dao.mapper;

import com.polaris.blog.pojo.Article;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ArticleMapper {
    List<Article> listArticleByPage(@Param("user_id") int user_id);
    Article getArticle(@Param("article_id") int article_id);
    int insertArticle(@Param("article") Article article);
    int updateArticle(@Param("article") Article article);
    int delArticle(@Param("article_id") int article_id);
}
