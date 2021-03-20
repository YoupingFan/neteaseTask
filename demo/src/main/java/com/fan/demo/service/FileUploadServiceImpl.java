package com.fan.demo.service;

import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileUploadServiceImpl implements FileUploadService{

    @Override
    public JSONObject saveFile(MultipartFile file) {
        JSONObject msg = new JSONObject();
        if (file == null) {
            msg.put("code", "400");
            msg.put("message", "failed");
            msg.put("result", null);
        }
        String suffix = file.getContentType().toLowerCase();
        suffix = suffix.substring(suffix.lastIndexOf("/")+1);
        String fileName = UUID.randomUUID().toString().replaceAll("-", "") + "." + suffix;
        String path = null;
        try {
            path = ResourceUtils.getURL("static").getPath();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        File targetFile = new File(path +"/images", fileName);
        if(!targetFile.getParentFile().exists()) {
            targetFile.getParentFile().mkdirs();
        }
        try {
            file.transferTo(targetFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
        msg.put("code", 200);
        msg.put("message", "success");
        msg.put("result", "/images/"+fileName);
        return msg;
    }
}
