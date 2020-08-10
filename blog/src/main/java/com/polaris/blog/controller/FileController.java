package com.polaris.blog.controller;

import com.polaris.blog.Util.FileUtil;
import com.polaris.blog.common.ResResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/file")
public class FileController {

    @RequestMapping(value = "/upLoad")
    public ResResult fileUpload(HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<MultipartFile> files = ((MultipartHttpServletRequest)request).getFiles("file");
        if(files.isEmpty()){
            System.out.println("文件为空");
            return new ResResult(null,400,"上传文件为空");
        }
        String path="/home/www/polaris/file";
        System.out.println("...upload...");
        List<Map> list = new ArrayList<>();
        for (MultipartFile file:files){
            Map<String, Object> item;
            String fileName=file.getOriginalFilename();//获取文件名加后缀
            String fileF = fileName.substring(fileName.lastIndexOf("."), fileName.length());//文件后缀
            item = FileUtil.uploadFile(file,path,response);
            System.out.println(item);
            list.add(item);
        }
        System.out.println(list);
        System.out.println("...END...");
        return new ResResult(list,200,"文件上传成功");
    }

    @RequestMapping("/download")
    public String downLoad(HttpServletResponse response) throws UnsupportedEncodingException {
        //下载的文件路径
        String filePath = "E:/files/spring.md";
        //下载后的文件名
        String fileName = "测试文件下载.md";
        System.out.println("开始从" + filePath + "下载" + fileName);
        //使用流的形式下载文件
        try {
            //加载文件
            System.out.println("...loading...");
            File file = new File(filePath);
            InputStream is = new BufferedInputStream(new FileInputStream(file));
            byte[] buffer = new byte[is.available()];
            is.read(buffer);
            is.close();
            // 清空response
            System.out.println("清空返回数据");
            response.reset();
            // 设置response的Header
            System.out.println("设置返回参数");
            response.addHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes("UTF-8"), "ISO-8859-1"));
            response.addHeader("Content-Length", "" +file.length());
            OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
            response.setContentType("application/octet-stream");
            toClient.write(buffer);
            toClient.flush();
            toClient.close();
            return "文件下载成功";
        } catch (Exception e) {
            e.printStackTrace();
            return "文件下载出错";
        }
    }
}
