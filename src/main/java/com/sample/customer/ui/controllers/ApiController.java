package com.sample.customer.ui.controllers;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class ApiController {
	private static final String CLS_UI_REST_API_EXCEPTION_MESSAGE = "An exception occurred calling the CLS UI REST API.";

	protected static final String API_PREFIX = "/api/";
	protected static final Integer API_PREFIX_LENGTH = API_PREFIX.length();

	private static final String TARGET_ENVIRONMENT_URL_REQUEST_HEADER = "X-Target-Environment-Url";

	private final Logger logger = LogManager.getLogger(this.getClass());

	private URI restApiURI;

	private RestTemplate apiRestTemplate;

	private ObjectMapper objectMapper = new ObjectMapper();

	@Autowired
	public void setRestApiURI(URI restApiURI) {
		this.restApiURI = restApiURI;
	}

	@Autowired
	public void setApiRestTemplate(RestTemplate apiRestTemplate) {
		this.apiRestTemplate = apiRestTemplate;
	}

	@RequestMapping("/api/**")
	public @ResponseBody ResponseEntity<Object> proxyApi(@RequestBody(required = false) Object body, HttpMethod method, HttpServletRequest request) {
		
		System.setProperty("proxyHost", "internet.proxy.fedex.com");
		System.setProperty("proxyPort", "3128");
		
		Object augmentedBody = body;
		String augmentedQueryString = request.getQueryString();
		try {
			if (HttpMethod.DELETE.equals(method)) {
				augmentedQueryString = addUserIdToQueryString(augmentedQueryString);
			} else if (isAuditableMethod(method)) {
				augmentedBody = addAuditCriteriaToBody(body);
			}
			String url = generateUrl(request, augmentedQueryString);
			return apiRestTemplate.exchange(URI.create(url), method, new HttpEntity<>(augmentedBody), Object.class);
		} catch (HttpStatusCodeException e) {
			logger.error(CLS_UI_REST_API_EXCEPTION_MESSAGE, e);

			Object errorObject = getErrorObject(e);
			return new ResponseEntity<>(errorObject, e.getStatusCode());
		} catch (Exception e) {
			logger.error(CLS_UI_REST_API_EXCEPTION_MESSAGE, e);

			Object response = e.getMessage().getBytes();
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private static String addUserIdToQueryString(String augmentedQueryString) {
		String username = "cfuser";

		if (StringUtils.isBlank(augmentedQueryString)) {
			return createUserIdQueryParameter(username);
		}
		return augmentedQueryString + "&" + createUserIdQueryParameter(username);
	}

	private static String createUserIdQueryParameter(String username) {
		return "userId=" + getUserName(username);
	}

	private static String getUserName(String username) {
		if (StringUtils.isBlank(username)) {
			return "";
		}
		return username;
	}

	@SuppressWarnings("unchecked")
	private static Object addAuditCriteriaToBody(Object body) {
		Object augmentedBody = body;

		String username = "cfuser";
		
		if (augmentedBody instanceof Map) {
			Map<String, String> auditCriteria = new HashMap<>();
			auditCriteria.put("userId", username);

			((Map<String, Map<String, String>>) augmentedBody).put("auditCriteria", auditCriteria);
		}
		
		return augmentedBody;
	}

	private static boolean isAuditableMethod(HttpMethod method) {
		if (method == null || HttpMethod.GET.equals(method)) {
			return false;
		}
		return true;
	}

	private String generateUrl(HttpServletRequest request, String queryString) {
		String url = determineBaseUrl(request);
		String servletPath = request.getServletPath();

		return url + resolveContextPath(servletPath) + generateQueryStringIfNecessary(queryString);
	}

	private String determineBaseUrl(HttpServletRequest request) {
		String targetEnvironmentUrl = request.getHeader(TARGET_ENVIRONMENT_URL_REQUEST_HEADER);
		if (StringUtils.isNotBlank(targetEnvironmentUrl)) {
			return addTrailingSlashIfNecessary(targetEnvironmentUrl);
		}
		return addTrailingSlashIfNecessary(restApiURI.toString());
	}

	private static String addTrailingSlashIfNecessary(String baseUrl) {
		if (StringUtils.endsWith(baseUrl, "/")) {
			return baseUrl;
		}
		return baseUrl + "/";
	}

	private static String generateQueryStringIfNecessary(String queryString) {
		return StringUtils.isBlank(queryString) ? "" : "?" + queryString;
	}

	protected String resolveContextPath(String servletPath) {
		return servletPath.substring(servletPath.lastIndexOf(API_PREFIX) + API_PREFIX_LENGTH);
	}

	protected Object getErrorObject(HttpStatusCodeException httpStatusCodeException) {
		try {
			return objectMapper.readValue(httpStatusCodeException.getResponseBodyAsByteArray(), Object.class);
		} catch (Exception e) {
			return httpStatusCodeException.getResponseBodyAsByteArray();
		}
	}
}
