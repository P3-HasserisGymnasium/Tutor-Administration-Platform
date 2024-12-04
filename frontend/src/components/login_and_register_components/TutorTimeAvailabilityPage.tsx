import { Box, Button, TextField, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import TutorlyLogoBlue from "src/assets/TutorlyLogoBlue.svg"
import { useFormContext, useWatch } from "react-hook-form";
import { AccountRegisterType } from "~/types/entity_types";
import SetSubject from "../content_components/SetSubject";
import SetTimeAvailability from "../content_components/SetTimeAvailability";

interface TutorTimeAvailabilityProps {
    setPage: (page: "primaryRegister" | "tutorTimeAvailability" | "tutorApplication") => void
}

const TutorTimeAvailabilityPage: React.FC<TutorTimeAvailabilityProps> = ({ setPage }) => {
    const theme = useTheme<Theme>();
    const formMethods = useFormContext<AccountRegisterType>();
    const { register, control } = formMethods;


    const keepWatch = useWatch({
        control,
    });

    console.log(keepWatch);

    const isMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isLg = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const getMaxRows = () => {
        if (isMd) {
            return 8;
        } else if (isLg) {
            return 14;
        } else {
            return 20;
        }
    };





    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
            <Box sx={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: theme.customColors.postBackGroundColor }} >
                <Box sx={{ width: "65%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>




                    <Box sx={{ display: "flex", flexDirection: "column", height: "95%", padding: "1em" }}>
                        <Typography variant="h2" sx={{ marginBottom: "1em" }}>Your application</Typography>

                        <Box sx={{ display: "flex", flexDirection: "row", border: "1px solid" + "black", borderRadius: "0.5em" }}>
                            <Box sx={{ display: "flex", flexDirection: "column", width: "50%", gap: "1em", paddingRight: "1em" }}>
                                <Typography variant="h4">Subjects</Typography>
                                <SetSubject />

                                <SetTimeAvailability />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "50%", paddingLeft: "1em" }}>
                                <Typography variant="h3">Write your application below:</Typography>
                                <Box sx={{
                                    display: "flex",
                                    flexGrow: 1, // Allows this box to expand to match the height of the left column
                                    width: "100%",
                                }}>
                                    <TextField
                                        multiline
                                        fullWidth
                                        maxRows={getMaxRows()}
                                        {...register("tutorProfileDescription")}
                                        slotProps={{
                                            input: {
                                                style: {
                                                    height: "100%", // Matches the textarea's height to its container
                                                    overflow: "auto", // Allows internal scrolling
                                                    alignItems: "flex-start", // Aligns text to the top
                                                },
                                            },
                                        }}
                                        sx={{
                                            marginTop: "1em",
                                            backgroundColor: "#f9f9f9",
                                            borderRadius: "4px",
                                            overflowY: 'auto',
                                        }} />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}></Box>
                    </Box>




                    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>
                        <Button onClick={() => setPage("primaryRegister")} sx={{ margin: 1, backgroundColor: theme.customColors.headingTextColor }} variant="contained">Go back</Button>
                        <Button /*onClick={ }*/ type="submit" sx={{ margin: 1 }} variant="contained" >Continue</Button>
                    </Box>

                </Box>
            </Box>
            <Box sx={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "primary.main" }} >
                <img src={TutorlyLogoBlue} style={{ width: "35%" }}></img>
                <Typography variant="h3" width={"85%"}>
                    <br></br>
                    When you send your application, an administrator will review it.
                    <br></br>
                    <br></br>
                    Once accepted, you can access Tutorly as a tutor.
                </Typography>
            </Box>
        </Box>
    );
};

export default TutorTimeAvailabilityPage;
