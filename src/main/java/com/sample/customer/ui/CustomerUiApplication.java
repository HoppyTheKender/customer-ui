package com.sample.customer.ui;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.resource.ResourceUrlEncodingFilter;

@SpringBootApplication
public class CustomerUiApplication {
	
	@Value("${rest.api.url}")
	private String restApiUrl;

	public static void main(String[] args) {
		SpringApplication.run(CustomerUiApplication.class, args);
	}	
	
	@Controller
	class MainController {
		@RequestMapping(value={"/application/**","/styleguide/**"}, method = RequestMethod.GET)
		public String homepage() {
			return "index";
		}
	}
	
	@Bean
	public MappingJackson2HttpMessageConverter jacksonMessageConverter() {
		return new MappingJackson2HttpMessageConverter();
	}

	@Bean
	public ResourceUrlEncodingFilter resourceUrlEncodingFilter() {
		return new ResourceUrlEncodingFilter();
	}
	
	@Bean
	public URI restApiURI() throws URISyntaxException {
		return new URI(restApiUrl);
	}

	@Bean
	public RestTemplate apiRestTemplate() {
		HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
		
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.setRequestFactory(requestFactory);

		return restTemplate;
	}
}
