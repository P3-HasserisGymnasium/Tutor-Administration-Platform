package project.backend;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import project.backend.utilities.JWTAuthenticationFilter;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<JWTAuthenticationFilter> jwtFilter() {
        FilterRegistrationBean<JWTAuthenticationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new JWTAuthenticationFilter());
        registrationBean.addUrlPatterns("/api/*");
        return registrationBean;
    }
}
