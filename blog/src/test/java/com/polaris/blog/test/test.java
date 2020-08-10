package com.polaris.blog.test;

import com.polaris.blog.Util.RedisClient;
import org.junit.jupiter.api.Test;

public class test {
    @Test
    public static void main(String[] args) {
        new RedisClient().show();
    }
}
