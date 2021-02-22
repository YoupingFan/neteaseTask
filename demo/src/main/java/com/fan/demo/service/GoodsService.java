package com.fan.demo.service;

import com.alibaba.fastjson.JSONObject;

public interface GoodsService {
    public JSONObject queryAllGoodsInfo();
    public JSONObject queryGoodsInfoById(int id);
}
