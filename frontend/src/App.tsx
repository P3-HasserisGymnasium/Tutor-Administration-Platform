import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "components/layout_components/Navbar";
import HomePage from "components/page_components/HomePage";

export default function App() {
  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <Navbar />
      <Box sx={{ height: "90%", width: "100%" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/*
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

export default App;
