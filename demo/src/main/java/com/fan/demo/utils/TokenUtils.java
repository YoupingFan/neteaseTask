package com.fan.demo.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.fan.demo.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
public class TokenUtils {
    @Autowired
    private StringRedisTemplate redisTemplate;
    public String getToken(User user) {
        String token = JWT.create()
                .withAudience(user.getUsername())
                .withAudience(user.getRole())
                .withIssuedAt(new Date())
                .sign(Algorithm.HMAC256(user.getPassword()));
        return token;
    }
    public boolean validateToken(String token) {
        if(token==null) {
            return false;
        }

        String username = "";
        try {
            username = JWT.decode(token).getAudience().get(0);
        } catch (JWTDecodeException j) {
            return false;
        }
        String tokenRedis = redisTemplate.opsForValue().get(username);
        if(tokenRedis!=null && token.equals(tokenRedis)) {
            redisTemplate.opsForValue().set(username, tokenRedis, 60*10, TimeUnit.SECONDS);
            return true;
        }
        return false;
    }
}
