/*
 * package project.backend;
 * 
 * import org.springframework.boot.web.servlet.FilterRegistrationBean;
 * import org.springframework.context.annotation.Bean;
 * import org.springframework.context.annotation.Configuration;
 * import project.backend.utilities.JWTAuthenticationFilter;
 * 
 * @Configuration
 * public class FilterConfig {
 * 
 * @Bean
 * public FilterRegistrationBean<JWTAuthenticationFilter> jwtFilter() {
 * FilterRegistrationBean<JWTAuthenticationFilter> jwtBean = new
 * FilterRegistrationBean<>();
 * jwtBean.setFilter(new JWTAuthenticationFilter());
 * jwtBean.addUrlPatterns("/api/*");
 * jwtBean.setOrder(2); // Set order to determine execution sequence; higher
 * number = lower priority
 * return jwtBean;
 * }
 * }
 */