import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Box, ThemeProvider } from "@mui/material";
import Navbar from "components/layout_components/Navbar";
import HomePage from "components/page_components/HomePage";
import TutorPage from "components/page_components/tutor/TutorPage";
import TuteePage from "components/page_components/tutee/TuteePage";
import CreatePostPage from "components/page_components/tutee/CreatePostPage";
import TutorListPage from "components/page_components/tutee/TutorListPage";
import TutorNotificationsPage from "components/page_components/tutor/TutorNotificationsPage";
import TuteeNotificationsPage from "components/page_components/tutee/TuteeNotificationsPage";
import TuteeProfilePage from "components/page_components/tutee/TuteeProfilePage";
import TutorProfilePage from "components/page_components/tutor/TutorProfilePage";
import RequestAdminPage from "components/page_components/tutee/RequestAdminPage";
import PostsListPage from "components/page_components/tutor/PostsListPage";
import CollaborationPage from "components/page_components/CollaborationPage";
import { getCurrentTheme, useBreakpoints } from "./utilities/helperFunctions";
import TutorApplicationPage from "./components/page_components/TutorApplicationPage";


export default function App() {
  const widthRightOffset = useBreakpoints().hasScrollbar ? "16px" : "0px";

  return (
    <Box
      sx={{
        height: useBreakpoints().isMobile ? "auto" : "100vh",
        width: useBreakpoints().isMobile
          ? `calc(100vw - ${widthRightOffset})`
          : "100vw",
      }}
    >
      <ThemeProvider theme={getCurrentTheme()}>
        <Navbar/>
      </ThemeProvider>

      <Box sx={{ height: "90%", width: "100%" }}>
        <Routes>
          {/* Root */}
          <Route path="/" element={<HomePage />} />

          {/* Tutor */}
          <Route path="/tutor" element={<TutorPage />} />
          <Route path="/tutor/profile" element={<TutorProfilePage />} />
          <Route
            path="/tutor/notifications"
            element={<TutorNotificationsPage />}
          />
          <Route path="/tutor/posts-list" element={<PostsListPage />} />
          <Route path="/tutor/tutor-application" element={<TutorApplicationPage/>} />

          {/* Tutee */}
          <Route path="/tutee" element={<TuteePage />} />
          <Route path="/tutee/profile" element={<TuteeProfilePage />} />
          <Route
            path="/tutee/notifications"
            element={<TuteeNotificationsPage />}
          />
          <Route path="/tutee/create-post" element={<CreatePostPage />} />
          <Route path="/tutee/request-admin" element={<RequestAdminPage />} />
          <Route path="/tutee/tutor-list" element={<TutorListPage />} />
          <Route path="/tutee/tutor-application" element={<TutorApplicationPage/>} />

          {/* Other */}
          <Route path="/collaboration" element={<CollaborationPage />} />
         
        </Routes>
      </Box>
    </Box>
  );
}
