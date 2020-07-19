package com.example.polaris.common;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Response {
    private String data;
    private int resultCode;
    private String resultMsg;

    public String getData() {
        return data;
    }

    public void setData(String data) {
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

    @Override
    public String toString() {
        return "{" +
                "data='" + data + '\'' +
                ", resultCode=" + resultCode +
                ", resultMsg='" + resultMsg + '\'' +
                '}';
    }
}
