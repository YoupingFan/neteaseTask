package com.fan.demo.dao;

import com.fan.demo.domain.BuyRecord;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RecordDao {
    public List<BuyRecord> selectAll();
}
