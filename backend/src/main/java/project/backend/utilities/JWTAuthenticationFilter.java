package project.backend.utilities;

import io.jsonwebtoken.Claims;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;

import static project.backend.utilities.JWTUtil.extractClaims;
import static project.backend.utilities.JWTUtil.isTokenExpired;
// import project.backend.service.UserService; // Import the UserService class to fetch the user information

public class JWTAuthenticationFilter implements Filter {


    // private UserService userService; // Inject the UserService class to fetch the user information

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization logic if needed
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String authorizationHeader = httpRequest.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            Claims claims = extractClaims(jwt);

            if (claims != null && !isTokenExpired(jwt)) {
                // Set the user information in the request attribute
                // String user_id = claims.getSubject();
                // Fetch the user information
                // userService.getUserById(user_id).ifPresent(user -> httpRequest.setAttribute("user", user));
                // Can now be used via controllers like so: 
                    // @RestController
                /*  @GetMapping("/api/user")
                    public String getUserInfo(@RequestAttribute("user") User user) {
                        // Access the user object that was set in the JWT filter
                        return "User Info: " + user.toString();
                    } */

            } else {
                httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
                return;
            }
        } else {
            httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization header missing or invalid");
            return;
        }

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // Cleanup logic if needed
    }
}