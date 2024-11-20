import "./App.css";
import { Routes } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import HeadText from "./components/layout_components/HeadText";
import { generateHeadingFromLocation } from "./utilities/helperFunctions";

export default function App() {
  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <Box
        sx={{
          height: "10%",
          width: "100%",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          backgroundColor: "secondary.main",
        }}
      >
        <HeadText DisplayText={generateHeadingFromLocation()} />
        <Box
          sx={{
            margin: 1,
            width: "calc(20% - 16px)",
            height: "calc(100% - 16px)",
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          <Typography variant="h3"> ICON </Typography>
        </Box>
      </Box>
      <Box sx={{ height: "90%", width: "100%" }}>
        <Routes>
          {/*  <Route path="/" element={<HomePage />} />
          <Route path="/tutee" element={<TuteePage />} />
          <Route path="/tutor" element={<TutorPage />} />
          <Route path="/tutee/create_post" element={<CreatePostPage />} />
          <Route path="/tutee/tutor_list" element={<TutorListPage />} />
          <Route path="/tutee/profile" element={<TuteeProfilePage />} />
          <Route path="/tutor/profile" element={<TutorProfilePage />} /> */}
        </Routes>
      </Box>
    </Box>
  );
}
