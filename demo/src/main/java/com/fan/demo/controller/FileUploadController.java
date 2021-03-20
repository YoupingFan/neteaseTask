package com.fan.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.fan.demo.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class FileUploadController {
    @Autowired
    FileUploadService fileUploadService;

    @PostMapping("upload")
    public JSONObject upload(@RequestParam("file") MultipartFile upLoadFile) {
        return fileUploadService.saveFile(upLoadFile);
    }
}
