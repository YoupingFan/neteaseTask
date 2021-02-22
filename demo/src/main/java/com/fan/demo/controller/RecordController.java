package com.fan.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.fan.demo.service.RecordService;
import com.fan.demo.utils.AuthToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RecordController {
    @Autowired
    private RecordService recordService;

    @AuthToken
    @GetMapping("/records")
    public JSONObject records() {
        return recordService.queryAllBuyRecord();
    }
}
