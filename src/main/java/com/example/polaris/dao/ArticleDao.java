package com.example.polaris.dao;

import com.example.polaris.controller.Article;
import java.util.List;

public interface ArticleDao {
    public List<Article> listArticle();

    public void updateArticle(Integer b_id, String b_title, String b_title_img);

    public Article getArticle(Integer b_id);

    public void deleteArticle(Integer b_id);
}
