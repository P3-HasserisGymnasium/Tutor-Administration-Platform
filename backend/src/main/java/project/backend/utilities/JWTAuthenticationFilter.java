package project.backend.utilities;

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

import static project.backend.utilities.JWTUtil.validateToken;

public class JWTAuthenticationFilter implements Filter {

    private boolean isPublicRoute(String path, String method) {
        // Match specific routes and methods
        return (path.equals("/api/account/login") && "POST".equalsIgnoreCase(method)) || 
               (path.equals("/api/account/") && "POST".equalsIgnoreCase(method));     
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String requestPath = httpRequest.getRequestURI();
        String requestMethod = httpRequest.getMethod();

        if (isPublicRoute(requestPath, requestMethod)) {
            chain.doFilter(request, response);
            return;
        }

        String jwt = null;
        String userID = null;
        Cookie[] cookies = httpRequest.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                switch (cookie.getName()) {
                    case "Bearer":
                        jwt = cookie.getValue();
                        break;
                    case "userState":
                        userID = cookie.getValue();
                        break;
                }
                if (jwt != null && userID != null) {
                    break;
                }
            }
        }

        if (jwt == null) {
            httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization cookie missing or invalid");
            return;
        }

        try {
            if (validateToken(jwt, userID)) {
                chain.doFilter(request, response);
                return;
            }
        } catch (Exception e) {
            httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token expired or invalid");
            return;
        }

    }

    @Override
    public void destroy() {
    }
}
