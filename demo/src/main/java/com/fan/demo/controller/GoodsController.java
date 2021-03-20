package com.fan.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.fan.demo.domain.Goods;
import com.fan.demo.service.GoodsService;
import com.fan.demo.utils.AuthToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class GoodsController {
    @Autowired
    private GoodsService goodsService;

    @GetMapping("/goods")
    public JSONObject goods(@RequestParam(defaultValue = "-1") int id) {
        if(id == -1) {
            return goodsService.queryAllGoodsInfo();
        } else {
            return goodsService.queryGoodsInfoById(id);
        }
    }

    @AuthToken
    @PostMapping("/publicSubmit")
    public JSONObject publicSubmit(Goods goods) {
        return goodsService.addGoodsInfo(goods);
    }

    @AuthToken
    @PostMapping("/delete")
    public JSONObject delete(@RequestParam int id) {
        return goodsService.deleteGoods(id);
    }

    @AuthToken
    @PostMapping("/edit")
    public JSONObject edit(Goods goods) {
        return goodsService.updateGoods(goods);
    }

}
