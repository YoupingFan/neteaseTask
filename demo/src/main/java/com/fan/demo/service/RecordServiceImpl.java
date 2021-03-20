package com.fan.demo.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fan.demo.dao.GoodsDao;
import com.fan.demo.dao.RecordDao;
import com.fan.demo.domain.BuyRecord;
import com.fan.demo.domain.Goods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordServiceImpl implements RecordService{
    @Autowired
    private RecordDao recordDao;

    @Autowired
    private GoodsDao goodsDao;

    @Override
    public JSONObject queryAllBuyRecord() {
        List<BuyRecord> recordList = recordDao.selectAll();
        JSONArray jsonArray =(JSONArray) JSONObject.toJSON(recordList);
        JSONObject msg = new JSONObject();
        msg.put("code", 200);
        msg.put("message", "success");
        msg.put("result", jsonArray);
        return msg;
    }

    @Override
    public JSONObject addBuyRecord(List<BuyRecord> buyRecords) {
        recordDao.insertAll(buyRecords);
        for (BuyRecord buyRecord : buyRecords ) {
            Goods goods = goodsDao.selectById(buyRecord.getGoods_id());
            goodsDao.updateNum(goods.getId(), goods.getSell_num()+buyRecord.getBuy_num());
        }
        JSONObject msg = new JSONObject();
        msg.put("code", 200);
        msg.put("message", "success");
        msg.put("result", null);
        return msg;
    }
}
