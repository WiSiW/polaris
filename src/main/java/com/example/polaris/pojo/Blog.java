package com.example.polaris.pojo;

import lombok.Data;
import lombok.ToString;

import java.util.Objects;


@Data
@ToString
public class Blog {
    private Integer b_id;
    private String b_name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Blog blog = (Blog) o;
        return Objects.equals(b_id, blog.b_id) &&
                Objects.equals(b_name, blog.b_name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(b_id, b_name);
    }

    @Override
    public String toString() {
        return "{" +
                "b_id=" + b_id +
                ", b_name='" + b_name + '\'' +
                '}';
    }
}
