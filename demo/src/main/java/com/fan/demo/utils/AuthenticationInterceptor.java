package com.fan.demo.utils;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Method;

@Component
public class AuthenticationInterceptor implements HandlerInterceptor {
    @Autowired
    private TokenUtils tokenUtils;

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest,
                             HttpServletResponse httpServletResponse,
                             Object object) {
        String token = httpServletRequest.getHeader("Authentication");
        if(!(object instanceof HandlerMethod)) {
            return true;
        }
        HandlerMethod handlerMethod=(HandlerMethod)object;
        Method method=handlerMethod.getMethod();
        if (method.isAnnotationPresent(AuthToken.class)){
            AuthToken authToken = method.getAnnotation(AuthToken.class);
            if (authToken.required()) {
                if (tokenUtils.validateToken(token)) {
                    return true;
                } else {
                    JSONObject msg = new JSONObject();
                    msg.put("code", 401);
                    msg.put("message", "failure");
                    msg.put("result", null);
                    httpServletResponse.setCharacterEncoding("utf-8");
                    httpServletResponse.setContentType("application/json;charset=utf-8");
                    try {
                        httpServletResponse.getWriter().append(msg.toJSONString());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return false;
                }

            }
        }
        return true;
    }
}
