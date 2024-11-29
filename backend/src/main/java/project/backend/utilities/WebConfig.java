package project.backend.utilities;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/*") // Match your API endpoints
                .allowedOrigins("http://localhost:3000") // Allow specific frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                .allowedHeaders("Authorization", "Content-Type", "X-Requested-With") // Allowed headers
                .allowCredentials(true) // Allow cookies or authorization headers
                .maxAge(3600); // Cache preflight response for 1 hour
    }
}
