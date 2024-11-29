import { Box, Button, TextField, Typography } from "@mui/material";
import TutorlyLogoBlue from "src/assets/TutorlyLogoBlue.svg"
import TutorlyIconWhite from "src/assets/TutorlyIconWhite.svg"
import { useNavigate } from "react-router-dom";

export default function StartPage() {
    const navigate = useNavigate();

    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
            <Box sx={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "primary.light" }} >
                <img src={TutorlyIconWhite} style={{ width: "25%" }}></img>
                <Typography variant="h1" color="primary.main">
                    <strong><strong>Sign in</strong></strong>
                </Typography>
                <TextField id="outlined-basic" label="Enter email" variant="outlined" sx={{ marginTop: 8 }} />
                <TextField id="outlined-basic" label="Enter password" variant="outlined" sx={{ marginTop: 1 }} />
                <Box sx={{ flexDirection: "row", marginTop: 2 }}>
                    <Button sx={{ margin: 1, color: "primary.light" }} variant="contained" >Log in</Button>
                    <Button onClick={() => navigate("/register")} sx={{ margin: 1, color: "primary.light" }} variant="contained">Register</Button>
                </Box>
            </Box>
            <Box sx={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "primary.main" }} >
                <img src={TutorlyLogoBlue} style={{ width: "35%" }}></img>
                <Typography variant="h3" color="primary.light" width={"85%"}>
                    <br></br>
                    <strong>Features:</strong>
                    <br></br>
                    <ul>
                        <li>Become a tutor or tutee</li>
                        <li>Create collaborations</li>
                        <li>Receive and offer help to other students</li>
                    </ul>
                    <br></br>
                    Have fun!
                </Typography>
            </Box>
        </Box>
    );
};
