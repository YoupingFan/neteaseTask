package com.fan.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.fan.demo.domain.BuyRecord;
import com.fan.demo.service.RecordService;
import com.fan.demo.utils.AuthToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @AuthToken
    @PostMapping("/buy")
    public JSONObject buy(@RequestBody List<BuyRecord> buyRecords){
        return recordService.addBuyRecord(buyRecords);
    }
}
