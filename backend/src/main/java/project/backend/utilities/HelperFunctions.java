package project.backend.utilities;

import project.backend.controller_bodies.AuthenticatedUserBody;

import org.springframework.stereotype.Component;

@Component
public class HelperFunctions {

    public Boolean isUserPermitted(AuthenticatedUserBody authUser, Long userId) {
        if (authUser.getTutorId() != userId && authUser.getTuteeId() != userId && !authUser.isAdministrator()) {
            return false;
        }
        return true;
    }

    
}
