package com.fan.demo.service;

import com.alibaba.fastjson.JSONObject;

public interface UserService {
    public JSONObject validateLogin(String username, String password);
    public JSONObject validateToken(String token);
}
