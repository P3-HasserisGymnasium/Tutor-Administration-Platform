//import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MiniCollab from "./MiniCollab";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { AuthContext } from "~/api/authentication/AuthContext";
import { useContext } from "react";
import { CollaborationType } from "~/types/entity_types";


export default  function ActiveCollaborations() {

    // get the logged-in user's ID
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is not available.");
    }
    const { userState } = authContext;    
    const loggedInUserId = userState.id;
    
    const { getCollaborations } = useCollaborationService();
    const { data: collaborations, isLoading, isError } = getCollaborations;

    // Filter collaborations for the logged-in user
    const userCollaborations = collaborations?.filter(
        (collab: CollaborationType) =>
            (collab.tutor_id === loggedInUserId || collab.tutee_id === loggedInUserId) &&
            collab.state === "Accepted" // Display only active collaborations
    );

    if (isLoading) return <p>Loading collaborations...</p>;
    if (isError) return <p>Error fetching collaborations</p>;



    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "start",
                padding: 2,
            }}
        >
            {userCollaborations?.map((collab) => (
                <MiniCollab
                subject={collab.subject}
                collaborator={
                    collab.tutor_id === loggedInUserId
                        ? "Your Tutee"
                        : "Your Tutor"
                }
                avatar={""}           />
            ))}
        </Box>
    );

};


