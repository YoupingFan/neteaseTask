package com.fan.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.fan.demo.domain.BuyRecord;

import java.util.List;

public interface RecordService {
    public JSONObject queryAllBuyRecord();
    JSONObject addBuyRecord(List<BuyRecord> buyRecords);
}
