package com.example.polaris.controller.file;

import com.example.polaris.util.FileUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import sun.net.www.http.HttpClient;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@Controller
public class FileController {

    @RequestMapping(value = "/fileUpload",method = RequestMethod.POST)
    public String fileUpload(HttpServletRequest request,HttpServletResponse response) throws IOException {
        List<MultipartFile> files = ((MultipartHttpServletRequest)request).getFiles("file");
        System.out.println("...upLoad...");
        if(files.isEmpty()){
            System.out.println("文件为空");
            return "上传文件为空";
        }
        String path="E:/file";
        System.out.println("...upload...");
        for (MultipartFile file:files){
            FileUtil.uploadFile(file,path,response);
        }
        PrintWriter pw = response.getWriter();
        pw.write("1111");
        response.setStatus(401);
        System.out.println("...END...");
        return "文件上传成功";
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
