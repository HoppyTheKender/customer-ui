package com.sample.customer.ui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@SpringBootApplication
public class AngularCloudApplication {

	public static void main(String[] args) {
		SpringApplication.run(AngularCloudApplication.class, args);
	}	
	
	@Controller
	class MainController {
		
		@RequestMapping(value="/", method = RequestMethod.GET)
		public String homepage() {
			return "index";
		}
	}
	
}
