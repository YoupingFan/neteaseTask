package com.fan.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;


@RestController
public class PageController {

	@Autowired
	HttpServletResponse response;

	@GetMapping("/login")
	public ModelAndView login() {
		return new ModelAndView("/login.html");
	}

	@GetMapping("/show")
	public ModelAndView show(@RequestParam(defaultValue = "-1") int id) {
		return new ModelAndView("/show.html");
	}
}
