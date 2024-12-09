package project.backend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import project.backend.utilities.JWTAuthenticationFilter;
import project.backend.service.RoleService;


@Configuration
public class FilterConfig {

    @Autowired
    private RoleService roleService; 

    @Bean
    public FilterRegistrationBean<JWTAuthenticationFilter> jwtFilter() {
        FilterRegistrationBean<JWTAuthenticationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new JWTAuthenticationFilter( roleService ));
        registrationBean.addUrlPatterns("/*"); // Apply to all URLs
        registrationBean.setOrder(1); // Set filter order (if multiple filters exist)
        return registrationBean;
    }
}
