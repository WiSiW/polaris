package com.polaris.blog.Util;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class FileUtil {
    public static Map uploadFile(MultipartFile file, String path, HttpServletResponse response) {
        Map<String,Object> params = new HashMap<>();
        String fileName = file.getOriginalFilename();
        String fileF = fileName.substring(fileName.lastIndexOf("."), fileName.length());//文件后缀
        fileName=new Date().getTime()+"_"+new Random().nextInt(1000)+fileF;//新的文件名
        int size = (int) file.getSize();
        System.out.println(fileName + "-->" + size);
        File dest = new File(path + "/" + fileName);
        System.out.println(dest);
        if(!dest.getParentFile().exists()) dest.getParentFile().mkdir();
        try {
            file.transferTo(dest);
            params.put("url",path + "/" + fileName);
            params.put("code",200);
        }catch (IllegalStateException e){
            e.printStackTrace();
            params.put("code",400);
        }catch (IOException e) {
            e.printStackTrace();
            params.put("code",400);
        }finally {
            return params;
        }
//        response.setCharacterEncoding("UTF-8");
//        response.addHeader("fileName",fileName);
//        response.setHeader("fileName",fileName);
    }
}
