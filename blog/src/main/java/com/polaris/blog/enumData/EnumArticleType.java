package com.polaris.blog.enumData;

public enum EnumArticleType {
    BLOG(1,"博客","blog"),ARTICLE(2,"文章","article");
    private int code;
    private String text;
    private String key;

    private EnumArticleType(int code, String text, String key) {
        this.code = code;
        this.text = text;
        this.key = key;
    }

    @Override
    public String toString() {
        return "{" +
                "code=" + code +
                ", text='" + text + '\'' +
                ", key='" + key + '\'' +
                '}';
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
