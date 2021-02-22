package com.fan.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.fan.demo.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GoodsController {
    @Autowired
    private GoodsService goodsService;

    @GetMapping("goods")
    public JSONObject goods(@RequestParam(defaultValue = "-1") int id) {
        if(id == -1) {
            return goodsService.queryAllGoodsInfo();
        } else {
            return goodsService.queryGoodsInfoById(id);
        }
    }
}
