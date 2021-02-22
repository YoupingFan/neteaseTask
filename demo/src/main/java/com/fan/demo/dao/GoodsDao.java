package com.fan.demo.dao;

import com.fan.demo.domain.Goods;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GoodsDao {
    public List<Goods> selectAll();
    public Goods selectById(int id);
}
