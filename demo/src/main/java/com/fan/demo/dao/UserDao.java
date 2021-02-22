package com.fan.demo.dao;

import com.fan.demo.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao {

    public User selectByName(String username);

}
