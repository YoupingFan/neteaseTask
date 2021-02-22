package com.fan.demo;


import com.alibaba.fastjson.JSONObject;
import com.fan.demo.dao.RecordDao;
import com.fan.demo.domain.BuyRecord;
import com.fan.demo.service.GoodsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class DemoApplicationTests {
	@Autowired
	GoodsService service;
	@Test
	void contextLoads() {
		JSONObject jsonObject = service.queryGoodsInfoById(1);
		System.out.println();

	}

}
