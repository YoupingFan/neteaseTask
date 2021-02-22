package com.fan.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.fan.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public JSONObject login(String userName, String password) {
        return userService.validateLogin(userName, password);
    }

    @PostMapping("/validateToken")
    public JSONObject validateToken(String token) {
        return userService.validateToken(token);
    }
}
