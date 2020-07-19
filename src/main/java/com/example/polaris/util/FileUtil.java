package com.example.polaris.util;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;

public class FileUtil {
    public static String uploadFile(MultipartFile file, String path, HttpServletResponse response) {
        String fileName = file.getOriginalFilename();
        int size = (int) file.getSize();
        System.out.println(fileName + "-->" + size);
        File dest = new File(path + "/" + fileName);
        if(!dest.getParentFile().exists())dest.getParentFile().mkdir();
        try {
            file.transferTo(dest);
        }catch (IllegalStateException e){
            e.printStackTrace();
            return "文件上传失败";
        }catch (IOException e) {
            e.printStackTrace();
            return "文件上传失败";
        }
        response.setCharacterEncoding("UTF-8");
//        response.addHeader("fileName",fileName);
//        response.setHeader("fileName",fileName);
        return "文件保存成功";
    }
}
