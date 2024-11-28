import { Box, Button, Typography } from "@mui/material";
import TutorlyLogoBlue from "src/assets/TutorlyLogoBlue.svg"

interface TutorTimeAvailabilityProps {
    setPage: (page: "primaryRegister" | "tutorTimeAvailability" | "tutorApplication") => void
}

const TutorTimeAvailabilityProps: React.FC<TutorTimeAvailabilityProps> = ({ setPage }) => {

    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
            <Box sx={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "primary.light" }} >
                <Box sx={{ width: "65%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="h1" color="primary.main">
                        <strong><strong>TUTOR TIME AVAILABILTY</strong></strong>
                    </Typography>
                    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>
                        <Button onClick={() => setPage("primaryRegister")} sx={{ margin: 1, color: "primary.main", backgroundColor: "primary.light" }} variant="contained">Go back</Button>
                        <Button /*onClick={ }*/ type="submit" sx={{ margin: 1, color: "primary.light" }} variant="contained" >Continue</Button>
                    </Box>

                </Box>
            </Box>
            <Box sx={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "primary.main" }} >
                <img src={TutorlyLogoBlue} style={{ width: "35%" }}></img>
                <Typography variant="h3" color="primary.light" width={"85%"}>
                    <br></br>
                    <strong>Becoming a student</strong>
                    <br></br><br></br>
                    A tutee can establish collaborations by creating a post, finding a tutor or requesting an administrator for help.
                    <br></br><br></br>
                    A tutor can view and accept posts to create collaborations.
                    <br></br><br></br>
                    Within a collaboration, meetings can be created.
                </Typography>
            </Box>
        </Box>
    );
};

export default TutorTimeAvailabilityProps;
