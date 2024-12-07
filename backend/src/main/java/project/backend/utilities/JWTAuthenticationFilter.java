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
import project.backend.controller_bodies.AuthenticatedUserBody;
import project.backend.service.RoleService;

import java.io.IOException;

import static project.backend.utilities.JWTUtil.validateToken;

public class JWTAuthenticationFilter implements Filter {

    final RoleService roleService;

    public JWTAuthenticationFilter( RoleService roleService) {
        this.roleService = roleService;
    }

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
                    case "user":
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

                AuthenticatedUserBody authenticatedUser = new AuthenticatedUserBody();
                authenticatedUser.userId = Long.parseLong(userID);
                authenticatedUser.tutorId = roleService.getTutorByUserId(authenticatedUser.userId).getId();
                authenticatedUser.tuteeId = roleService.getTuteeByUserId(authenticatedUser.userId).getId();
                authenticatedUser.studentId = roleService.getStudentById(authenticatedUser.userId).getId();
                authenticatedUser.administratorId = roleService.getAdministratorByUserId(authenticatedUser.userId).getId();

                request.setAttribute("authenticatedUser", authenticatedUser);
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
