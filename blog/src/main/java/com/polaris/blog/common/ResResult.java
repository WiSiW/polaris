package com.polaris.blog.common;

import lombok.Data;

@Data
public class ResResult {
    private Object data;
    private int status;
    private String message;

    public ResResult(Object data, int status, String message) {
        this.data = data;
        this.status = status;
        this.message = message;
    }
}
