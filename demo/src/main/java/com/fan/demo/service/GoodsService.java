package com.fan.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.fan.demo.domain.Goods;

public interface GoodsService {
    public JSONObject queryAllGoodsInfo();
    public JSONObject queryGoodsInfoById(int id);
    public JSONObject addGoodsInfo(Goods goods);
    public JSONObject deleteGoods(int id);
    public JSONObject updateGoods(Goods goods);
}
