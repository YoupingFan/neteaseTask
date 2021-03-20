package com.fan.demo.service;

import com.alibaba.fastjson.JSONObject;
import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
    JSONObject saveFile(MultipartFile file);
}
