import { Box, Typography } from "@mui/material";
import SubjectChip from "./SubjectChip";
import { Subject } from "~/types/enums";
import { PostType } from "~/api/api-queries/post-queries";

type MiniPostProp = {
    postData: PostType
}


export default function MiniPost({postData}:MiniPostProp) {
    return(
        <Box
        sx={{
            backgroundColor: "rgba(251, 193, 135, 0.5)",
            border:"1px solid rgba(173, 92, 0, 1)",
            width: "200px",
            height: "150px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 1,
        }}>
            <Typography sx={{
                    fontSize: "15px",
                    fontWeight: "inter",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignSelf: "flex-center"
                }}>Need help with music exam in 2 weeks
            </Typography>

            <Box>
            <SubjectChip Subject={Subject.MATH} />
            
            <Typography
                sx={{
                    fontSize: "12px",
                    color: "#333", // Dark gray for text
                }}
            >
                {postData?.duration ? postData.duration : "No duration"}
            </Typography>
            </Box>
        </Box>
    );
}