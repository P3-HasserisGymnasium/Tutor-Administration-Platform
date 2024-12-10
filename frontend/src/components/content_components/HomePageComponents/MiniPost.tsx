import { Box, Typography } from "@mui/material";
import SubjectChip from "../SubjectChip";
//import { Subject } from "~/types/data_types";
import { PostType } from "~/types/entity_types";

type MiniPostProp = {
  postData: PostType;
};

export default function MiniPost({ postData }: MiniPostProp) {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(251, 193, 135, 0.5)",
        border: "1px solid rgba(173, 92, 0, 1)",
        width: "200px",
        height: "150px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: "15px",
          fontWeight: "inter",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignSelf: "flex-center",
        }}
      >
        {postData.title || "No Title"}
      </Typography>

      <Box>
        <SubjectChip Subject={postData.subject}  />

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