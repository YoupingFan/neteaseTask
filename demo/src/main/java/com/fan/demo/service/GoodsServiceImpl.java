package com.fan.demo.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fan.demo.dao.GoodsDao;
import com.fan.demo.domain.Goods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodsServiceImpl implements GoodsService{
    @Autowired
    private GoodsDao goodsDao;

    @Override
    public JSONObject queryAllGoodsInfo() {
        List<Goods> goodsList = goodsDao.selectAll();
        JSONArray jsonArray =(JSONArray) JSONObject.toJSON(goodsList);
        JSONObject msg = new JSONObject();
        msg.put("code", 200);
        msg.put("message", "success");
        msg.put("result", jsonArray);
        return msg;
    }

    @Override
    public JSONObject queryGoodsInfoById(int id) {
        Goods goods = goodsDao.selectById(id);
        JSONObject msg = new JSONObject();
        msg.put("code", 200);
        msg.put("message", "success");
        msg.put("result", JSONObject.toJSON(goods));
        return msg;
    }

    @Override
    public JSONObject addGoodsInfo(Goods goods) {
        JSONObject msg = new JSONObject();
        goodsDao.insert(goods);
        msg.put("code", 200);
        msg.put("message", "success");
        msg.put("result", null);
        return msg;
    }

    @Override
    public JSONObject deleteGoods(int id) {
        JSONObject msg = new JSONObject();
        goodsDao.delete(id);
        msg.put("code", 200);
        msg.put("message", "success");
        msg.put("result", null);
        return msg;
    }

    @Override
    public JSONObject updateGoods(Goods goods) {
        JSONObject msg = new JSONObject();
        goodsDao.updateInfo(goods);
        msg.put("code", 200);
        msg.put("message", "success");
        msg.put("result", null);
        return msg;
    }
}
