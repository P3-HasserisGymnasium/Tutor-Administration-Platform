package project.backend.utilities;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(withDefaults()) // Enable CORS
            .csrf(csrf -> csrf.disable()) // Disable CSRF for testing purposes (optional)
            .authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll()); // Allow all requests for now
        return http.build();
    }
}
