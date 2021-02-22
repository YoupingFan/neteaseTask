package com.fan.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.fan.demo.dao.UserDao;
import com.fan.demo.domain.User;
import com.fan.demo.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.concurrent.TimeUnit;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private StringRedisTemplate redisTemplate;
    @Autowired
    private TokenUtils tokenUtils;

    @Override
    public JSONObject validateLogin(String username, String password) {
        User user = userDao.selectByName(username);
        JSONObject msg = new JSONObject();
        if(user!=null && DigestUtils.md5DigestAsHex(user.getPassword().getBytes()).equals(password)) {
            String token = tokenUtils.getToken(user);
            redisTemplate.opsForValue().set(
                    user.getUsername(), token,
                    60*10, TimeUnit.SECONDS);

            msg.put("code", 200);
            msg.put("message", "success");
            JSONObject result = new JSONObject();
            result.put("username", username);
            result.put("token", token);
            result.put("role", user.getRole());
            msg.put("result", result);

        } else {
            msg.put("code", 401);
            msg.put("message", "用户名密码错误");
            msg.put("result", null);
        }
        return msg;
    }

    @Override
    public JSONObject validateToken(String token) {
        JSONObject msg = new JSONObject();
        if(tokenUtils.validateToken(token)) {
            msg.put("code", 200);
            msg.put("message", "success");
            msg.put("result", null);
            return msg;
        } else {
            msg.put("code", 401);
            msg.put("message", "failure");
            msg.put("result", null);
            return msg;
        }

    }
}
