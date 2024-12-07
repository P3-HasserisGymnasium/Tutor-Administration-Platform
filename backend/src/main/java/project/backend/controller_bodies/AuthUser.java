package project.backend.controller_bodies;

import jakarta.servlet.http.HttpServletRequest;

public class AuthUser {
    
    public static AuthenticatedUserBody getAuthenticatedUser(HttpServletRequest request) {
            return (AuthenticatedUserBody) request.getAttribute("authenticatedUser");
        }

}
