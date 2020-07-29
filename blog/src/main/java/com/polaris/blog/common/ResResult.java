package com.polaris.blog.common;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ResResult {
    private Object data;
    private int resultCode;
    private String resultMsg;

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public int getResultCode() {
        return resultCode;
    }

    public void setResultCode(int resultCode) {
        this.resultCode = resultCode;
    }

    public String getResultMsg() {
        return resultMsg;
    }

    public void setResultMsg(String resultMsg) {
        this.resultMsg = resultMsg;
    }
}
