package project.backend.utilities;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import com.fasterxml.jackson.databind.ObjectMapper;

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
import project.backend.controller_bodies.account_controller.AccountLoginSuccessBody;
import project.backend.model.Administrator;
import project.backend.model.Student;
import project.backend.model.Tutee;
import project.backend.model.Tutor;
import project.backend.service.RoleService;
import static project.backend.utilities.JWTUtil.validateToken;

public class JWTAuthenticationFilter implements Filter {

    final RoleService roleService;

    public JWTAuthenticationFilter(RoleService roleService) {
        this.roleService = roleService;
    }

    private boolean isPublicRoute(String path, String method) {
        // Match specific routes and methods
        return (path.equals("/api/account/login") && "POST".equalsIgnoreCase(method)) ||
                (path.equals("/api/account/") && "POST".equalsIgnoreCase(method)) ||
                (path.equals("/api/demo/setup") && "POST".equalsIgnoreCase(method)) ||
                (path.equals("/api/demo/clean") && "POST".equalsIgnoreCase(method));
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
                        String rawValue = java.net.URLDecoder.decode(cookie.getValue(), StandardCharsets.UTF_8);

                        try {
                            // Use Jackson's ObjectMapper to parse the cookie value
                            ObjectMapper objectMapper = new ObjectMapper();
                            AccountLoginSuccessBody userState = objectMapper.readValue(rawValue,
                                    AccountLoginSuccessBody.class);
                            userID = String.valueOf(userState.id); // Assuming userState has a field `id`
                        } catch (Exception e) {
                        }
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

        if (validateToken(jwt, userID)) {

            AuthenticatedUserBody authenticatedUser = new AuthenticatedUserBody();
            if (userID == null) {
                httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization cookie missing or invalid");
                return;
            }
            Long userIdLong = Long.parseLong(userID);
            authenticatedUser.userId = userIdLong;
            Student student = roleService.getStudentById(userIdLong);

            Administrator administrator = roleService.getAdministratorByUserId(userIdLong);
            if (administrator != null) {
                authenticatedUser.administratorId = administrator.getId();
                request.setAttribute("authenticatedUser", authenticatedUser);
                chain.doFilter(request, response);
                return;
            }

            if (student != null) {
                authenticatedUser.studentId = student.getId();
                Tutor tutor = student.getTutor();
                if (tutor != null) {
                    authenticatedUser.tutorId = tutor.getId();
                }
                Tutee tutee = student.getTutee();
                if (tutee != null) {
                    authenticatedUser.tuteeId = tutee.getId();
                }
            }

            request.setAttribute("authenticatedUser", authenticatedUser);
            chain.doFilter(request, response);
        } else {
            httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
        }

    }

    @Override
    public void destroy() {
    }
}
