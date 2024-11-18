package project.backend.utilities;

import io.jsonwebtoken.Claims;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

import static project.backend.utilities.JWTUtil.extractClaims;
import static project.backend.utilities.JWTUtil.isTokenExpired;

public class JWTAuthenticationFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization logic if needed
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Retrieve JWT from cookies
        String jwt = null;
        Cookie[] cookies = httpRequest.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("JWT".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        // If JWT is found, validate it
        if (jwt != null) {
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
            httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization cookie missing or invalid");
            return;
        }

        // Continue processing the request
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // Cleanup logic if needed
    }
}
