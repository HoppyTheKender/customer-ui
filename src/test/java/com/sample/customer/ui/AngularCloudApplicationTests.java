package com.sample.customer.ui;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AngularCloudApplicationTests {
	@Test
	public void contextLoads() {
		// Intentionally left blank
	}

	@Autowired
	public RestTemplate apiRestTemplate;

	@Test
	public void restTemplate_canCallCFRestService_validCall() {
		Object augmentedBody = null;
		
		System.setProperty("proxyHost", "internet.proxy.fedex.com");
		System.setProperty("proxyPort", "3128");

		apiRestTemplate.exchange("http://customer-api.cfapps.io/customer", HttpMethod.GET, new HttpEntity<>(augmentedBody), Object.class);
	}

}
